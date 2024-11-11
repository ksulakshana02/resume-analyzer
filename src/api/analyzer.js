import {ANALYSIS_PROMPTS, initializeGemini} from "../../util/gemini";

const API_KEY = "";
const genAI = initializeGemini(API_KEY);

const Handler = async (content, description) => {

    try {
        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

        const skillsAnalysis = await model.generateContent([ANALYSIS_PROMPTS.skills(content,description)]);

        const result = skillsAnalysis.response.text();
        console.log(result);

        return {
            success: true, analysis: result
        };
    } catch (err) {
        console.log("-----------------Error analyzing resume: ", err);
    }
};

export default Handler;
