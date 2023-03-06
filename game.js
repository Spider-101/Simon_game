
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level=0;
var started=true;

function startOver()
{
    level=0;
    gamePattern=[];
    started=true;
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]!==gamePattern[currentLevel])
    {
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game over, Press Any Key to Restart");
        startOver();
    }
    
    else
    {
        
    }

    if(userClickedPattern.length===gamePattern.length)
    {
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}

function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

// Animate when pressed
function animatePress(currentColour)
{
    var currcolclass = "#"+currentColour;
    $(currcolclass).addClass("pressed");

    setTimeout(function()
    {
        $(currcolclass).removeClass("pressed");
    },100);
}

// Generate a random sequence
function nextSequence()
{
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    console.log(randomChosenColour);

    var buttonClass="."+randomChosenColour;
    $(buttonClass).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    $("#level-title").text("Level "+level++);
}


$(".btn").click(function(){

    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

$(document).keydown(function(){
    if(started)
        {
            nextSequence();
            started=false;
        }
});