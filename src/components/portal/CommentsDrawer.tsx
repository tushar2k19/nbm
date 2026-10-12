import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { insertComment, listComments, markCommentsResolved } from "@/lib/portal-data";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { CheckCircle2, Send, User } from "lucide-react";
import { getRoleLabel } from "@/lib/roles";

type CommentsDrawerProps = {
  entryId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onCommentsChange?: () => void;
};

export function CommentsDrawer({ entryId, isOpen, onClose, onCommentsChange }: CommentsDrawerProps) {
  const { user, profile } = useAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [commentsResolved, setCommentsResolved] = useState(false);
  const [commentsResolvedAt, setCommentsResolvedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resolving, setResolving] = useState(false);

  const fetchComments = async () => {
    if (!entryId) return;
    setLoading(true);
    try {
      const data = await listComments(entryId);
      setComments((data.comments as any[]) || []);
      setCommentsResolved(data.commentsResolved);
      setCommentsResolvedAt(data.commentsResolvedAt);
    } catch (error) {
      toast.error("Failed to load comments");
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen && entryId) {
      void fetchComments();
    } else {
      setComments([]);
      setCommentsResolved(false);
      setCommentsResolvedAt(null);
      setNewComment("");
    }
  }, [isOpen, entryId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !entryId || !user || !profile) return;

    setSubmitting(true);
    try {
      await insertComment({
        entry_id: entryId,
        author_id: user.id,
        author_role: profile.role,
        message: newComment.trim(),
      });
      setNewComment("");
      await fetchComments();
      onCommentsChange?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResolve = async () => {
    if (!entryId || comments.length === 0 || commentsResolved) return;
    setResolving(true);
    try {
      await markCommentsResolved(entryId);
      toast.success("Comments marked as resolved");
      await fetchComments();
      onCommentsChange?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not mark as resolved");
    } finally {
      setResolving(false);
    }
  };

  const resolvedLabel =
    commentsResolvedAt
      ? new Date(commentsResolvedAt).toLocaleString([], {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="flex flex-col h-full w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Comments & Queries</SheetTitle>
          <SheetDescription>
            Discuss issues, clarify data points, or track reviewer notes for this entry.
          </SheetDescription>
        </SheetHeader>

        {comments.length > 0 && (
          <div className="mt-3 space-y-2">
            {commentsResolved ? (
              <div className="flex items-start gap-2 rounded-md border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-xs text-emerald-900">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" aria-hidden />
                <span>
                  Marked resolved{resolvedLabel ? ` on ${resolvedLabel}` : ""}. New comments will reopen the thread.
                </span>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full border-blue-200 text-blue-800 hover:bg-blue-50"
                disabled={resolving}
                onClick={() => void handleResolve()}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" aria-hidden />
                {resolving ? "Saving…" : "Mark comments resolved"}
              </Button>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {loading ? (
            <p className="text-center text-sm text-muted-foreground">Loading comments...</p>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              No comments on this entry yet.
            </div>
          ) : (
            comments.map((c) => {
              const isMe = c.author_id === user?.id;
              return (
                <div
                  key={c.id}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <User className="h-3 w-3" aria-hidden />
                    <span>{getRoleLabel(c.author_role)}</span>
                    <span aria-hidden>•</span>
                    <span>
                      {new Date(c.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div
                    className={`rounded-lg px-3 py-2 text-sm max-w-[85%] ${
                      isMe
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground border border-border"
                    }`}
                  >
                    {c.message}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <form onSubmit={handleSend} className="pt-2 border-t flex gap-2">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type a message or reply..."
            className="min-h-[60px] resize-none"
            rows={2}
          />
          <Button
            type="submit"
            size="icon"
            disabled={submitting || !newComment.trim()}
            className="self-end h-10 w-10 shrink-0"
          >
            <Send className="h-4 w-4" aria-hidden />
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
