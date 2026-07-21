import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AiChatService, ChatMessage } from './ai-chat.service';

const MAX_MESSAGE_LENGTH = 500;

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiChatComponent {
  readonly maxLength = MAX_MESSAGE_LENGTH;

  readonly starterPrompts = [
    "What's his AWS experience?",
    'What has he shipped recently?',
    'Is he open to freelance work?',
  ];

  @ViewChild('messageList') private messageListRef?: ElementRef<HTMLElement>;
  @ViewChild('chatInput') private chatInputRef?: ElementRef<HTMLTextAreaElement>;

  isOpen = false;
  isLoading = false;
  errorMessage: string | null = null;
  inputValue = '';
  messages: ChatMessage[] = [];

  constructor(
    private readonly chatService: AiChatService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isOpen) this.closePanel();
  }

  togglePanel(): void {
    this.isOpen ? this.closePanel() : this.openPanel();
  }

  openPanel(): void {
    this.isOpen = true;
    setTimeout(() => this.chatInputRef?.nativeElement.focus());
  }

  closePanel(): void {
    this.isOpen = false;
  }

  useStarterPrompt(prompt: string): void {
    this.inputValue = prompt;
    this.send();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  send(): void {
    const text = this.inputValue.trim().slice(0, this.maxLength);
    if (!text || this.isLoading) return;

    const history = [...this.messages];
    this.messages.push({ role: 'user', content: text });
    this.inputValue = '';
    this.errorMessage = null;
    this.isLoading = true;
    this.scrollToBottom();

    this.chatService.sendMessage(text, history).subscribe({
      next: (res) => {
        this.messages.push({ role: 'assistant', content: res.reply });
        this.isLoading = false;
        this.scrollToBottom();
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = "Couldn't reach the assistant — try again in a moment.";
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const el = this.messageListRef?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }
}
