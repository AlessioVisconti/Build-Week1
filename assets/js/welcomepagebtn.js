// Have Control On Checkbox

const chechboxPart = document.getElementById("checkboxPromessa");

// Have Control On Proceed Button

const proceedBtn = document.getElementById("proceedBtn");

// Add Eventlistener On Checkbox

chechboxPart.addEventListener("change", () => {
  if (chechboxPart.checked) {
    proceedBtn.classList.remove("nonAttivo");
    proceedBtn.classList.add("attivo");
    proceedBtn.disabled = false;
  } else {
    proceedBtn.classList.remove("attivo");
    proceedBtn.classList.add("nonAttivo");
    proceedBtn.disabled = tru;
  }
});

// Add Eventlistener On Button

proceedBtn.addEventListener("click", () => {
  if (!proceedBtn.disabled) {
    window.location.href = "../assets/index/quizz.html";
  }
});
