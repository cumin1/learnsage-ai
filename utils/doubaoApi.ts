interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  choices: {
    finish_reason: string;
    index: number;
    message: {
      content: string;
      role: string;
    }
  }[];
  created: number;
  id: string;
  model: string;
  object: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  }
}

// 定义角色特定的系统消息
const characterSystemMessages: Record<string, string> = {
  甘雨: '你是游戏《原神》中的甘雨，一个温柔而聪明的角色，喜欢帮助他人，语气温和，常常带有一些诗意。',
  刻晴: '你是游戏《原神》中的刻晴，一个敏捷而果断的角色，擅长迅速解决问题，语气直接而有力。',
  雷电将军: '你是游戏《原神》中的雷电将军，一个威严而强大的角色，注重秩序与力量，语气冷静而坚定。',
};

export class DouBaoApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '/api/chat';
  }

  public async chat(messages: ChatMessage[], character: string): Promise<string> {
    try {
      const systemMessage: ChatMessage = {
        role: 'system',
        content: characterSystemMessages[character] || '你是一个角色，喜欢帮助他人。',
      };

      const allMessages = [systemMessage, ...messages];

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: allMessages })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json() as ChatResponse;
      return data.choices[0].message.content;
    } catch (error) {
      console.error('DouBao API Error:', error);
      throw error;
    }
  }
} 