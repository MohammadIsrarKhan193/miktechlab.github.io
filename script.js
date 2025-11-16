const backendURL = "https://e456ff4f-fa85-4a06-8694-233622689738-00-3sm6qg7qbafed.pike.replit.dev";

async function sendMessage() {
  const userMessage = document.getElementById("input").value;

  const res = await fetch(`${backendURL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await res.json();
  document.getElementById("output").textContent = data.reply;
}
