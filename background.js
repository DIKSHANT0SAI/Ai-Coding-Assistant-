const GEMINI_API_KEY = "AQ.Ab8RN6KuGmEiDp4Ebe-M4h9z4Nc-F4A1niV6YuI4X91jUNezcA";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.type !== "ASK_GEMINI")
        return;

    askGemini(request.prompt)
        .then((reply) => {
            sendResponse({
                success: true,
                reply: reply
            });
        })
        .catch((error) => {
            console.error(error);

            sendResponse({
                success: false,
                error: error.message
            });
        });

    return true;
});

async function askGemini(message) {

    const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: message
                            }
                        ]
                    }
                ]
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error.message);
    }

    return data.candidates[0].content.parts[0].text;
}