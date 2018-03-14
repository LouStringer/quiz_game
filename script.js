// Instructions from Complete JavaScript by Jonas Schmedtmann
// 1. build a function constructor containing
//     - question
//     - array/object of answers
//     - correct answer (number)
// 2. create some questions using constructor
// 3. store all the questions in an array
// 4. randomly select question, log it to console with answers (use a method)
// 5. use prompt to ask for answer - input number of answer chosen
// 6. check if answer is correct and console.log if correct or not (method)
// 7. make this a module


// const quizGame = (function () {
  // empty variables (private) and DOM elements
  let questionList = [];
  let currentQuestion = 0;
  let givenAnswer = "";
  let correct = "";
  let guesses = 1;
  let score = 0;
  let lives = 3;
  const questionArea = document.querySelector(".question-area");
  const questionText = document.querySelector(".question");
  const optionsButtons = [].slice.call(document.querySelectorAll("button.option"));
  const optionsContainer = document.querySelector(".optionsContainer");
  const outcome = document.querySelector(".outcome");
  const scoreDisplay = document.querySelector(".score>span");
  const livesDisplay = document.querySelector(".lives>span");
  const gameOver = document.querySelector(".gameOver");
  const resetButton = document.querySelector("button.reset");

  // function constructor to generate questions (private)
  const Question = function(category, level, question, answers, correct) {
    this.category = category,
    this.level = level,
    this.question = question,
    this.answers = answers,
    this.correct = correct,
    this.display = function() {
      questionText.innerText = this.question;
      for (let i = 0; i < optionsButtons.length; i++) {
        optionsButtons[i].innerText = this.answers[i][1];
      };
    };
  }

  // create questions (private) - want to change this to use a functions to access a database instead of writing out by hand
  const capitalsTajikistan = new Question("capitals", "hard", "What is the capital of Tajikistan?", [[0, "Dushanabe"], [1, "Tashkent"], [2, "Ashgabat"]], 0);
  questionList.push(capitalsTajikistan);

  const capitalsLiberia = new Question("capitals", "hard", "What is the capital of Liberia?", [[0, "Maseru"], [1, "Banjul"], [2, "Monrovia"]], 2);
  questionList.push(capitalsLiberia);

  const capitalsHungary = new Question("capitals", "easy", "What is the capital of Hungary?", [[0, "Vienna"], [1, "Bratislava"], [2, "Budapest"]], 2);
  questionList.push(capitalsHungary);

  // return {
    // play one question (accessible outside module)
    function playQuestion() {
      currentQuestion = Math.floor(Math.random()*questionList.length);
      questionList[currentQuestion].display();
      optionsContainer.classList.remove("hide");
      outcome.classList.add("hide");
      guesses = 1;
      for (i = 0; i < optionsButtons.length; i++) {
        optionsButtons[i].classList.remove("invisible");
      };
    }
  // };

// update score
function updateScore() {
  scoreDisplay.innerText = score;
}

// update lives and game over if out of lives
function updateLives() {
  lives = lives - 0.5;
  livesDisplay.innerText = lives;
  if (lives === 0) {
    questionArea.classList.add("hide");
    gameOver.classList.remove("hide");
    resetButton.classList.remove("hide");
  }
}

// reset and start new game
function reset() {
  questionArea.classList.remove("hide");
  gameOver.classList.add("hide");
  resetButton.classList.add("hide");
  givenAnswer = "";
  correct = "";
  score = 0;
  scoreDisplay.innerText = score;
  lives = 3;
  livesDisplay.innerText = lives;
  playQuestion();
}
resetButton.addEventListener("click", reset);

// check if given answer is correct
function checkAnswer() {
  givenAnswer = parseInt(this.id);
  correct = givenAnswer === questionList[currentQuestion].correct;
  outcome.classList.remove("hide");
  if (correct) {
    optionsContainer.classList.add("hide");
    outcome.innerText = "correct!";
    guesses === 1 ? score++ : score = score + 0.5;
    updateScore();
    setTimeout(playQuestion, 1000);
  } else if (!correct && guesses === 1) {
    this.classList.add("invisible")
    outcome.innerText = "try again";
    guesses++;
    updateLives()
  } else {
    optionsContainer.classList.add("hide");
    outcome.innerText = "bad luck";
    updateLives()
    if (lives > 0) {
      setTimeout(playQuestion, 1000)
    };
  }
};

// event listener for option buttons
for (i = 0; i < optionsButtons.length; i++) {
  optionsButtons[i].addEventListener("click", checkAnswer);
}

// quizGame.playGame();
playQuestion();
