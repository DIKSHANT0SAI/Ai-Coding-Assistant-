const codingDescContainerClass =
    "w-full h-full overflow-y-auto hide-scrollbar px-3 py-4 sm:px-4";
let lastUrl = location.href;

const GEMINI_API_KEY = "AQ.Ab8RN6KuGmEiDp4Ebe-M4h9z4Nc-F4A1niV6YuI4X91jUNezcA";

function cleanup() {

    console.log("Cleaning UI");

    const button = document.getElementById("ai-help-button");
    if (button) {
        console.log("Removing button");
        button.remove();
    }

    const chatBox = document.getElementById("ai-chatbox");
    if (chatBox) {
        console.log("Removing chatbox");
        chatBox.remove();
    }
}

function createChatBox() {

    // Prevent duplicate chatboxes
    if (document.getElementById("ai-chatbox"))
        return;

    const chatBox = document.createElement("div");
    chatBox.id = "ai-chatbox";
    // Resize Handle
    const resizeHandle = document.createElement("div");
    resizeHandle.id = "ai-resize-handle";

    // Header
    const header = document.createElement("div");
    header.className = "ai-header";
    header.innerText = "🤖 AlgoZenith AI";

    // Messages Area
    const messages = document.createElement("div");
    messages.className = "ai-messages";
    messages.id = "ai-messages";

    // Welcome Message
    const welcome = document.createElement("div");
    welcome.className = "ai-message ai-message-ai";
    welcome.innerText =
        "👋 Hello! I'm your AI assistant.\nAsk me anything about this problem.";

    messages.appendChild(welcome);

    // Input Container
    const inputContainer = document.createElement("div");
    inputContainer.className = "ai-input-container";

    // Input Box
    const input = document.createElement("input");
    input.id = "ai-input";
    input.type = "text";
    input.placeholder = "Ask anything...";

    // Send Button
    const sendButton = document.createElement("button");
    sendButton.id = "ai-send-btn";
    sendButton.innerHTML = "➤";
    sendButton.addEventListener("click", async () => {

    const text = input.value.trim();

    if (!text)
        return;

    // Show user's message
    addMessage(text, "user");

    // Clear input
    input.value = "";

    // Show loading message
    const loading = addMessage("Thinking...\nWait", "bot");
    const problem = getProblemStatement();
    const prompt = `
You are an expert competitive programming mentor.

You are helping a student solve DSA and competitive programming problems.

Problem Statement:
${problem}

User Question:
${text}

===========================
Formatting Rules (VERY IMPORTANT)
===========================

1. NEVER use LaTeX.
   ❌ Don't write:
   $L = \\max(l1,l2)$

   ✅ Instead write:
   L = max(l1, l2)

2. Use Markdown headings (#, ##, ###).

3. Use bullet points wherever possible.

4. Use numbered steps while explaining algorithms.

5. Put every code snippet inside triple backticks.

6. Keep paragraphs short.

7. If explaining formulas, write them in plain text.

8. Highlight important words using **bold**.

9. If asked for code, give only one complete correct solution.

10. If the user asks for only a hint, DO NOT reveal the complete solution.

11. Make the response easy to read inside a chat window.

`;
    console.log(prompt);
    chrome.runtime.sendMessage(
    {
        type: "ASK_GEMINI",
        prompt: prompt
    },
    (response) => {

        // Remove "Thinking..."
        loading.remove();

        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            addMessage("❌ " + chrome.runtime.lastError.message, "bot");
            return;
        }

        if (!response || !response.success) {
            addMessage(
                "❌ " + (response?.error || "Something went wrong."),
                "bot"
            );
            return;
        }

        // Show AI response
        addMessage(response.reply, "bot");
    }
);

});

    inputContainer.appendChild(input);
    inputContainer.appendChild(sendButton);

    chatBox.appendChild(resizeHandle);
    chatBox.appendChild(header);
    chatBox.appendChild(messages);
    chatBox.appendChild(inputContainer);
    let isResizing = false;

resizeHandle.addEventListener("mousedown", () => {
    isResizing = true;
});

document.addEventListener("mouseup", () => {
    isResizing = false;
});

document.addEventListener("mousemove", (e) => {

    if (!isResizing)
        return;

    const rect = chatBox.getBoundingClientRect();

    const newHeight = rect.bottom - e.clientY;

    if (newHeight < 250)
        return;

    if (newHeight > 900)
        return;

    chatBox.style.height = newHeight + "px";

});

    const button = document.getElementById("ai-help-button");
    button.insertAdjacentElement("afterend", chatBox);
}

// async function askGemini(message) {

//     const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent{AQ.Ab8RN6KuGmEiDp4Ebe-M4h9z4Nc-F4A1niV6YuI4X91jUNezcA}`,
//         {
//             method: "POST",

//             headers: {
//                 "Content-Type": "application/json"
//             },

//             body: JSON.stringify({
//                 contents: [{
//                     parts: [{
//                         text: message
//                     }]
//                 }]
//             })
//         }
//     );

//     console.log("HTTP Status:", response.status);

//     const data = await response.json();

//     console.log("Gemini Response:", data);

//     if (!response.ok) {
//         throw new Error(JSON.stringify(data));
//     }

//     return data.candidates[0].content.parts[0].text;
// }

function addMessage(text, sender) {

    const messages = document.getElementById("ai-messages");

    const message = document.createElement("div");

    message.className = "ai-message";

    if (sender === "user")
        message.classList.add("user-message");
    else
        message.classList.add("bot-message");

    if (sender === "bot") {
        message.innerHTML = marked.parse(text);
    }
    else {
        message.innerText = text;
    }

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;

    return message;
}
function getProblemStatement() {

    const sections = document.querySelectorAll("section.space-y-2");

    let problemText = "";

    sections.forEach(section => {

        const heading = section.querySelector("h5");
        const body = section.querySelector("div");

        if (!heading || !body) return;

        problemText +=
            heading.innerText +
            "\n\n" +
            body.innerText +
            "\n\n";
    });

    return problemText;
}
function handleRouteChange() {

    cleanup();
    
    if (!location.pathname.startsWith("/problems/"))
        return;
    
    addAIButton();
    console.log(getProblemStatement());

}
const observer = new MutationObserver(() => {

    if (location.href !== lastUrl) {

        console.log("Route Changed");

        lastUrl = location.href;

        handleRouteChange();
    }

});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial page
handleRouteChange();


function addAIButton() {

    const codingDescContainer =
        document.getElementsByClassName(codingDescContainerClass)[0];

    if (!codingDescContainer) {
        setTimeout(addAIButton, 200);
        return;
    }

    if (document.getElementById("ai-help-button"))
        return;

    const aiHelpButton = document.createElement("button");
    aiHelpButton.innerText = "AI Help";
    aiHelpButton.id = "ai-help-button";

    aiHelpButton.addEventListener("click", function () {
       createChatBox();
    });

    codingDescContainer.insertAdjacentElement("beforeend", aiHelpButton);
}