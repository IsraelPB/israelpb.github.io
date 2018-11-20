// starting variables
var correct = 0;
var incorrect = 0;
var skipped = 0;
var index = 0;
var time = 10;
var currentQuestion = '';
var currentChoices = [];
var clock;
var timeoutVar;
var waitBetweenQuestions = 4000; 

// qs&as
var questions = [    
    
  
{
        question: "What is cloud's main weapon?",
        choices: ['A spoon', 'Buster Sword', 'Masamune', 'Jesus'],
        correct: 1,
        pic: "assets/images/buster.jpg"
    },
    {
        question: "Which reactor did Cloud get off in the starting opening scene?",
        choices: ['Midgar', '24th and mission', 'North Crater', 'Reactor 1'],
        correct: 3,
        pic: "assets/images/reactor.jpg"
    },
    {
        question: "Before Hojo renamed Red XIII, what was his REAL name?",
        choices: ['Nanaki', 'My little Pony', "Charmander", "Red"],
        correct: 0,
        pic: "assets/images/redvii.png"
    },
    {
        question: "Who is the main \"Bad guy\" of this series.?",
        choices: ["Sephiroth", 'Mickey', 'My mother in law', "Zack"],
        correct: 0,
        pic: "assets/images/sephiroth.gif"
    },
    {
        question: 'Sephiroth is also known as......',
        choices: ['One winged angel', 'Dude with the long ass sword', 'God Of War', "Emo"],
        correct: 0,
        pic: "assets/images/winged.gif"
    },
    {
        question: "What year was Final Fantasy 7 released in the US?",
        choices: ['1944', "2001", "1997", "2012"],
        correct: 2,
        pic: "assets/images/cloudske.gif"
    },
    {
        question: "Which type of chocobo can cross over mountains, oceans and rivers?",
        choices: ['Chocobo', 'Blue Chocobo', 'Black Chocobo', 'Golden Chocobo'],
        correct: 3,
        pic: "assets/images/chocobo.gif"
    },
    {
        question: "What summon does Sephiroth use in the final fight?",
        choices: ["Meteor", "ALL of the above", "My ex-wife", "Super Nova"],
        correct: 3,
        pic: "assets/images/memory.gif"
    }
];

// Hide certain elements until game starts
$("#question-area").hide();
$("#answer-area").hide();
$("#stats").hide();
$("#end-area").hide();
$(".backGroundi").hide();


// Timer function that handles the countdown
function timer() {
    time = 10;
    $("#timer").html(time + " secs");
    clock = setInterval(countdown, 1000);
    function countdown() {

        if (time > 1) {
            time--;
        } else {
            clearInterval(clock);
            checkAnswer("timeout");
        };
        $("#timer").html(time + " secs");
    };
};


// Updates the question area
function updateQuestion() {
    timer();

    $("#answer-area").hide();
    $("#question-area").show();

    if (index === questions.length) {
        endGame();
        return;
    } else {
        currentQuestion = questions[index].question;
        for (var i = 0; i < 4; i++) {
            currentChoices[i] = questions[index].choices[i];
        }
    };

    var questionNumber = index + 1;
    $("#index").text(questionNumber);
    $("#current-question").text(currentQuestion);

    $("#0").text(currentChoices[0]);
    $("#1").text(currentChoices[1]);
    $("#2").text(currentChoices[2]);
    $("#3").text(currentChoices[3]);

    console.log("Question #" + questionNumber);
};

// Updates the answer area (correct answer text and pic)
function updateAnswer(x) {

    // In 4 seconds, go to next question. If last question, show results
    if (index === questions.length) {
        endGame();
    } else {
        timeoutVar = setTimeout(updateQuestion, waitBetweenQuestions);
    };


    $("#question-area").hide();
    $("#answer-area").show();

    var correctIndex = questions[index].correct;
    var correctPic = questions[index].pic;

    if (x == questions[index].correct) {
        $("#right-or-wrong").html("<h2 style='font-weight: bold;'>CORRECT!</h2>");
    } else if (x == "timeout") {
        $("#right-or-wrong").html("<h2 style='font-weight: bold;'>Out of time</h2>")
    } else {
        $("#right-or-wrong").html("<h2 style='font-weight: bold;'>Wrong...</h2>");
    }

    $("#pic").attr("src", correctPic);

    $(".correct-sofar").text(correct);
    $(".incorrect-sofar").text(incorrect);
    $(".skipped-sofar").text(skipped);

    $("#correct-answer-id").text(questions[index].choices[correctIndex]);
    console.log("Correct answer was: " + questions[index].choices[correctIndex]);

    time = 0;

}

// Checks user input if right or wrong
function checkAnswer(answer) {

    // Test if game is over, and do not keep executing this function
    if (index == questions.length) {
        return;
    }

    if (answer === questions[index].correct) {
        console.log("Clicked the correct answer!");
        correct++;
    } else if (answer == "timeout") {
        console.log("Times out...");
        skipped++;
    } else {
        console.log("Clicked the wrong answer...");
        incorrect++;
    }
    clearInterval(clock);
    time = 12;
    updateAnswer(answer);
    index++;
    $("#question-area").hide();

};

// Start game function
function startGame() {
    // gameStarted = true;
    $("#click-to-start").hide();
    $(".backGroundi").show();
    
    updateQuestion();
};

function endGame() {
    $("#question-area").hide();
    $("#answer-area").hide();
    $("#stats").hide();
    $("#end-area").show();
}



$(document).ready(function () {
    
        var musica = document.createElement("audio");
        musica.setAttribute("src","assets/javascript/01-prelude.mp3");
        $("#musicaAudio").on("click", function() {
            musica.play();

        });
    
        $("#stopMusic").on("click",function(){
            musica.pause();
        })
    

  
    $("#click-to-start").on("click", function () {
        startGame();
        $("#regreso").hide();
        $("body").back
        $("#question-area").show();
        $("#stats").show();
        // $(".backGroundi").src= "../images/ffback.png";
                
        
    });

    $(".choices").on("click", function () {
        var userChoice = parseInt($(this).attr("id"));
        console.log("Clicked choice: " + userChoice);
        checkAnswer(userChoice);
    });

    $("#play-again").on("click", function () {
        correct = 0;
        incorrect = 0;
        skipped = 0;
        index = 0;
        currentQuestion = '';
        currentChoices = [];

        clearInterval(clock);
        clearTimeout(timeoutVar);

        $(".correct-sofar").text(correct);
        $(".incorrect-sofar").text(incorrect);
        $(".skipped-sofar").text(skipped);

        $("#end-area").hide();

        updateQuestion();

        $("#question-area").show();
        $("#stats").show();
    });

});