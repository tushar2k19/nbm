import { createGoogleGenerativeAI } from "@ai-sdk/google";

/** Free-tier friendly default — override with GEMINI_MODEL in .env */
export const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash-lite";

export function getGeminiApiKey(): string | undefined {
  return process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.GEMINI_API_KEY;
}

export function getGeminiModelId(): string {
  return process.env.GEMINI_MODEL ?? DEFAULT_GEMINI_MODEL;
}

export function getGeminiModel() {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;
  const google = createGoogleGenerativeAI({ apiKey });
  return google(getGeminiModelId());
}
