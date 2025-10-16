// Data alvo
const targetDate = new Date("October 18, 2025 13:00:00").getTime();

// Atualiza contadores
function updateCounters() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(distance / (1000 * 60 * 60));
  const totalMinutes = Math.floor(distance / (1000 * 60));
  const totalSeconds = Math.floor(distance / 1000);
  const totalMilliseconds = distance;

  document.getElementById("days").textContent = days;
  document.getElementById("totalHours").textContent = totalHours;
  document.getElementById("totalMinutes").textContent = totalMinutes;
  document.getElementById("totalSeconds").textContent = totalSeconds;
  document.getElementById("totalMilliseconds").textContent = totalMilliseconds;

  // Atualiza o fullscreen se estiver aberto
  if (fullscreenOverlay.style.display === "flex" && currentCounter) {
    document.getElementById("fullscreenValue").textContent = 
      document.getElementById(currentCounter).textContent;
  }
}

// Intervalo de atualização
const interval = setInterval(updateCounters, 50);
updateCounters();

// ======== TELA CHEIA ========
const fullscreenOverlay = document.getElementById("fullscreenOverlay");
let currentCounter = null;

document.querySelectorAll(".time-box").forEach(box => {
  box.addEventListener("click", () => {
    currentCounter = box.dataset.counter;
    const value = document.getElementById(currentCounter).textContent;
    const label = box.querySelector(".label").textContent;
    document.getElementById("fullscreenValue").textContent = value;
    document.getElementById("fullscreenLabel").textContent = label;
    fullscreenOverlay.style.display = "flex";
  });
});

// Botão fechar
document.getElementById("closeBtn").addEventListener("click", () => {
  fullscreenOverlay.style.display = "none";
  currentCounter = null;
});

