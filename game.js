var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var start=false;
var level=0;
$(".btn").click(function() {

    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        console.log("success")

        if (userClickedPattern.length===gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            },1000);
        }
    }
    else{
        var wrong=new Audio("sounds/wrong.mp3")
        wrong.play(); 
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    start=false;
}

function nextSequence(){
    userClickedPattern=[]
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name){
    var audio=new Audio("sounds/" + name + ".mp3")
    audio.play(); 
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
}

$(document).keydown(function() {
    if (!start) {
        nextSequence();
        start=true;
    }
    
})

$(document).mousemove(function() {
    if (!start) {
        nextSequence();
        start=true;
    }
    
})
