import * as CryptoJS from 'crypto-js';
import WebSocket from 'ws';

interface SparkMessage {
  role: string;
  content: string;
}

export class SparkApi {
  private appId: string;
  private apiKey: string;
  private apiSecret: string;
  private url: string;

  constructor() {
    this.appId = process.env.XUNFEI_APP_ID || '';
    this.apiKey = process.env.XUNFEI_API_KEY || '';
    this.apiSecret = process.env.XUNFEI_API_SECRET || '';
    this.url = "wss://spark-api.xf-yun.com/v3.1/chat";
  }

  private getAuthUrl(): string {
    const host = "spark-api.xf-yun.com";
    const path = "/v3.1/chat";
    const date = new Date().toUTCString();
    const algorithm = 'hmac-sha256';
    const headers = 'host date request-line';
    const signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${path} HTTP/1.1`;
    const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, this.apiSecret);
    const signature = CryptoJS.enc.Base64.stringify(signatureSha);
    const authorizationOrigin = `api_key="${this.apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    const authorization = btoa(authorizationOrigin);

    return `${this.url}?authorization=${authorization}&date=${date}&host=${host}`;
  }

  public async chat(messages: SparkMessage[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const url = this.getAuthUrl();
      const ws = new WebSocket(url);
      let responseText = '';

      ws.on('open', () => {
        const params = {
          header: {
            app_id: this.appId,
            uid: "12345"
          },
          parameter: {
            chat: {
              domain: "general",
              temperature: 0.5,
              max_tokens: 2048
            }
          },
          payload: {
            message: {
              text: messages
            }
          }
        };

        ws.send(JSON.stringify(params));
      });

      ws.on('message', (data) => {
        const response = JSON.parse(data.toString());
        if (response.header.code !== 0) {
          ws.close();
          reject(new Error(response.header.message));
          return;
        }

        const text = response.payload.choices.text[0].content;
        responseText += text;

        if (response.header.status === 2) {
          ws.close();
          resolve(responseText);
        }
      });

      ws.on('error', (error) => {
        reject(error);
      });
    });
  }
} 