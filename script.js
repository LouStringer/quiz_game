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

const quizGame = (function () {
  // empty variables (private)
  let questionList = [];
  let currentQuestion = 0;
  let givenAnswer = "";

  // function constructor to generate questions (private)
  const Question = function(category, level, question, answers, correct) {
    this.category = category,
    this.level = level,
    this.question = question,
    this.answers = answers,
    this.correct = correct,
    this.display = function() {
      console.log(this.question + this.answers);
    },
    this.isCorrect = function() {
      while (givenAnswer != questionList[currentQuestion].correct) {
      givenAnswer = prompt("Sorry, try again");
      }
      alert("Correct!");
    }
  }

  // create questions (private) - want to change this to use a functions to access a database instead of writing out by hand
  const capitalsTajikistan = new Question("capitals", "hard", "What is the capital of Tajikistan?", [[0, "Dushanabe"], [1, "Tashkent"], [2, "Ashgabat"]], 0);
  questionList.push(capitalsTajikistan);

  const capitalsLiberia = new Question("capitals", "hard", "What is the capital of Liberia?", [[0, "Maseru"], [1, "Banjul"], [2, "Monrovia"]], 2);
  questionList.push(capitalsLiberia);

  const capitalsHungary = new Question("capitals", "easy", "What is the capital of Hungary?", [[0, "Vienna"], [1, "Bratislava"], [2, "Budapest"]], 2);
  questionList.push(capitalsHungary);

  return {
    // play one question (accessible outside module)
    playGame: function() {
      currentQuestion = Math.floor(Math.random()*questionList.length);
      questionList[currentQuestion].display();
      givenAnswer = prompt("Which answer do you think is correct?");
      questionList[currentQuestion].isCorrect();
    }
  };
})();

quizGame.playGame();
