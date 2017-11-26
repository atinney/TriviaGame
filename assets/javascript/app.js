

$(document).ready(function() {

// Set up questions: question, image, answers, right answer
	var myQuestions = [
		{
			question: "Question 1: A 'steelhead' is a type of ocean-going...",
			answers: {
				a: 'Salmon',
				b: 'Rainbow Trout',
				c: 'Shark'
			},
			correctAnswer: 'b'
		},
		{
			question: "Question 2: Trout begin spawning at the age of...",
			answers: {
				a: '1',
				b: '3 or 4',
				c: '10'
			},
			correctAnswer: 'b'
		},
		{
			question: "The rainbow trout has been introduced to every continent except...",
			answers: {
				a: 'North America',
				b: 'Europe',
				c: 'Antarctica'
			},
			correctAnswer: 'c'
		},
		{
			question: "Spawning season for rainbow trout occurs in the....",
			answers: {
				a: 'Winter',
				b: 'Summer',
				c: 'Spring'
			},
			correctAnswer: 'c'
		},
		{
			question: "True or false, trout have excellent vision.",
			answers: {
				a: 'True',
				b: 'False',
			},
			correctAnswer: 'a'
		},
	];

	//Initialize global interval variable for timer
	var intervalID = 0;

	//Initialize global variable for responses
	var responses = [];


	//Global variables for answers
	var correctAnswers = 0;
	var wrongAnswers = 0;
	var noAnswers = 0;

	// Show the start button
	$("#timer").html("<center><button id='start-button' class='btn btn-default text-center start' value='start'><h4>Start a new game!</h4></button></center>");




	// Once user clicks start, start timer and load questions with radio buttons
	$("#start-button").on("click", function startGame() {

		//Clear variables
		initializeGame()

		//Print questions to page
		printQuestions(myQuestions)


		//Start timer
		countDown()



		//If user presses submit before timer runs out, finalize the game (otherwise the timer function will call finalize)

		$("#submit-button").on("click", function () {
			clockRunning = false;
			clearInterval(intervalID);
			finalizeGame();

		});


	});



	function initializeGame () {
		var clockRunning = true;
		var responses = [];
		var correctAnswers = 0;
		var wrongAnswers = 0;
		var noAnswers = 0;


	}

	function countDown () {

		// Set the minutes and seconds we're counting down to
		var startMinutes = 1;
		var startSeconds = 30;

		// Combine them into a seconds value
		var timerStart = (startMinutes * 60) + startSeconds;

		clockRunning = true

		// Update the count down every 1 second
		var intervalID = setInterval(function() {

			//Decrement seconds
			timerStart--;

			// Find the difference between now an the count down date
			var difference = timerStart - 0;

		    //Convert seconds into minutes and seconds
		    var t = timeConverter(difference);

		    //Update the timer on the page with minutes and seconds
			$("#timer").html("<center><h3>" + t + "</h3></center>");

			  // If the count down is finished, write some text 
			  if (difference < 0) {

				clockRunning = false;
			  	//set clock running to false just in case
			    clearInterval(intervalID);	
				// Clear the questions and show the results
				finalizeGame();			    

			  }
		}, 1000);

	}



	function printQuestions (obj) {

		$.each(obj, function (index, value) {

			//print questions
			$("#question-container").append("<div class='col-lg-12' id='question-" + index + "'><div class='panel panel-default'><div class='panel-heading'><h3 class='panel-title'>" + value.question + "</h3></div><div class='panel-body' id='answers-" + index + "'>");

			//store the index of the question temporarily to target the right div to print the answers
			var tempQuestion = index;

			$.each(value.answers, function(index, value) {

				//print answers and set the value of each to = the key
				$("#answers-"+ tempQuestion).append("<div class='radio'><label><input type='radio' name='" + tempQuestion + "' id='" + tempQuestion + "' value='" + index + "'>" + value + "</label></div>");
			});

			//close the answers container
			$("#answers-" + tempQuestion).append("</div>");

		});		

	// Add a submit button
	$("#question-container").append("<center><button id='submit-button' class='btn btn-default text-center submit' value='submit'><h4>Submit!</h4></button></center>");

	}


	function timeConverter(t) {

	    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
	    var minutes = Math.floor(t / 60);
	    var seconds = t - (minutes * 60);

	    if (seconds < 10) {
	      seconds = "0" + seconds;
	    }

	    if (minutes === 0) {
	      minutes = "00";
	    }

	    else if (minutes < 10) {
	      minutes = "0" + minutes;
	    }

	    return minutes + ":" + seconds;
 	}

 	function finalizeGame () {
 		//iterate through radio buttons and figure out answers
		for (i = 0; i < myQuestions.length; i++ ){
			
			//Get the question # for the answer selected
			var tempAnswer = $("input[name='" + i + "']:checked").val();
			console.log("Question is: " + i);
			console.log("Answer is: " + tempAnswer);

			//store answer into the responses array at the index of the question
			responses[i] = tempAnswer;
		}

 		$("#timer").empty();
 		$("#question-container").empty();
 		$("#game-subheader").text("Game over!");

 		//Add some spans for answer counts....this is a workaround for a bug of double printing that needs to get tracked down...
 		$(".jumbotron").append("<center><h4><span id='correct'></span></h4></center>");
 		$(".jumbotron").append("<center><h4><span id='wrong'></span></h4></center>");
 		$(".jumbotron").append("<center><h4><span id='unanswered'></span></h4></center>");


 		console.log("Answers array is:" + responses);

 		//check answers
 		for (i = 0; i < responses.length; i++) {

			if (responses[i] === myQuestions[i].correctAnswer){
				correctAnswers++;
			}


			else if(responses[i] == undefined) {
				noAnswers++;

			}

			else if (responses[i] !== myQuestions[i].correctAnswer) {
				wrongAnswers++;

			}

 		}

 		//Print answers to screen, correct code once bug is fixed
 		$("#correct").text("Correct Answers: " + correctAnswers);
 		$("#wrong").text("Wrong Answers: " + wrongAnswers);
 		$("#unanswered").text("Unanswered: " + noAnswers);


 		// //Print answers to screen, correct code once bug is fixed
 		// $(".jumbotron").append("<center><h4>Correct Answers: " + correctAnswers + "</h4></center>");
 		// $(".jumbotron").append("<center><h4>Wrong Answers: " + wrongAnswers + "</h4></center>");
 		// $(".jumbotron").append("<center><h4>Unanswered: " + noAnswers + "</h4></center>");


	}


//end page function
});

