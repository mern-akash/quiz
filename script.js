function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer) {
    if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
}

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
}
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
};
var QuizUI = {
    displayNext: function() {
        if (quiz.hasEnded()) {
            this.displayScore();
        }else{
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion: function() {
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;

        for (var i = 0; i < choices.length; i++) {
            this.populateIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choices[i]);
        }
    },
    displayScore: function() {
        var gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2>Your score is: " + quiz.score + " / 5 </h2>";
        this.populateIdWithHTML("quiz", gameOverHTML);
    },
    populateIdWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            QuizUI.displayNext();
        }
    },

    displayProgress: function() {
        var currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
    }
};

//create questuon
var questions = [
    new Question("How long is an hour in minutes?", ["10", "100", "60", "600"], "60"),
    new Question("A rainbow contains how many colours?", ["5", "7", "8", "10"], "7"),
    new Question("What planet also goes by the name “Red Planet”?", ["Mars", "Earth", "Saturn", "The Sun"], "Mars"),
    new Question("What is the first month of the year?", ["March", "November", "August", "January"], "January"),
    new Question("What is the 1st letter in the alphabet?", ["A", "B", "C", "D"], "A"),
    
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
QuizUI.displayNext();