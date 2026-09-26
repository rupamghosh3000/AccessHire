import { geminiProvider } from './geminiProvider.js';

export const explainJob = async (job) => {
  const prompt = `
Explain this job posting for a candidate who values plain, clear language:
Job Title: ${job.title}
Company: ${job.company}
Location: ${job.location} (${job.workMode})
Experience Level: ${job.experienceLevel}
Description:
${job.description}

Required Skills: ${job.requiredSkills.join(', ')}
Preferred Skills: ${job.preferredSkills.join(', ')}

Output a JSON object with:
{
  "summary": "2-sentence plain English summary of what the role actually does day-to-day",
  "keyResponsibilities": ["List of 3 clear bullet points"],
  "mustHaveSkills": ["Extracted mandatory skills with plain explanation"],
  "niceToHaveSkills": ["Extracted preferred skills"],
  "termExplanations": [
    { "term": "Industry term/acronym", "explanation": "Plain language explanation" }
  ],
  "experienceExpectations": "Clear explanation of what entry/junior/senior level means here"
}
  `;

  const systemInstruction = `You are AccessHire AI Job Explainer. Provide objective, clear, plain-language job breakdowns. Never make hiring guarantees or medical judgements.`;

  const aiResult = await geminiProvider.generateJSON(prompt, systemInstruction);

  if (aiResult) {
    return aiResult;
  }

  // Graceful deterministic fallback if AI provider is unconfigured or offline
  return {
    summary: `${job.company} is hiring a ${job.title} (${job.workMode}) in ${job.location}. This position focuses on implementing application features and working with technical databases.`,
    keyResponsibilities: [
      `Write clean, reliable code for ${job.title} systems.`,
      `Design and optimize database queries using ${job.requiredSkills.join(', ')}.`,
      `Collaborate with team members on software features and bug fixes.`
    ],
    mustHaveSkills: job.requiredSkills.map(s => `${s}: Essential technical requirement listed in the position posting.`),
    niceToHaveSkills: job.preferredSkills.map(s => `${s}: Optional skill that gives your application an edge.`),
    termExplanations: [
      { term: 'REST APIs', explanation: 'A standard way for software applications to talk to each other over the web.' },
      { term: 'SQL', explanation: 'A programming language used to store and retrieve data in database tables.' },
      { term: 'Microservices', explanation: 'Building software out of small independent services rather than one huge program.' }
    ],
    experienceExpectations: `This role is listed as ${job.experienceLevel}. Prior practical projects or internship experience demonstrating core programming skills will align well.`,
  };
};
