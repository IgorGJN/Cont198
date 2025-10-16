// Data alvo
const targetDate = new Date("October 18, 2025 13:00:00").getTime();

let serverTimeOffset = 0; // diferença entre hora do servidor e hora local

// Função para pegar hora do servidor
async function fetchServerTime() {
  try {
    const response = await fetch("http://worldtimeapi.org/api/ip"); // API pública
    const data = await response.json();
    const serverTime = new Date(data.utc_datetime).getTime();
    const localTime = new Date().getTime();
    serverTimeOffset = serverTime - localTime; // diferença em ms
    updateCountdown(); // atualiza imediatamente
  } catch (error) {
    console.error("Erro ao obter hora do servidor:", error);
  }
}

function updateCountdown() {
  const now = new Date().getTime() + serverTimeOffset; // ajusta pelo offset
  const distance = targetDate - now;

  if (distance < 0) {
    document.querySelector(".countdown").innerHTML = "<h2>O evento começou!</h2>";
    clearInterval(interval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Atualiza a cada 1 segundo
const interval = setInterval(updateCountdown, 1000);

// Pega hora do servidor antes de iniciar
fetchServerTime();
