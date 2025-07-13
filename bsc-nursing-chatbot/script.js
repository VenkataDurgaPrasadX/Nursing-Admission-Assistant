const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

let step = 1;

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function handleUserInput() {
  const input = userInput.value.trim().toLowerCase();
  if (input === "") return;

  appendMessage("user", input);
  userInput.value = "";

  setTimeout(() => {
    processInput(input);
  }, 600);
}

function processInput(input) {
  const positive = ["yes", "haan", "batao", "kya hai", "ok"];
  const negative = ["no", "nahi"];
  const unclear = !positive.includes(input) && !negative.includes(input);

  switch (step) {
    case 1:
      appendMessage("bot", "Hello! Welcome to our B.Sc Nursing Admission Helpdesk 😊\nAre you interested in admission to our B.Sc Nursing program?");
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
        appendMessage("bot", "Here's a brief about the B.Sc. Nursing program:\n• 4-year full-time course\nWould you like to know more details?");
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
        appendMessage("bot", "Fee Details:\n• Tuition Fee: ₹60,000\n• Bus Fee: ₹10,000\n• Total: ₹70,000\nInstallments:\n1. ₹30,000 (Admission)\n2. ₹20,000 (After 1st Sem)\n3. ₹20,000 (After 2nd Sem)\nWould you like to know about hostel & training facilities?");
        step++;
      } else {
        appendMessage("bot", "No problem! Let us know if you need assistance later.");
        step = 999;
      }
      break;
    case 5:
      if (positive.includes(input)) {
        appendMessage("bot", "Hostel:\n• 24×7 water & electricity\n• CCTV\n• Warden present\nTraining: Real patient hospital sessions.\nWould you like to know college location?");
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
      appendMessage("bot", "Clinical training at:\n1. District Hospital\n2. CHCs\n3. Regional Hospital\n4. Ranchi Neuro Hospital\nWant to know about scholarships?");
      step++;
      break;
    case 9:
      if (positive.includes(input)) {
        appendMessage("bot", "Scholarships:\n• Govt Post-Matric: ₹18–23k\n• Labour Ministry: ₹40–48k\nWant to know about available seats?");
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
        appendMessage("bot", "Eligibility:\n1. 12th Biology\n2. PNT Exam\n3. Age: 17–35\nWant a summary?");
        step++;
      } else {
        step++;
        processInput("skip");
      }
      break;
    case 12:
      if (positive.includes(input)) {
        appendMessage("bot", "Summary:\n✅ Eligible\n🎓 Fees: ₹70,000\n🏠 Hostel & Training: Yes\n📍 Delhi\n🎯 Recognized by INC\n🪑 Seats: 60\n🎁 Scholarships: Available");
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
