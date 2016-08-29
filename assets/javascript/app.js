$(document).ready(function(){

var timeLimit = 5; correctCount = 0; incorrectCount = 0; unansweredCount = 0; questionNum = 0;
var result = ""; correctAnswer = "";
var number = timeLimit;
var question = [
    'Question 1',
    'Question 2',
    'Question 3',
    'Question 4',
    ];
var unansweredCount = question.length;

// This function will display a new question 
function showQuestion() {	
	// After all the questions have been asked, display the results
	if (questionNum >= question.length) {
		var unansweredCount = question.length - correctCount - incorrectCount;
		stopTimer();
		result = "<p>All done, here's how you did!</p>";
		result = result + "<p>Correct Answers: " + correctCount + "</p>";
		result = result + "<p>Incorrect Answers: " + incorrectCount + "</p>";
		result = result + "<p>Unanswered: " + unansweredCount + "</p>";
		$("#btnStart").text("Start Over");
		$("#btnStart").show();
		$("#timer").hide();
		$("#question").hide();
		$("#answers").hide();
		displayResult(result, false);
	}
	else {
		$("#result").empty();
	    $("#question").html("<p>" + question[questionNum] + "</p>");
		$("#answers").show();
		resetTimer();
		startTimer();
	}
}

function displayResult(result, doTimeout) {
	$("#result").html(result);
	$("#result").show();
	$("#answers").hide();
	if (setTimeout) {
		var resultTimeout = setTimeout(wait, 1 * 1000);
	}
}

function wait() {
	questionNum++;
	showQuestion(questionNum);
}

function showTimer() {
    $("#timer").html("<p>Time remaining: " + number + " seconds</p>");
}

function startTimer() {
    counter = setInterval(decrement, 1000);
    showTimer()
}

function stopTimer() {
    clearInterval(counter);
}

function resetTimer() {
    number = timeLimit;
    showTimer();
}

function decrement(){
    number--;
    showTimer();
    if (number == 0){
    	outOfTime();
    }
}

function outOfTime () {
    stopTimer();
 	result = "<p>Out of Time!</p>";
	result = result + "<p>The correct answer was: </p>" + correctAnswer;
	displayResult(result, true);
}

function isCorrectAnswer() {
	return true;
}

// This function initializes variables
function newGame() {
	correctCount = 0; incorrectCount = 0; questionNum = 0;
	resetTimer();
	$("#timer").show();
	$("#question").show();
	$("#answers").show();
	$("#result").empty();
}

$("#btnStart").on("click", function() {  
	newGame();
	$("#btnStart").hide();
	startTimer();

});

$("#answers").on("click", function() {      
   	stopTimer();

	if (isCorrectAnswer()) {
		correctCount++
		result = "<p>Correct!</p>";
	}
	else {
		incorrectCount++
		result = "<p>Nope!</p>";
		result = result + "<p>The correct answer was: </p>" + correctAnswer;
	}
	
	displayResult(result, true);
});


// Start of the game
$("#answers").hide();
$("#btnStart").show();

});