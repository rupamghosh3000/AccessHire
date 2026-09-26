import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../../config/env.js';

class GeminiProvider {
  constructor() {
    this.apiKey = config.geminiApiKey;
    this.modelName = config.aiModel || 'gemini-1.5-flash';
    if (this.apiKey) {
      try {
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.model = this.genAI.getGenerativeModel({ model: this.modelName });
      } catch (err) {
        console.warn('[GeminiProvider] Initialization error:', err.message);
        this.genAI = null;
        this.model = null;
      }
    } else {
      console.log('[GeminiProvider] No GEMINI_API_KEY provided; using structured fallback responses.');
      this.genAI = null;
      this.model = null;
    }
  }

  async generateJSON(prompt, systemInstruction = '') {
    if (!this.model) {
      return null;
    }

    try {
      const fullPrompt = `${systemInstruction}\n\nUser Request:\n${prompt}\n\nRespond ONLY with valid JSON. Do not include markdown formatting or backticks outside the JSON object.`;
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();
      if (!text) return null;

      const cleanJson = text
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/, '')
        .replace(/```$/, '')
        .trim();

      return JSON.parse(cleanJson);
    } catch (err) {
      console.warn('[GeminiProvider] Call failed:', err.message);
      return null;
    }
  }

  async generateText(prompt, systemInstruction = '') {
    if (!this.model) {
      return null;
    }

    try {
      const fullPrompt = `${systemInstruction}\n\nUser Request:\n${prompt}`;
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text() || null;
    } catch (err) {
      console.warn('[GeminiProvider] Text call failed:', err.message);
      return null;
    }
  }
}

export const geminiProvider = new GeminiProvider();
