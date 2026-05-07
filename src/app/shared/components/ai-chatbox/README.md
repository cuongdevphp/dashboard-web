# AI Chatbox Component

## 🎯 Tính năng

- ✅ Giao diện đẹp, hiện đại với gradient và animation
- ✅ Responsive 100% (desktop, tablet, mobile)
- ✅ Typing indicator khi AI đang suy nghĩ
- ✅ Auto-scroll xuống tin nhắn mới
- ✅ Minimize/Maximize chatbox
- ✅ Clear chat history
- ✅ Timestamp cho mỗi tin nhắn
- ✅ Avatar riêng cho user và AI
- ✅ Floating button với badge "AI"
- ✅ Enter để gửi, Shift+Enter xuống dòng
- ✅ Disable input khi đang loading

## 🎨 Preview

### Desktop
- Chatbox: 380px x 600px
- Floating button: 60px x 60px
- Position: Bottom right (24px margin)

### Mobile
- Chatbox: Full screen
- Floating button: 56px x 56px
- Position: Bottom right (16px margin)

## 🔧 Cấu trúc

```
ai-chatbox/
├── ai-chatbox.component.ts      # Logic & API integration
├── ai-chatbox.component.html    # Template
├── ai-chatbox.component.css     # Styles
└── README.md                    # Documentation
```

## 💬 Message Interface

```typescript
interface Message {
    content: string;      // Nội dung tin nhắn
    isUser: boolean;      // true = user, false = AI
    timestamp: Date;      // Thời gian gửi
    isTyping?: boolean;   // Hiển thị typing indicator
}
```

## 🚀 Quick Start

Component đã được tự động thêm vào `common-layout.component.html`:

```html
<app-ai-chatbox></app-ai-chatbox>
```

## 🔌 Tích hợp AI API

Hiện tại đang dùng **mock response** để demo. Để tích hợp AI thực:

### 1. Thêm API config vào environment

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  aiApiUrl: 'YOUR_AI_API_URL',
  aiApiKey: 'YOUR_API_KEY'
};
```

### 2. Sửa hàm callAIApi()

Xem file `AI_CHATBOX_INTEGRATION.md` ở root project để biết cách tích hợp:
- OpenAI GPT
- Google Gemini
- Custom Backend API

## 🎨 Customization

### Thay đổi màu chủ đạo

```css
/* Primary color: #1890ff -> #YOUR_COLOR */
.chat-button {
    background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR_DARK 100%);
}
```

### Thay đổi vị trí

```css
/* Bên trái thay vì bên phải */
.chat-button, .chat-window {
    left: 24px;
    right: auto;
}
```

### Thay đổi kích thước

```css
.chat-window {
    width: 450px;
    height: 700px;
}
```

## 📱 Responsive Breakpoints

- **Desktop**: > 768px - Chatbox 380px width
- **Tablet**: 480px - 768px - Chatbox full width với margin
- **Mobile**: < 480px - Chatbox full screen

## 🎯 Methods

```typescript
toggleChat()      // Mở/đóng chatbox
toggleMinimize()  // Thu nhỏ/phóng to
closeChat()       // Đóng chatbox
sendMessage()     // Gửi tin nhắn
clearChat()       // Xóa lịch sử chat
```

## 🔒 Security Best Practices

1. **Không lưu API key trong frontend**
   - Tạo backend proxy để gọi AI API
   - API key chỉ nên ở server-side

2. **Validate input**
   - Giới hạn độ dài tin nhắn
   - Sanitize user input
   - Rate limiting

3. **Error handling**
   - Xử lý timeout
   - Retry logic
   - User-friendly error messages

## 🐛 Known Issues

Không có issue nào được phát hiện.

## 📝 TODO

- [ ] Lưu chat history vào localStorage
- [ ] Thêm voice input
- [ ] Markdown support cho AI response
- [ ] File upload
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Emoji picker

## 📞 Support

Nếu gặp vấn đề, check:
1. Console có lỗi không
2. Network tab để xem API calls
3. Verify imports trong SharedModule
4. Check z-index conflicts
