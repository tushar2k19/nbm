import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Send, User } from "lucide-react";
import { getRoleLabel } from "@/lib/roles";

type CommentsDrawerProps = {
  entryId: string | null;
  isOpen: boolean;
  onClose: () => void;
};

export function CommentsDrawer({ entryId, isOpen, onClose }: CommentsDrawerProps) {
  const { user, profile } = useAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    if (!entryId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("entry_comments")
      .select("*")
      .eq("entry_id", entryId)
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Failed to load comments");
      console.error(error);
    } else {
      setComments(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen && entryId) {
      void fetchComments();
    } else {
      setComments([]);
      setNewComment("");
    }
  }, [isOpen, entryId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !entryId || !user || !profile) return;

    setSubmitting(true);
    const { error } = await supabase.from("entry_comments").insert({
      entry_id: entryId,
      author_id: user.id,
      author_role: profile.role,
      message: newComment.trim(),
    });

    setSubmitting(false);
    if (error) {
      toast.error(error.message);
    } else {
      setNewComment("");
      await fetchComments();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="flex flex-col h-full w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Comments & Queries</SheetTitle>
          <SheetDescription>
            Discuss issues, clarify data points, or track reviewer notes for this entry.
          </SheetDescription>
        </SheetHeader>

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
                    <User className="h-3 w-3" />
                    <span>{getRoleLabel(c.author_role)}</span>
                    <span>•</span>
                    <span>{new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
          <Button type="submit" size="icon" disabled={submitting || !newComment.trim()} className="self-end h-10 w-10 shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
