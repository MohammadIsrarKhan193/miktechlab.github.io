const backendURL = "https://e456ff4f-fa85-4a06-8694-233622689738-00-3sm6qg7qbafed.pike.replit.dev";

async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    const userText = input.value.trim();
    if (!userText) return;

    chatBox.innerHTML += `<div class="user-message"><b>You:</b> ${userText}</div>`;
    input.value = "";

    try {
        const response = await fetch(`${backendURL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userText })
        });

        const data = await response.json();

        chatBox.innerHTML += `<div class="bot-message"><b>MÎK AI:</b> ${data.reply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        chatBox.innerHTML += `<div class="bot-message error">⚠️ Error connecting to AI server</div>`;
        console.error("Error:", error);
    }
}
