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

// TIMER //
// Elementi e variabili globali del timer
const START_TIME = 60; // tempo di partenza (60 secondi)
let timeLeft = START_TIME; // tempo rimanente
let timer; // variabile che conterrà l'intervallo
const countdownEl = document.getElementById("countdown");

// Funzione per avviare/reset del timer
function startTimer(onTimeUp) {
  clearInterval(timer); // prima cancello eventuale timer precedente
  timeLeft = START_TIME; // resetto il tempo
  countdownEl.textContent = timeLeft; // aggiorno subito il testo

  // avvio l'intervallo ogni secondo
  timer = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      countdownEl.textContent = "0";
      clearInterval(timer); // fermo il timer
      if (typeof onTimeUp === "function") {
        onTimeUp(); // se passo una funzione, la eseguo allo scadere
      }
    } else {
      countdownEl.textContent = timeLeft; // aggiorno il testo ogni secondo
    }
  }, 1000);
}

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
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "What is the domain name for the country Tuvalu?",
    correct_answer: ".tv",
    incorrect_answers: [".tu", ".tt", ".tl"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "On Twitter, what was the original character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "What does LTS stand for in the software market?",
    correct_answer: "Long Term Support",
    incorrect_answers: ["Long Taco Service", "Ludicrous Transfer Speed", "Ludicrous Turbo Speed"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: ".rs is the top-level domain for what country?",
    correct_answer: "Serbia",
    incorrect_answers: ["Romania", "Russia", "Rwanda"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: "Approximately how many Apple I personal computers were created?",
    correct_answer: "200",
    incorrect_answers: ["100", "500", "1000"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: "While Apple was formed in California, in which western state was Microsoft founded?",
    correct_answer: "New Mexico",
    incorrect_answers: ["Washington", "Colorado", "Arizona"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: "Which internet company began life as an online bookstore called &#039;Cadabra&#039;?",
    correct_answer: "Amazon",
    incorrect_answers: ["eBay", "Overstock", "Shopify"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: "Nvidia&#039;s headquarters are based in which Silicon Valley city?",
    correct_answer: "Santa Clara",
    incorrect_answers: ["Palo Alto", "Cupertino", "Mountain View"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: "In HTML, which non-standard tag used to be be used to make elements scroll across the viewport?",
    correct_answer: "&lt;marquee&gt;&lt;/marquee&gt;",
    incorrect_answers: ["&lt;scroll&gt;&lt;/scroll&gt;", "&lt;move&gt;&lt;/move&gt;", "&lt;slide&gt;&lt;/slide&gt;"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: "What does the term GPU stand for?",
    correct_answer: "Graphics Processing Unit",
    incorrect_answers: ["Gaming Processor Unit", "Graphite Producing Unit", "Graphical Proprietary Unit"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: "Which of the following languages is used as a scripting language in the Unity 3D game engine?",
    correct_answer: "C#",
    incorrect_answers: ["Java", "C++", "Objective-C"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: "What does AD stand for in relation to Windows Operating Systems? ",
    correct_answer: "Active Directory",
    incorrect_answers: ["Alternative Drive", "Automated Database", "Active Department"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: "How good is Stefano? ",
    correct_answer: "Absolute Genius",
    incorrect_answers: ["Spectaculare", "Excellent", "Brillant"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question: "What does the International System of Quantities refer 1024 bytes as?",
    correct_answer: "Kibibyte",
    incorrect_answers: ["Kylobyte", "Kilobyte", "Kelobyte"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question: "Who is the founder of Palantir?",
    correct_answer: "Peter Thiel",
    incorrect_answers: ["Mark Zuckerberg", "Marc Benioff", "Jack Dorsey"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question: "Which of these names was an actual codename for a cancelled Microsoft project?",
    correct_answer: "Neptune",
    incorrect_answers: ["Enceladus", "Pollux", "Saturn"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question: "What is the name given to layer 4 of the Open Systems Interconnection (ISO) model?",
    correct_answer: "Transport",
    incorrect_answers: ["Session", "Data link", "Network"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question: "Which of the following is NOT a computer science algorithm?",
    correct_answer: "Float Sort",
    incorrect_answers: ["Bubble Sort", "Merge Sort", "Quick Sort"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question: "What was the name of the security vulnerability found in Bash in 2014?",
    correct_answer: "Shellshock",
    incorrect_answers: ["Heartbleed", "Bashbug", "Stagefright"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question: "Which of these is not a key value of Agile software development?",
    correct_answer: "Comprehensive documentation",
    incorrect_answers: ["Individuals and interactions", "Customer collaboration", "Responding to change"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question: "What type of sound chip does the Super Nintendo Entertainment System (SNES) have?",
    correct_answer: "ADPCM Sampler",
    incorrect_answers: ["FM Synthesizer", "Programmable Sound Generator (PSG)", "PCM Sampler"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question: "Australia, Japan, and Southeast Asia are in which ITU Region?",
    correct_answer: "Region 3",
    incorrect_answers: ["Region 1", "Region 2", "Region 4"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question: "Which encryption algorithm was selected as the AES standard by NIST in 2001?",
    correct_answer: "Rijndael",
    incorrect_answers: ["Twofish", "Serpent", "Blowfish"],
  },
];

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

    // Ogni volta che parte una nuova domanda resetto il timer
    startTimer(() => {
      // cosa succede se finisce il tempo:
      currentQuestionIndex++;
      showQuestion();
    });

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
        }, 800); // l'800 sono i millisecondi, in modo che vedono l'animazione rossa verde
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

    clearInterval(timer); // fermo il timer quando finisce il quiz
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
