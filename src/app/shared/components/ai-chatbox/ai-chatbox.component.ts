import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';

interface Message {
    content: string;
    isUser: boolean;
    timestamp: Date;
    isTyping?: boolean;
}

@Component({
    selector: 'app-ai-chatbox',
    templateUrl: './ai-chatbox.component.html',
    styleUrls: ['./ai-chatbox.component.css']
})
export class AiChatboxComponent implements OnInit, AfterViewChecked {
    @ViewChild('messagesContainer') private messagesContainer: ElementRef;
    
    isOpen = false;
    isMinimized = false;
    messages: Message[] = [];
    userInput = '';
    isLoading = false;
    private shouldScrollToBottom = false;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        // Welcome message
        this.messages.push({
            content: 'Xin chào! Tôi là AI Assistant. Tôi có thể giúp gì cho bạn?',
            isUser: false,
            timestamp: new Date()
        });
    }

    ngAfterViewChecked(): void {
        if (this.shouldScrollToBottom) {
            this.scrollToBottom();
            this.shouldScrollToBottom = false;
        }
    }

    toggleChat(): void {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.isMinimized = false;
            this.shouldScrollToBottom = true;
        }
    }

    toggleMinimize(): void {
        this.isMinimized = !this.isMinimized;
    }

    closeChat(): void {
        this.isOpen = false;
        this.isMinimized = false;
    }

    async sendMessage(): Promise<void> {
        if (!this.userInput.trim() || this.isLoading) {
            return;
        }

        const userMessage: Message = {
            content: this.userInput.trim(),
            isUser: true,
            timestamp: new Date()
        };

        this.messages.push(userMessage);
        const userQuestion = this.userInput;
        this.userInput = '';
        this.shouldScrollToBottom = true;
        this.isLoading = true;

        // Add typing indicator
        const typingMessage: Message = {
            content: '',
            isUser: false,
            timestamp: new Date(),
            isTyping: true
        };
        this.messages.push(typingMessage);
        this.shouldScrollToBottom = true;

        try {
            // TODO: Replace with your actual AI API endpoint
            const response = await this.callAIApi(userQuestion);
            
            // Remove typing indicator
            this.messages = this.messages.filter(m => !m.isTyping);
            
            // Add AI response
            this.messages.push({
                content: response,
                isUser: false,
                timestamp: new Date()
            });
            
            this.shouldScrollToBottom = true;
        } catch (error) {
            // Remove typing indicator
            this.messages = this.messages.filter(m => !m.isTyping);
            
            this.messages.push({
                content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
                isUser: false,
                timestamp: new Date()
            });
            
            console.error('AI API Error:', error);
        } finally {
            this.isLoading = false;
        }
    }

    private async callAIApi(message: string): Promise<string> {
        try {
            // Get user info from localStorage
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = user.username || 'anonymous';

            // Call backend API
            const response = await this.http.post<any>(
                // environment.aiApiUrl,
                "localhost:3001",
                {
                    message: message,
                    userId: userId
                }
            ).toPromise();

            if (response.success) {
                return response.data.message;
            } else {
                throw new Error(response.error || 'API error');
            }

        } catch (error: any) {
            console.error('AI API Error:', error);
            
            // User-friendly error messages
            if (error.status === 429) {
                return 'Bạn đã gửi quá nhiều tin nhắn. Vui lòng thử lại sau vài phút.';
            } else if (error.status === 0) {
                return 'Không thể kết nối đến server AI. Vui lòng kiểm tra kết nối mạng.';
            } else {
                return 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.';
            }
        }
    }

    onKeyPress(event: KeyboardEvent): void {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.sendMessage();
        }
    }

    clearChat(): void {
        this.messages = [{
            content: 'Xin chào! Tôi là AI Assistant. Tôi có thể giúp gì cho bạn?',
            isUser: false,
            timestamp: new Date()
        }];
    }

    private scrollToBottom(): void {
        try {
            if (this.messagesContainer) {
                this.messagesContainer.nativeElement.scrollTop = 
                    this.messagesContainer.nativeElement.scrollHeight;
            }
        } catch (err) {
            console.error('Scroll error:', err);
        }
    }

    formatTime(date: Date): string {
        return new Date(date).toLocaleTimeString('vi-VN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
}
