document.addEventListener("DOMContentLoaded", () => {
  const START_TIME = 60;
  const countdownEl = document.getElementById("countdown");
  let timeLeft = START_TIME;

  countdownEl.textContent = timeLeft;

  const timer = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      countdownEl.textContent = "0";
      clearInterval(timer);
    } else {
      countdownEl.textContent = timeLeft;
    }
  }, 1000);
});