// ELEMENTI DELLA PAGINA

// Bottone per avviare il quiz
const startButton = document.getElementById("start-quiz-button");

// Contenitore iniziale con selezione difficoltà e numero domande
const selectionContainer = document.getElementById("selection-container");

// Contenitore principale del quiz (inizialmente nascosto)
const quizContainer = document.getElementById("quiz-container");

// Titolo dove verranno mostrate le domande
const questionTitle = document.getElementById("domanda");

// Contenitore che contiene i pulsanti delle risposte
const answerButtonsContainer = document.querySelector(".container-bottoni");

// Tutti i pulsanti delle risposte
const answerButtons = answerButtonsContainer.querySelectorAll(".bottone");

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


// ARRAY DELLE DOMANDE

const allQuestions = [
  {
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
  },
  {
    difficulty: "easy",
    question: "In Java, which keyword ensures a variable cannot be modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    difficulty: "easy",
    question: "What is the preferred image format for logos in Wikimedia?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: ["Counter Strike Source", "Corrective Style Sheet", "Computer Style Sheet"],
  },
  {
    difficulty: "easy",
    question: "Code name for Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
];
//Spread operator (...): prende tutti gli elementi di un array o le proprietà di un oggetto e li spande in modo tale che siano singoli come se scrivessimo ogni elemento separatamente
// EVENTO DI AVVIO QUIZ

startButton.addEventListener("click", function () {
  // Leggo la difficoltà selezionata dall’utente
  const difficulty = document.getElementById("difficulty-select").value;

  // Leggo il numero di domande scelte dall’utente
  const numQuestions = parseInt(document.getElementById("num-questions").value);

  // Nascondo il menù iniziale e mostro il quiz
  selectionContainer.style.display = "none";
  quizContainer.style.display = "block";

  // Avvio del quiz con i parametri scelti
  startQuiz(difficulty, numQuestions);
});

// FUNZIONE PRINCIPALE DEL QUIZ

function startQuiz(selectedDifficulty, maxQuestions) {
  let currentQuestionIndex = 0; // Indice della domanda attuale
  let userCorrectAnswers = 0; // Risposte corrette date dall’utente
  let userWrongAnswers = 0; // Risposte sbagliate date dall’utente

  // Filtro le domande in base alla difficoltà selezionata
  let filteredQuestions = allQuestions.filter(function (question) {
    return question.difficulty === selectedDifficulty;
  });

  // Se non ci sono domande della difficoltà scelta, uso tutto l’array
  if (filteredQuestions.length === 0) {
    filteredQuestions = [...allQuestions];
  }

  // Mischio le domande e ne prendo solo il numero richiesto
  filteredQuestions = shuffleArray(filteredQuestions).slice(0, maxQuestions);

  // Mostro la prima domanda
  showQuestion();

  // MOSTRA UNA DOMANDA

  function showQuestion() {
    // Se non ci sono più domande, mostro i risultati finali
    if (currentQuestionIndex >= filteredQuestions.length) {
      showResults();
      return;
    }

    // Prendo la domanda corrente
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;

    // Creo un array con tutte le risposte (corretta + errate) mischiate
    const allAnswers = shuffleArray([currentQuestion.correct_answer, ...currentQuestion.incorrect_answers]);

    // Associo le risposte ai pulsanti
    answerButtons.forEach(function (button, index) {
      button.style.display = "inline-block"; // Mostro il pulsante
      button.disabled = false; // Abilito il pulsante
      button.style.backgroundColor = "rgba(255,255,255,0.08)"; // Colore neutro
      button.textContent = allAnswers[index]; // Testo della risposta

      // Evento click su ogni pulsante
      button.onclick = function () {
        // Se la risposta è corretta
        if (button.textContent === currentQuestion.correct_answer) {
          button.style.backgroundColor = "green";
          userCorrectAnswers++;
        } else {
          // Se la risposta è sbagliata
          button.style.backgroundColor = "red";
          userWrongAnswers++;
        }

        // Disabilito tutti i pulsanti dopo la scelta
        answerButtons.forEach(function (btn) {
          btn.disabled = true;
        });

        // Passo alla prossima domanda dopo un piccolo ritardo
        setTimeout(function () {
          currentQuestionIndex++;
          showQuestion();
        }, 800); //l'800 sono i millisecondi, in modo che vedono l'animazione rossa verde
      };
    });
  }

  // MOSTRA RISULTATI FINALI

  function showResults() {
    questionTitle.textContent = "Quiz terminato! Corrette: " + userCorrectAnswers + " - Sbagliate: " + userWrongAnswers;

    // Nascondo i pulsanti delle risposte
    answerButtons.forEach(function (button) {
      button.style.display = "none";
    });
  }
}

// FUNZIONE PER MESCOLARE UN ARRAY

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temporaryValue = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}