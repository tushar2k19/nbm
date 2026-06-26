import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { X, Send, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import chatbotBambooIcon from "@/assets/2bamboo_chatbot_icon.png";

const transport = new DefaultChatTransport({ api: "/api/chat" });

const SUGGESTIONS = [
  "What is the National Bamboo Mission?",
  "Cost norms for bamboo plantation",
  "How to apply for nursery accreditation?",
  "Agarbatti stick policy",
];

const WELCOME: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "🙏 Namaste! I'm **Bamboo Mitra**, your AI guide for the National Bamboo Mission. Ask me about guidelines, cost norms, plantation data, agarbatti policy, achievements, or anything related to NBM.",
    },
  ],
};

export default function BambooChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport,
    messages: [WELCOME],
    onError: (err) => toast.error(err.message || "Chat error. Please try again."),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const submit = (text: string) => {
    const t = text.trim();
    if (!t || isLoading) return;
    sendMessage({ text: t });
    setInput("");
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Bamboo Mitra — How may I help you?"
          className="fixed bottom-5 right-4 sm:right-5 z-50 flex flex-col items-center group"
        >
          <div className="relative mb-2 animate-[chatBubbleFloat_3s_ease-in-out_infinite]">
            <div className="rounded-md bg-saffron px-3 py-2 shadow-md">
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-saffron-foreground leading-tight whitespace-nowrap">
                How may I help you?
              </p>
            </div>
            <span
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 bg-saffron"
              aria-hidden
            />
          </div>
          <img
            src={chatbotBambooIcon}
            alt="Bamboo Mitra"
            className="h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20 object-contain shadow-lg transition-transform group-hover:scale-105"
            width={80}
            height={80}
          />
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-4 sm:right-5 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[32rem] max-h-[calc(100vh-2.5rem)] bg-background border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={chatbotBambooIcon}
                alt=""
                className="h-9 w-9 shrink-0 object-contain"
                width={36}
                height={36}
              />
              <div className="min-w-0">
                <div className="font-semibold text-sm">Bamboo Mitra</div>
                <div className="text-[10px] opacity-80">NBM AI Assistant · Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chatbot" className="p-1 rounded hover:bg-white/10 shrink-0">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 bg-muted/30">
            {messages.map((m) => {
              const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border text-foreground"
                    }`}
                  >
                    {isUser ? (
                      <span className="whitespace-pre-wrap">{text}</span>
                    ) : (
                      <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-headings:my-2">
                        <ReactMarkdown>{text}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {status === "submitted" && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" /> Thinking...
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="px-3 py-2 flex flex-wrap gap-1.5 border-t border-border bg-background">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="text-[11px] px-2 py-1 rounded-full border border-border hover:bg-secondary"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="border-t border-border p-2 flex gap-2 bg-background"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about bamboo guidelines, cost norms..."
              className="flex-1 px-3 py-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="px-3 rounded-md bg-primary text-primary-foreground disabled:opacity-50 hover:opacity-90"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
