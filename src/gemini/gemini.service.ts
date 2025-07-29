import { GenerateContentConfig, GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;
  constructor(protected readonly configService: ConfigService) {
    this.ai = new GoogleGenAI({ apiKey: configService.get('GEMINI_API_KEY') });
  }

  async generate(message: string, config: GenerateContentConfig = {}) {
    const response = await this.ai.models.generateContent({
      model: this.configService.getOrThrow('GEMINI_MODEL'),
      contents: message,
      config,
    });

    return response.text;
  }
}
