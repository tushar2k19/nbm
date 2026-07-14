import { buildNbmSystemPrompt } from "@/data/nbmChatKnowledge";
import { getGeminiModel } from "@/lib/gemini.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const model = getGeminiModel();
        if (!model) {
          return Response.json(
            {
              error:
                "Chat API key not configured. Add GOOGLE_GENERATIVE_AI_API_KEY (Google AI Studio) to .env and restart the dev server.",
            },
            { status: 500 },
          );
        }

        try {
          const uiMessages = messages as UIMessage[];
          const result = streamText({
            model,
            system: buildNbmSystemPrompt(),
            messages: await convertToModelMessages(uiMessages),
          });

          return result.toUIMessageStreamResponse({
            originalMessages: uiMessages,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Chat request failed";
          console.error("[Bamboo Mitra /api/chat]", err);
          return Response.json({ error: message }, { status: 502 });
        }
      },
    },
  },
});
