var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keydown( function(){
    if(!started){

        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;

    }
});


$(".btn").on("click", function() {

    userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);


    playSound(userChosenColor);
    animationPressed(userChosenColor);
    checkAnswers(userClickedPattern.length-1);


});



function checkAnswers(currentLevel){

    if ( userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    
        }  else {
            var wrong = "wrong";
            $("#level-title").text("Game Over, Press Any Key to Restart");
            playSound(wrong);
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 100);
            startOver();
        }
    }


function nextSequence(){

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);


    level ++;
    $("#level-title").text("Level " + level);

    userClickedPattern = [];

}




function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  
  }

function animationPressed (currentColor){

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
