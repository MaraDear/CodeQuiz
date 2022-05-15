var questions = [
    {
        ask: "String values must be closed within  _______ when being assigned to variables.",
        choice: ["Parenthesis", "Quotes", "Commas", "Curly Brackets"],
        answer: "Quotes"
    },
    {
        ask: "The condition in an if/else statement is enclosed within _______",
        choice: ["Parenthesis", "Quotes", "Commas", "Curly Brackets"],
        answer: "Parenthesis"
    },
    {
        ask: "Commonlyused data types do NOT include:",
        choice: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts"
    },
    {
        ask: "Arrays in Javascript can be used to store ______",
        choice: ["Numbers and Strings", "Other Arays", "Booleans", "All of the Above"],
        answer: "All of the Above"
    },
    {
        ask: "A very useful tool used during development and debugging for printing content to the debugger is ______",
        choice: ["Javascript", "Terminal/Bash", "Console Log", "For Loops"],
        answer: "Console Log"
    }
];

var choicesList = document.querySelector(".userChoices");
var questionAsked = document.querySelector(".questions");
var current = document.getElementById("currentTime");
var interval;
var timer = 75;
var index = 0;
var score = 0;
var incorrect = 10;

function start() {
    current.textContent = "Timer:" + timer;
    interval = setInterval(() => {
        timer--;
        current.textContent = "Timer: " + timer;
        if(timer <= 0) {
            clearInterval(interval);
            current.textContent = 0;
            endGame();
        } else if(questions[index] >= questions.length) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);

    showQuestions(index);
}

function checkQuestion(userChose){
    var element = userChose.target.getAttribute("data-name");
    var correct = questions[index].answer;
    var determined = document.createElement("div");
    determined.setAttribute("id", "determined");
        if(element == correct){
            ++score;
            determined.textContent = "Correct!";
            nextQuestion();
        } else {
            timer = timer - incorrect;
            determined.textContent = "Wrong!";
            nextQuestion();
        }
        choicesList.appendChild(determined);
}

function showQuestions(question) {
    var question = questions[index];
    questionAsked.innerHTML = "";
    choicesList.innerHTML = "";
    if(index === questions.length) {
        clearInterval(interval);
        endGame();
    }else {
        for(i = 0; i < questions.length; i++) {
            var userQuestion = question.ask;
            var userOptions = question.choice;
            questionAsked.textContent = userQuestion;
        }
        userOptions.forEach(function (listMade){
            var liCreate = document.createElement("li");
            liCreate.setAttribute("class", "answerButton");
            liCreate.setAttribute("data-name", listMade);
            liCreate.textContent = listMade;
            questionAsked.appendChild(choicesList);
            choicesList.appendChild(liCreate);
        liCreate.addEventListener("click", checkQuestion);
        })}
}

function nextQuestion() {
    index++;
    showQuestions();
}

function endGame() {
    questionAsked.innerHTML = "";
    choicesList.innerHTML = "";
    current.textContent = "";

    var endTitle = document.createElement("h1");
    endTitle.textContent = "Game is Over";
    questionAsked.appendChild(endTitle);

    var numberRight = document.createElement("h3");
    numberRight.textContent = "You answered " + score + " questions correctly.";
    questionAsked.appendChild(numberRight);

    var endingScore = document.createElement("p");
    endingScore.textContent = "Score: " + timer;
    endingScore.setAttribute("class", "endingScore");
    questionAsked.appendChild(endingScore);
    
    var initialLabel = document.createElement("label");
    initialLabel.textContent = "Initials here: ";
    questionAsked.appendChild(initialLabel);

    var initialInput = document.createElement("input");
    initialInput.setAttribute("type", "text");
    initialInput.setAttribute("name", "Initials");
    initialInput.setAttribute("placeholder", "Enter your initials here");
    questionAsked.appendChild(initialInput);

    var submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit.";
    submitBtn.setAttribute("type", "submit",);
    submitBtn.setAttribute("value", "submit");
    submitBtn.setAttribute("class", "submitBtn");
    questionAsked.appendChild(submitBtn);

    submitBtn.addEventListener("click", function() {
        var initials = initialInput.value;

        if (initials === "") {
            alert("Please enter your intials to see your highscores.");
            return;
        } else {
            var finalScore = {
                initials: initials,
                score: timer
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore)
            window.location.replace("./highscores.html")
        }
    })
}

document.getElementById("startButton").addEventListener("click", start);