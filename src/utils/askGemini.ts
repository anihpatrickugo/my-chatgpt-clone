import { HistoryProp } from "@/redux/slices/chatSlices";
import {GoogleGenerativeAI, Content} from "@google/generative-ai"
import { useDispatch, useSelector } from 'react-redux';


const apiKey = process.env.GOOGLE_GEMINI_API_KEY || " "

const genAI = new GoogleGenerativeAI(apiKey);



export const askGemini = async (question: string, history: HistoryProp) => {
     
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const chat = model.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const result = await chat.sendMessage(question);
  const response = await result.response;
  const text = response.text();
  return text
}


// export const askGemini = async (question: string) => {
     

//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//   const result = await model.generateContent(question);
//   const response = await result.response;
//   const text = response.text();
//   return text
// }



