import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  reply: string;
}

const REQUEST_TIMEOUT_MS = 20000;
const CHAT_ENDPOINT = `${environment.apiBaseUrl}/api/chat`;

@Injectable({ providedIn: 'root' })
export class AiChatService {
  constructor(private readonly http: HttpClient) {}

  sendMessage(message: string, history: ChatMessage[]): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(CHAT_ENDPOINT, { message, history }).pipe(
      timeout(REQUEST_TIMEOUT_MS),
      catchError(() => throwError(() => new Error('Failed to reach the assistant'))),
    );
  }
}
