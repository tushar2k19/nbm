import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Link } from "@tanstack/react-router";
import { X, Send, Loader2, Sparkles, Leaf, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import chatbotBambooIcon from "@/assets/2bamboo_chatbot_icon.png";
import { findRelevantLinks } from "@/data/nbmChatLinks";

const transport = new DefaultChatTransport({ api: "/api/chat" });

const SUGGESTIONS = [
  { label: "What is NBM?", query: "What is the National Bamboo Mission?", icon: "🌿" },
  { label: "Cost norms", query: "Cost norms for bamboo plantation", icon: "📋" },
  { label: "Nursery accreditation", query: "How to apply for nursery accreditation?", icon: "🏛️" },
  { label: "Agarbatti policy", query: "Agarbatti stick policy", icon: "🪵" },
];

const WELCOME: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "🙏 **Namaste!** I'm **Bamboo Mitra** — your NBM guide. Ask about guidelines, cost norms, schemes, or plantation data.",
    },
  ],
};

const CLOSE_ANIMATION_MS = 260;

export default function BambooChatbot() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [input, setInput] = useState("");
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport,
    messages: [WELCOME],
    onError: (err) => {
      const msg = err.message || "Chat error. Please try again.";
      toast.error(
        msg.includes("API key")
          ? "Add GOOGLE_GENERATIVE_AI_API_KEY to .env and restart dev server."
          : msg,
      );
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  const closeChat = useCallback(() => {
    setClosing((alreadyClosing) => {
      if (alreadyClosing) return alreadyClosing;
      closeTimerRef.current = setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, CLOSE_ANIMATION_MS);
      return true;
    });
  }, []);

  const openChat = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setClosing(false);
    setOpen(true);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current && !panelRef.current.contains(target)) {
        closeChat();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, closeChat]);

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
          onClick={openChat}
          aria-label="Open Bamboo Mitra — How may I help you?"
          className="fixed bottom-5 right-4 sm:right-5 z-50 flex flex-col items-center group"
        >
          <div className="relative mb-2.5">
            <div className="chat-bubble-premium rounded-2xl px-4 py-2.5 shadow-lg">
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-forest leading-tight whitespace-nowrap">
                How may I help you?
              </p>
            </div>
            <span
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-r border-b border-white/30"
              style={{ background: "var(--gradient-mitra-gold)" }}
              aria-hidden
            />
          </div>
          <div className="relative">
            <span
              className="absolute inset-0 rounded-full bg-primary/20 blur-md scale-110 group-hover:scale-125 transition-transform duration-300"
              aria-hidden
            />
            <img
              src={chatbotBambooIcon}
              alt="Bamboo Mitra"
              className="relative h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
              width={80}
              height={80}
            />
          </div>
        </button>
      )}

      {open && (
        <div
          ref={panelRef}
          className={`chat-panel ${closing ? "chat-panel-exit" : "chat-panel-enter"} fixed bottom-4 right-3 sm:bottom-5 sm:right-5 z-50 w-[min(20rem,calc(100vw-1.25rem))] h-[min(24rem,calc(100dvh-5rem))] bg-background rounded-2xl flex flex-col overflow-hidden`}
        >
          <div className="chat-header relative shrink-0 px-3 py-2.5 flex items-center justify-between gap-2 text-white">
            <div className="relative z-10 flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={chatbotBambooIcon}
                  alt=""
                  className="chat-avatar-ring h-9 w-9 rounded-full object-cover bg-white/95 p-0.5"
                  width={36}
                  height={36}
                />
                <span
                  className="chat-online-dot absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-leaf border-2 border-white"
                  aria-hidden
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-sm tracking-tight">Bamboo Mitra</span>
                  <Sparkles className="h-3 w-3 text-amber opacity-90" aria-hidden />
                </div>
                <div className="flex items-center gap-1 mt-px">
                  <span className="inline-block h-1 w-1 rounded-full bg-leaf" aria-hidden />
                  <span className="text-[9px] font-medium text-white/85">NBM AI · Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={closeChat}
              aria-label="Close chatbot"
              className="relative z-10 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 transition-colors shrink-0"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div ref={scrollRef} className="chat-messages-bg flex-1 overflow-y-auto px-3 py-2.5 space-y-2.5 min-h-0">
            {messages.map((m, mi) => {
              const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
              const isUser = m.role === "user";
              const isLast = mi === messages.length - 1;
              const stillStreaming = isLast && status === "streaming";
              // Surface relevant portal pages under finished bot replies (skip welcome).
              const links =
                !isUser && m.id !== "welcome" && !stillStreaming ? findRelevantLinks(text) : [];
              return (
                <div key={m.id} className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                  {!isUser && (
                    <img
                      src={chatbotBambooIcon}
                      alt=""
                      className="h-6 w-6 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-primary/15 bg-white p-0.5"
                      width={24}
                      height={24}
                    />
                  )}
                  <div className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"} max-w-[88%]`}>
                    <div
                      className={`w-fit max-w-full rounded-xl px-3 py-2 text-[12px] leading-relaxed ${
                        isUser ? "chat-user-bubble text-white rounded-br-sm" : "chat-bot-bubble text-foreground rounded-bl-sm"
                      }`}
                    >
                      {isUser ? (
                        <span className="whitespace-pre-wrap">{text}</span>
                      ) : (
                        <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-headings:my-2 prose-headings:text-primary prose-strong:text-primary prose-a:text-primary">
                          <ReactMarkdown>{text}</ReactMarkdown>
                        </div>
                      )}
                    </div>

                    {links.length > 0 && (
                      <div className="flex flex-col gap-1 w-full pl-0.5">
                        <span className="text-[8.5px] font-semibold uppercase tracking-wider text-primary/55">
                          Helpful links
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {links.map((l) => (
                            <Link
                              key={l.to}
                              to={l.to}
                              onClick={closeChat}
                              className="chat-link-btn group inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold"
                            >
                              <l.icon className="h-3 w-3 shrink-0" aria-hidden />
                              <span className="leading-snug">{l.label}</span>
                              <ArrowUpRight className="h-2.5 w-2.5 shrink-0 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {status === "submitted" && (
              <div className="flex gap-2 items-start">
                <img
                  src={chatbotBambooIcon}
                  alt=""
                  className="h-6 w-6 rounded-full object-cover shrink-0 ring-1 ring-primary/15 bg-white p-0.5"
                  width={24}
                  height={24}
                />
                <div className="chat-bot-bubble w-fit rounded-xl rounded-bl-sm px-3 py-2 flex items-center gap-1.5">
                  <div className="chat-typing-dots flex gap-0.5">
                    <span className="h-1 w-1 rounded-full bg-primary/50" />
                    <span className="h-1 w-1 rounded-full bg-primary/50" />
                    <span className="h-1 w-1 rounded-full bg-primary/50" />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium">Thinking…</span>
                </div>
              </div>
            )}

            {error && (
              <div className="text-[10px] text-destructive bg-destructive/10 p-2 rounded-lg border border-destructive/20">
                {error.message}
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="shrink-0 px-3 py-2 border-t border-primary/10 bg-white/80 backdrop-blur-sm">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-primary/70 mb-1.5 flex items-center gap-1">
                <Leaf className="h-2.5 w-2.5" aria-hidden />
                Quick questions
              </p>
              <div className="flex flex-wrap gap-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.query}
                    onClick={() => submit(s.query)}
                    className="chat-suggestion-chip text-left text-[10px] font-medium px-2 py-1 rounded-lg inline-flex items-center gap-1"
                  >
                    <span className="text-xs shrink-0" aria-hidden>
                      {s.icon}
                    </span>
                    <span className="leading-snug whitespace-nowrap">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="shrink-0 p-2 bg-white border-t border-primary/10"
          >
            <div className="chat-input-wrap flex items-center gap-1.5 rounded-xl px-2.5 py-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about NBM schemes…"
                className="flex-1 min-w-0 bg-transparent py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="chat-send-btn flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
