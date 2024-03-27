import {GoogleGenerativeAI} from "@google/generative-ai"


const genAI = new GoogleGenerativeAI("AIzaSyBDPhtgRGoYy777sBy19_U3RtE3akoCOCA");


export const askGemini = async (question: string) => {

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(question);
    const response = await result.response;
    const answer = response.text();
    return answer
}