// Define Variables
var quizContainer = document.getElementById('quiz');
var progressContainer = document.getElementById("progress");
var QuestionEl = document.getElementById("question");
var answerA = document.getElementById("btn-a");
var answerB = document.getElementById("btn-b");
var answerC = document.getElementById("btn-c");
var answerD = document.getElementById("btn-d");
var resultsContainer = document.getElementById('results');
var startButton = document.getElementById("start");
var timerEl = document.getElementById("seconds");
var answerButtons = document.getElementById("answers");
var highScoreModal = document.getElementById("score-list");
var quizEnded = false;
var questionIndex = 0;
var score = 0;
var secondsLeft = 100;
var timerInterval;
var highScores = [];

// Define the functions.

function countdownTime(){
    timerInterval = setInterval(function(){
        secondsLeft-- ; 
        timerEl.textContent = secondsLeft;

        if (secondsLeft === 0){
            clearInterval(timerInterval);
            alert("Time's up!");
            quizEnded = true;
            renderQuestion();
        }

    },1000);
}

function renderQuestion(){
    if (questionIndex=== myQuestions.length ){
        quizEnded = true;
    }
    if(quizEnded){
        endQuiz();
    }else{
        QuestionEl.innerHTML = myQuestions[questionIndex].question;
        answerA.innerHTML = myQuestions[questionIndex].answers.a;
        answerB.innerHTML = myQuestions[questionIndex].answers.b;
        answerC.innerHTML = myQuestions[questionIndex].answers.c;
        answerD.innerHTML = myQuestions[questionIndex].answers.d;
        answerButtons.classList.remove("d-none");
        quizContainer.classList.remove("d-none");
       
    }
}

function gradeQuestion(event){
    var useranswer= "";
    if (quizEnded){
        renderQuestion()
    } else {

    if(event.target == answerA){
       useranswer = "a";
    }else if(event.target == answerB){
        useranswer = "b";
    }else if (event.target == answerC){
        useranswer = "c";
    }else if (event.target == answerD){
        useranswer = "d";
    }else {
        alert("You need to select an answer.");
       return;
    }

    if (useranswer === myQuestions[questionIndex].correctAnswer) {
        score++;
        resultsContainer.innerHTML = "Correct!";
        resultsContainer.setAttribute("style", "color:green; font-size:24px");
    } else{
        resultsContainer.innerHTML = "incorrect!";
        resultsContainer.setAttribute("style", "color:red; font-size:24px");
        secondsLeft -= 10;
    }
        if (secondsLeft <= 0){
            quizEnded = true;
            renderQuestion();
        }else{
        clearInterval(timerInterval);
        countdownTime();
        progressContainer.textContent = "Current Score: " + score + " of " + myQuestions.length;
        questionIndex++;
        renderQuestion();
}}}

function startQuiz(){
    quizEnded = false;
    secondsLeft = 60;
    questionIndex = 0;
    renderQuestion();
    countdownTime();
}

function endQuiz(){
  clearInterval(timerInterval);
    quizContainer.classList.add("d-none");
  resultsContainer.textContent = "Your final score is " + score + " out of " + myQuestions.length;
  resultsContainer.setAttribute("style", "color:black; font-size:24px");
  progressContainer.textContent = "";
  timerEl.textContent = 0;
  saveScore();
  getHighScores();
  
}

function saveScore(){
    var userInitials = prompt("Enter initials here!.");
    var highScores = [];
    var scoreObject = {initials: userInitials, userScore: score};
    highScores.push(scoreObject);
    console.log(highScores);
    setHighScores(highScores);
}
function setHighScores(highScores){
    localStorage.setItem("savedScores", JSON.stringify(highScores));
}

function getHighScores(){
    highScores = JSON.parse(localStorage.getItem("savedScores"));
    showHighScores(highScores);
}

function showHighScores(highScores){
    if(!highScores){
        return;
    }else{
    for(i = 0; i < highScores.length; i++){
        var scoreItem = document.createElement("li");
        scoreItem.innerHTML= highScores[i].initials + "   -   " + highScores[i].userScore;
        highScoreModal.append(scoreItem);
      }}
}
// Define Quiz Questions
var myQuestions = [
    {
      question: "Which HTML element do you add JavaScrip in?",
      answers: {
        a: "JS",
        b: "JavaScript",
        c: "Script",
        d: "Scripting"
      },
      correctAnswer: "c"
    },
    {
      question: "How do you insert a comment into JavaScript?",
      answers: {
        a: "||",
        b: "\\",
        c: "//",
        d: "<>"
      },
      correctAnswer: "c"
    },
    {
      question: "How do you create a function in JavaScript?",
      answers: {
        a: "function myFunction()",
        b: "function : myFunction()",
        c: "function = myFunction()",
        d: "function my-function()"
      },
      correctAnswer: "a"
    },
    {
        question: "How should a FOR loop start?",
        answers: {
          a: "for i= 1 to 7",
          b: "for (i>=7 i++)",
          c: "for (i=7; i>=4)",
          d: "for (i=0;i <=7;i++)"
        },
        correctAnswer: "d"
      },
      {
        question: "Can comments have more than one line in Javascript?",
        answers: {
          a: "No",
          b: "Yes",
          c: "Maybe?",
          d: "ask again later"
        },
        correctAnswer: "b"
      },
      {
        question: "Java and JavaScript are the same thing?",
        answers: {
          a: "True",
          b: "False",
          c: "maybe?",
          d: "they sound the same"
        },
        correctAnswer: "b"
      },
      {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: {
          a: "onrightclick",
          b: "onmouseclick",
          c: "onclick",
          d: "onmouseover"
        },
        correctAnswer: "c"
      },
      {
        question: "Which operator is used to assign a value to a variable?",
        answers: {
          a: "-",
          b: "/",
          c: "=",
          d: "$"
        },
        correctAnswer: "c"
      },
      {
        question: "What is the function of Array object that adds and/or removes elements from an Array?",
        answers: {
          a: "unshift",
          b: "splice",
          c: "tosource",
          d: "sort"
        },
        correctAnswer: "b"
      },
      {
        question: "Which of the following methods removes the last element from an Array and returns that element?",
        answers: {
          a: "pop()",
          b: "get()",
          c: "last()",
          d: "none"
        },
        correctAnswer: "a"
      },
      {
        question: "which of the following statements is true for the features of JavaScript?",
        answers: {
          a: "It is designed for creating network-centric applications",
          b: "It is a lightweight, interpreted programming language",
          c: "It is complementary to and integrated with Java",
          d: "All of the above"
        },
        correctAnswer: "d"
      },
      {
        question: "What is the function of Array object that runs through each element of the Array?",
        answers: {
          a: "every()",
          b: "filter()",
          c: "foreach()",
          d: "concat()"
        },
        correctAnswer: "c"
      },
  ];

  getHighScores();
  startButton.addEventListener("click", startQuiz);
  answerButtons.addEventListener("click", gradeQuestion);