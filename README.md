# 🤖 AlgoZenith AI Helper

An AI-powered Chrome Extension that integrates a context-aware coding assistant directly into the **AlgoZenith (maang.in)** platform.

Instead of switching between ChatGPT/Gemini and the coding platform, users can ask questions directly on the problem page and receive AI-powered explanations based on the current problem.

---

## ✨ Features

- 🔍 Automatically detects AlgoZenith problem pages
- 🤖 Injects an **AI Help** button into every problem
- 💬 Interactive AI chat interface
- 📖 Automatically extracts the current problem statement
- 🧠 Context-aware AI responses using the extracted problem
- 🔄 Supports Single Page Application (SPA) navigation
- 🧹 Automatic UI cleanup while switching between problems
- 🎨 Responsive and clean UI inspired by the AlgoZenith design
- ⚡ Google Gemini API integration
- 📝 Markdown rendering for AI responses

---

## 🛠 Tech Stack

### Frontend
- JavaScript (ES6)
- HTML
- CSS

### Chrome Extension
- Manifest V3
- Content Scripts
- Background Service Worker
- Chrome Runtime Messaging API

### AI
- Google Gemini API
- Prompt Engineering

### Browser APIs
- MutationObserver
- DOM Manipulation
- Fetch API

---

## 📂 Project Structure

```
AlgoZenith-AI-Helper
│
├── assets/
│
├── ui/
│   ├── button.js
│   ├── chatbox.js
│   └── styles.css
│
├── utils/
│   ├── dom.js
│   └── route.js
│
├── api/
│   └── gemini.js
│
├── content.js
├── background.js
├── manifest.json
├── popup.html
└── README.md
```

---

## 🚀 How It Works

```
User opens a problem page
        │
        ▼
Chrome Content Script Injected
        │
        ▼
Detects SPA Route Change
        │
        ▼
Injects AI Help Button
        │
        ▼
User Opens Chat
        │
        ▼
Extract Problem Statement
        │
        ▼
Prompt Engineering
        │
        ▼
Background Service Worker
        │
        ▼
Gemini API
        │
        ▼
AI Response
```

---

## 🧠 Challenges Solved

### Single Page Application (SPA)

AlgoZenith does not reload pages while navigating between problems.

Instead of relying on:

```js
window.onload
```

the extension uses:

```js
MutationObserver
```

to detect URL and DOM changes.

---

### Dynamic UI Injection

The extension injects UI elements dynamically while ensuring duplicate buttons and chatboxes are removed during navigation.

---

### Context-Aware AI

Instead of sending only the user's question,

the extension automatically includes:

- Problem Statement
- User Query
- Prompt Instructions

allowing the AI to generate relevant answers.

---


## ⚙ Installation

1. Clone the repository

```
git clone https://github.com/yourusername/AlgoZenith-AI-Helper.git
```

2. Open Chrome/Brave

```
chrome://extensions
```

3. Enable

```
Developer Mode
```

4. Click

```
Load Unpacked
```

5. Select the project folder.

6. Add your Gemini API Key inside

```
background.js
```

7. Open

```
https://maang.in
```

and start solving problems.

---

## 🎯 Future Improvements

- ✅ Read code directly from Monaco Editor
- ✅ Explain compiler errors
- ✅ Detect Wrong Answer / TLE
- ✅ Chat history using chrome.storage
- ✅ Resizable chat window
- ✅ Syntax highlighted code blocks
- ✅ Copy code button
- ✅ Math rendering
- ✅ Multi-model support (Gemini/OpenAI)

---

## 📚 Learning Outcomes

This project helped me gain hands-on experience with:

- Chrome Extension Development
- Manifest V3
- DOM Manipulation
- MutationObserver
- Single Page Applications
- Prompt Engineering
- API Integration
- Asynchronous JavaScript
- Dynamic UI Injection

---

## 🤝 Contributing

Contributions are welcome!

Feel free to open issues or submit pull requests.

---

## 📄 License

MIT License
