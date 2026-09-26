import { geminiProvider } from './geminiProvider.js';

export const handleAssistantQuery = async (query, context = {}) => {
  const prompt = `
User Query: "${query}"

Context Available:
User Name: ${context.userName || 'Rupam Paltu Ghosh'}
Active Preferences: ${JSON.stringify(context.preferences || {})}
Current Page: ${context.currentPage || 'Dashboard'}
Job Detail (if any): ${JSON.stringify(context.job || {})}

Candidate Profile Context:
Name: Rupam Paltu Ghosh
Degree: B.Tech Information Technology, TCET Mumbai (CGPA: 9.46)
Skills: JavaScript, TypeScript, React.js, Tailwind CSS, Node.js, Express.js, MongoDB, MySQL, Git, GitHub, Vite, REST APIs, Google Gemini API, HTML5, CSS3, EJS, Java, MERN Stack
Key Projects: TruthLens AI (Deepfake Forensics), ExportPilot AI (MSME Export Tool), HeavenStay (Vacation Rental), Way2Humanity (Community Support Platform)

Provide a helpful, friendly, accessibility-focused assistant response.
Output JSON:
{
  "reply": "Conversational plain-text assistant response",
  "suggestedActions": [
    { "label": "Button text", "action": "navigate", "target": "/path" }
  ]
}
  `;

  const systemInstruction = `You are AccessHire AI Assistant — a helpful, empathetic job application companion. Help users find jobs, understand questions, navigate the portal, review candidate profile, and configure accessibility. Output valid JSON only.`;

  const aiResult = await geminiProvider.generateJSON(prompt, systemInstruction);

  if (aiResult && aiResult.reply) {
    return aiResult;
  }

  // Smart fallback logic for candidate queries
  const lower = query.toLowerCase();
  let reply = `Hello ${context.userName || 'Rupam'}! I'm your AccessHire AI Assistant. I can help you search for software developer positions, review your MERN stack resume skills, audit application barriers, or configure accessibility features.`;
  const actions = [];

  if (lower.includes('resume') || lower.includes('skill') || lower.includes('rupam') || lower.includes('project')) {
    reply = "Your verified active resume profile for Rupam Paltu Ghosh includes B.Tech IT (TCET, CGPA 9.46), MERN Stack (React, Node.js, Express.js, MongoDB, TypeScript), and projects TruthLens AI, ExportPilot AI, HeavenStay, and Way2Humanity.";
    actions.push({ label: 'Open Resume Vault', action: 'navigate', target: '/resume-center' });
    actions.push({ label: 'View Recommended Jobs', action: 'navigate', target: '/jobs' });
  } else if (lower.includes('java') || lower.includes('job') || lower.includes('search') || lower.includes('find') || lower.includes('developer')) {
    reply = "I can help you search for software engineering and developer positions matching your profile! We currently have 387 recommended jobs including Junior Java Developer, Frontend Developer, and Full Stack Engineer positions.";
    actions.push({ label: 'Browse Job Listings', action: 'navigate', target: '/jobs' });
    actions.push({ label: 'Try Application Simulator', action: 'navigate', target: '/try-before-apply/66e1a0000000000000000001' });
  } else if (lower.includes('barrier') || lower.includes('lens') || lower.includes('audit')) {
    reply = "BarrierLens evaluates job applications for accessibility friction, verifying screen reader support, keyboard focus traps, voice controls, and plain-language explanations before you apply.";
    actions.push({ label: 'Open BarrierLens Audit', action: 'navigate', target: '/barrier-lens' });
  } else if (lower.includes('apply') || lower.includes('application') || lower.includes('tracker') || lower.includes('submit')) {
    reply = "Your Application Tracker records all guided application submissions with full explicit candidate confirmation, tracking your status across employers.";
    actions.push({ label: 'View Application Tracker', action: 'navigate', target: '/applications' });
  } else if (lower.includes('voice') || lower.includes('keyboard') || lower.includes('passport') || lower.includes('accessibility')) {
    reply = "AccessHire AI supports Voice-First speech controls, Keyboard-First hotkeys (Alt+N / Alt+B / Alt+A), and high-contrast font scaling in your Accessibility Passport.";
    actions.push({ label: 'Configure Passport', action: 'navigate', target: '/accessibility-passport' });
  } else {
    actions.push({ label: 'Browse Jobs', action: 'navigate', target: '/jobs' });
    actions.push({ label: 'Resume Center', action: 'navigate', target: '/resume-center' });
    actions.push({ label: 'Application Tracker', action: 'navigate', target: '/applications' });
  }

  return {
    reply,
    suggestedActions: actions,
  };
};
