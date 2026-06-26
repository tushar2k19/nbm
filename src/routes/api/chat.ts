import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const SYSTEM_PROMPT = `You are "Bamboo Mitra", the official AI assistant of the National Bamboo Mission (NBM), Department of Agriculture & Farmers Welfare, Government of India.

Help users with information about:
- NBM Guidelines & Operational Guidelines (2018-19, revised editions)
- Cost Norms for bamboo plantation, nurseries, processing units, product development
- Annual Action Plans (AAP) submission process and timelines
- Achievements: plantation area covered, nurseries accredited, processing units set up, MSMEs supported, employment generated
- Agarbatti stick policy: import substitution, BIS standards, round-stick manufacturing, subsidy patterns
- Bamboo plantation data: state-wise area, species (Bambusa, Dendrocalamus, Melocanna), survival rates
- Accredited nurseries network and certification
- Value-added products: handicrafts, furniture, charcoal, construction, fashion, agarbatti
- Institutes: NCBM, IPIRTI, CBTC, NIDB and partner R&D institutions
- MIS portal usage, dashboard reports, beneficiary registration
- State Bamboo Missions and contact information

Tone: professional, helpful, concise. Use bullet points and markdown for clarity. If asked something outside bamboo/NBM scope, politely redirect. If you don't know a specific current statistic, say so and suggest the Reports/Dashboard section or contacting NBM office. Always respond in the same language as the user (Hindi/English).`;

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
