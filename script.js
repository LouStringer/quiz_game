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
  // empty variables (private)
  let questionList = [];
  let currentQuestion = 0;
  let givenAnswer = "";
  let correct = "";
  let guesses = 1;
  let score = 0;
  let lives = 3;
  const outcome = document.querySelector(".outcome");

  // function constructor to generate questions (private)
  const Question = function(category, level, question, answers, correct) {
    this.category = category,
    this.level = level,
    this.question = question,
    this.answers = answers,
    this.correct = correct,
    this.display = function() {
      console.log(this.question + this.answers);
    }
    // this.isCorrect = function() {
    //   givenAnswer === this.correct ? correct = true : correct = false;
    // }
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
    function newQuestion() {
      currentQuestion = Math.floor(Math.random()*questionList.length);
      questionList[currentQuestion].display();
      optionsContainer.classList.remove("hide");
      outcome.classList.add("hide");
      guesses = 1;
      for (i = 0; i < optionsButtons.length; i++) {
        optionsButtons[i].style.visibility = "visible";
      };
    }
  // };

  // event listener for option buttons
  const optionsButtons = [].slice.call(document.querySelectorAll("button.option"));
  const optionsContainer = document.querySelector(".optionsContainer");

  for (i = 0; i < optionsButtons.length; i++) {
    optionsButtons[i].addEventListener("click", function() {
      givenAnswer = parseInt(this.id);
      correct = givenAnswer === questionList[currentQuestion].correct;
      outcome.classList.remove("hide");
      if (correct) {
        outcome.textcontent = "Correct!";
        optionsContainer.classList.add("hide");
        guesses === 1 ? score++ : score = score + 0.5;
        setTimeout(newQuestion, 1000);
      } else if (!correct && guesses === 1) {
        this.style.visibility = "hidden";
        outcome.textcontent = "Try again";
        guesses++;
        lives = lives - 0.5;
      } else {
        optionsContainer.classList.add("hide");
        outcome.textcontent = "bad luck";
        lives = lives - 0.5;
        setTimeout(newQuestion, 100);
      }
      // update lives & score
    });
  }
// })();

// quizGame.playGame();
newQuestion();
