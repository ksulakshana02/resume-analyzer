import {GoogleGenerativeAI} from "@google/generative-ai";

export const initializeGemini = (apiKey) => {
    return new GoogleGenerativeAI(apiKey);
};

export const ANALYSIS_PROMPTS = {
    skills: (content, jobDescription) => `
      Given the following job description: "${jobDescription}", analyze the skills in this resume. 
        1. Technical skills present
        2. Missing critical skills for the specified role
        3. Additional relevant skills
        4. Skill level assessment

      Based on the job description: "${jobDescription}", evaluate the experience section of this resume. 
        1. Assessment of experience relevance
        2. Quantifiable achievements
        3. Areas for improvement
        
      In the context of the following job description: "${jobDescription}", analyze the education section of this resume.
        1. Relevance to role
        2. Key academic achievements
        3. Additional certification recommendations
        
        Provide response such as overall score and summarize overall feedback only in JSON format:
        {
          "overallScore": number,
          "comment": string,
        }
`,
};