const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const typingIndicator = document.getElementById("typing-indicator");

let step = 1;

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", sender);

  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.style.backgroundImage = `url(assets/${sender}-avatar.png)`;

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.innerHTML = text.replace(/\n/g, "<br>"); // ✅ Enable line breaks & formatting

  message.appendChild(avatar);
  message.appendChild(bubble);
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}


function showTyping(callback) {
  typingIndicator.style.display = "block";
  setTimeout(() => {
    typingIndicator.style.display = "none";
    callback();
  }, 600);
}

function handleUserInput() {
  const input = userInput.value.trim().toLowerCase();
  if (input === "") return;

  appendMessage("user", input);
  userInput.value = "";

  showTyping(() => {
    processInput(input);
  });
}

function processInput(input) {
  const positive = ["yes", "haan", "batao", "kya hai", "ok"];
  const negative = ["no", "nahi"];
  const unclear = !positive.includes(input) && !negative.includes(input);

  switch (step) {
    case 1:
      appendMessage("bot", "<b>Hello!</b> Welcome to our B.Sc Nursing Admission Helpdesk.");
      setTimeout(() => {
        appendMessage("bot", "Are you interested in admission to our <b>B.Sc Nursing</b> program?");
      }, 800);
      step++;
      break;
    case 2:
      if (positive.includes(input)) {
        appendMessage("bot", "Did you study Biology in your 12th grade?");
        step++;
      } else if (negative.includes(input)) {
        appendMessage("bot", "Thank you for your interest! Feel free to reach out anytime in the future.");
        step = 999;
      } else {
        appendMessage("bot", "Sorry, I didn’t catch that. Please reply with Yes / No / Haan / Nahi.");
      }
      break;
    case 3:
      if (positive.includes(input)) {
        appendMessage("bot", "<b>Here's a brief about the B.Sc. Nursing program:</b>\n4-year full-time course\nWould you like to know more details?");
        step++;
      } else if (negative.includes(input)) {
        appendMessage("bot", "Biology is mandatory for admission.\nWould you like to explore other courses?");
        step = 31;
      } else {
        appendMessage("bot", "Sorry, I didn’t catch that. Please respond with Yes / No.");
      }
      break;
    case 31:
      if (positive.includes(input)) {
        appendMessage("bot", "We offer BCA, B.Com, B.Sc (non-bio), and many more.\nPlease contact us for more info.");
        step = 999;
      } else {
        appendMessage("bot", "Thank you for your time. Wishing you the best!");
        step = 999;
      }
      break;
    case 4:
      if (positive.includes(input)) {
        appendMessage("bot", "<b>Fee Details:</b>\n• Tuition Fee: ₹60,000\n• Bus Fee: ₹10,000\n• <b>Total:</b> ₹70,000\n<b>Installments:</b>\n1. ₹30,000 (Admission)\n2. ₹20,000 (After 1st Sem)\n3. ₹20,000 (After 2nd Sem)\nWould you like to know about <b>hostel & training facilities</b>?");
        step++;
      } else {
        appendMessage("bot", "No problem! Let us know if you need assistance later.");
        step = 999;
      }
      break;
    case 5:
      if (positive.includes(input)) {
        appendMessage("bot", "<b>Hostel:</b>\n• 24×7 water & electricity\n• CCTV\n• Warden present\n<b>Training:</b> Real patient hospital sessions.\nWould you like to know <b>college location</b>?");
        step++;
      } else {
        step = 7;
        processInput("skip");
      }
      break;
    case 6:
      if (positive.includes(input)) {
        appendMessage("bot", "College is in Delhi, near major hospitals, transport, and affordable hostels.");
        step++;
      } else {
        step++;
        processInput("skip");
      }
      break;
    case 7:
      appendMessage("bot", "Recognized by Indian Nursing Council (INC), Delhi.\nWant to know more?");
      step++;
      break;
    case 8:
      if (positive.includes(input)) {
        appendMessage("bot", "INC ensures quality in nursing education and regulation.");
      }
      appendMessage("bot", "<b>Clinical training at:</b>\n1. District Hospital\n2. CHCs\n3. Regional Hospital\n4. Ranchi Neuro Hospital\nWant to know about <b>scholarships</b>?");
      step++;
      break;
    case 9:
      if (positive.includes(input)) {
        appendMessage("bot", "<b>Scholarships:</b>\n• Govt Post-Matric: ₹18–23k\n• Labour Ministry: ₹40–48k\nWant to know about <b>available seats</b>?");
        step++;
      } else {
        step = 11;
        processInput("skip");
      }
      break;
    case 10:
      if (positive.includes(input)) {
        appendMessage("bot", "Total seats available: 60\nShall I explain full eligibility?");
        step++;
      } else {
        step = 12;
        processInput("skip");
      }
      break;
    case 11:
      if (positive.includes(input)) {
        appendMessage("bot", "<b>Eligibility:</b>\n1. 12th Biology\n2. PNT Exam\n3. Age: 17–35\nWant a summary?");
        step++;
      } else {
        step++;
        processInput("skip");
      }
      break;
    case 12:
      if (positive.includes(input)) {
        appendMessage("bot", "<b>Summary:</b>\n✅ Eligible\n🎓 <b>Fees:</b> ₹70,000\n🏠 <b>Hostel & Training:</b> Yes\n📍 <b>Delhi</b>\n🎯 <b>Recognized by:</b> INC\n🪑 <b>Seats:</b> 60\n🎁 <b>Scholarships:</b> Available");
      }
      appendMessage("bot", "Thank you! Let us know anytime you need help. 🌟");
      step = 999;
      break;
    case 999:
      appendMessage("bot", "👋 Restart anytime by refreshing the page.");
      break;
    default:
      appendMessage("bot", "Something went wrong.");
  }
}

window.onload = () => {
  processInput("start");
};

// ✅ Pressing Enter will also send the message
userInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    handleUserInput();
  }
});

// 🎤 Voice Input using Web Speech API
function startVoiceInput() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Sorry, your browser doesn't support voice input.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-IN';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.start();

  recognition.onresult = (event) => {
    const voiceText = event.results[0][0].transcript;
    userInput.value = voiceText;
    handleUserInput();
  };

  recognition.onerror = (event) => {
    alert("Voice input error: " + event.error);
  };
}

// 🔄 Reset Chat
function resetChat() {
  chatBox.innerHTML = "";
  step = 1;
  processInput("start");
}
