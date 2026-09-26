import { geminiProvider } from './geminiProvider.js';

export const matchJobWithResume = async (job, resume) => {
  const prompt = `
Compare this job requirements with candidate resume:

JOB:
Title: ${job.title}
Required Skills: ${JSON.stringify(job.requiredSkills)}
Preferred Skills: ${JSON.stringify(job.preferredSkills)}
Description: ${job.description}

RESUME:
Extracted Skills: ${JSON.stringify(resume.skills)}
Education: ${JSON.stringify(resume.education)}
Experience: ${JSON.stringify(resume.experience)}
Extracted Text Snippet: ${resume.extractedText.slice(0, 1000)}

Perform an evidence-based match. Output a JSON object with:
{
  "matchedRequirements": [
    { "skill": "Skill Name", "evidence": "Exact quotes or projects from candidate resume" }
  ],
  "potentialGaps": [
    { "skill": "Skill Name", "recommendation": "Constructive advice on how to address gap" }
  ],
  "uncertainRequirements": [
    { "skill": "Skill Name", "reason": "Why candidate alignment could not be automatically confirmed" }
  ],
  "explanation": "Clear, objective 2-3 sentence summary of candidate alignment without claiming guaranteed employment."
}
  `;

  const systemInstruction = `You are AccessHire AI Evidence Matcher. Compare job requirements with resume evidence objectively. NEVER invent resume qualifications. If a skill is absent in resume, list it under potentialGaps or uncertainRequirements.`;

  const aiResult = await geminiProvider.generateJSON(prompt, systemInstruction);

  if (aiResult) {
    return aiResult;
  }

  // Graceful deterministic fallback
  const candidateSkills = (resume.skills || []).map(s => s.toLowerCase());
  const matched = [];
  const gaps = [];
  const uncertain = [];

  for (const reqSkill of job.requiredSkills) {
    if (candidateSkills.includes(reqSkill.toLowerCase())) {
      matched.push({
        skill: reqSkill,
        evidence: `${reqSkill} is listed directly in your uploaded resume skills and project highlights.`,
      });
    } else {
      gaps.push({
        skill: reqSkill,
        recommendation: `Consider highlighting any practical projects, coursework, or self-study involving ${reqSkill}.`,
      });
    }
  }

  for (const prefSkill of job.preferredSkills) {
    if (candidateSkills.includes(prefSkill.toLowerCase())) {
      matched.push({
        skill: prefSkill,
        evidence: `${prefSkill} was identified in your resume as a preferred skill advantage.`,
      });
    } else {
      uncertain.push({
        skill: prefSkill,
        reason: `${prefSkill} was not explicitly detected in your uploaded resume text.`,
      });
    }
  }

  return {
    matchedRequirements: matched,
    potentialGaps: gaps,
    uncertainRequirements: uncertain,
    explanation: `Your resume demonstrates strong alignment with ${matched.length} core requirement(s). Review potential gaps below to decide how to best present your application experience.`,
  };
};
