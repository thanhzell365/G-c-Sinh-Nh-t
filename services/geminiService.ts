
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. Birthday wishes will be generic.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateBirthdayWish = async (studentName: string): Promise<string> => {
  if (!API_KEY) {
    return `Chúc mừng sinh nhật ${studentName}! Chúc con luôn vui vẻ, mạnh khỏe và học giỏi nhé!`;
  }

  try {
    const prompt = `Viết một lời chúc mừng sinh nhật thật ngắn gọn, đáng yêu, và vui vẻ bằng tiếng Việt cho một học sinh tiểu học tên là "${studentName}". Lời chúc nên trong khoảng 2-3 câu, phù hợp với lứa tuổi và mang không khí tích cực.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });

    const text = response.text.trim();
    return text || `Chúc mừng sinh nhật ${studentName}! Chúc con một ngày thật nhiều niềm vui và quà!`;
  } catch (error) {
    console.error("Error generating birthday wish:", error);
    return `Chúc mừng sinh nhật ${studentName}! Chúc con luôn chăm ngoan, học giỏi và vâng lời ba mẹ!`;
  }
};
