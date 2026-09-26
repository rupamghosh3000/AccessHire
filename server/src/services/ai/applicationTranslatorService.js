import { geminiProvider } from './geminiProvider.js';

export const translateQuestion = async (originalText, context = '') => {
  const prompt = `
Translate this job application question into clear, simple plain language:
Original Question: "${originalText}"
Application Context: "${context}"

Output JSON:
{
  "original": "${originalText}",
  "plainLanguageExplanation": "Simple 1-2 sentence explanation of what is being asked",
  "whatToProvide": "Clear instruction on what information or document the user should enter",
  "legalNote": "Confirmation that legal intent is preserved without alteration"
}
  `;

  const systemInstruction = `You are AccessHire Application Translator. Translate corporate or legal job application questions into simple, plain English. You MUST preserve the exact legal and consent meaning. Never change the meaning of authorization, background check, or agreement questions.`;

  const aiResult = await geminiProvider.generateJSON(prompt, systemInstruction);

  if (aiResult) {
    return aiResult;
  }

  // Graceful fallback rules for common complex application questions
  let explanation = "What does this question mean?";
  let provide = "Provide your answer clearly.";

  const lower = originalText.toLowerCase();

  if (lower.includes('legally authorized') || lower.includes('jurisdiction')) {
    explanation = "Do you currently have official legal permission to work in the country or region where this job is located?";
    provide = "Select 'Yes' if you have a valid work visa, citizenship, or legal work permit; select 'No' if you require visa sponsorship.";
  } else if (lower.includes('sponsorship') || lower.includes('visa')) {
    explanation = "Will you need the company to sponsor or help secure a work visa for you now or in the future?";
    provide = "Select 'Yes' if you need visa assistance from the employer, otherwise select 'No'.";
  } else if (lower.includes('accommodations') || lower.includes('disability')) {
    explanation = "Do you need any specific technical or physical adjustments during the interview process or daily work?";
    provide = "Indicate any preferred tools or arrangements (such as screen reader support, flexible scheduling, or written questions).";
  } else {
    explanation = `This question asks: "${originalText}".`;
    provide = "Answer accurately based on your background and records.";
  }

  return {
    original: originalText,
    plainLanguageExplanation: explanation,
    whatToProvide: provide,
    legalNote: "Preserves exact intent without changing legal rights or candidate consent.",
  };
};
