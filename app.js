const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const chatWindow = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const chatForm = document.getElementById("chat-form");
const newChatButton = document.getElementById("new-chat");


function appendMessage(message, type) {
  const li = document.createElement("li");
  li.classList.add(type);
  li.textContent = message;
  chatWindow.appendChild(li);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}


function fetchResponse(userMessage) {
  const raw = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: userMessage,
          },
        ],
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCl6raMOsTuV_Tfky_8TNcBCYSgobyinm8",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const responseMessage =
        result.candidates[0].content.parts[0].text || "No response";
      appendMessage(responseMessage, "received");
    })
    .catch((error) => {
      console.error("Error:", error);
      appendMessage("Failed to fetch response.", "received");
    });
}


chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userMessage = messageInput.value.trim();
  if (userMessage) {
    appendMessage(userMessage, "sent");
    fetchResponse(userMessage);
    messageInput.value = "";
  }
});


newChatButton.addEventListener("click", () => {
  const confirmation = confirm("Are you sure you want to start a new chat?");
  if (confirmation) {
    document.getElementById("messages").innerHTML = ""; 
    appendMessage("New chat started. How can I assist you?", "received"); 
  }
});
