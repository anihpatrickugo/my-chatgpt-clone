import {GoogleGenerativeAI} from "@google/generative-ai"

const apiKey = process.env.GOOGLE_GEMINI_API_KEY || " "

const genAI = new GoogleGenerativeAI(apiKey);


export const askGemini = async (question: string) => {

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(question);
    const response = await result.response;
    const answer = response.text();
    return answer
}