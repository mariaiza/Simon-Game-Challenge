var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

$(document).keydown(initializeSequence);
$(".btn").click(userChosenColour);

function initializeSequence() {
    if (!started) {
        started = true;
        nextSequence();
    }
}

function playSound(name) {
    var audio = new Audio(name);
    audio.play();
}

function userChosenColour() {
    var userChosenColour = this.id;
    var audioFile = `sounds/${userChosenColour}.mp3`
    var index = userClickedPattern.length;
    userClickedPattern.push(userChosenColour);
    playSound(audioFile);
    animatePress(userChosenColour);
    setTimeout(animatePress, 100, userChosenColour);
    checkAnswer(index);
}

function checkAnswer(index) {
    if (gamePattern[index] == userClickedPattern[index]) {
        if (index + 1 == gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {
        playSound('sounds/wrong.mp3');
        animateGameOver();
        setTimeout(animateGameOver, 200);
        changeHeaderText('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function changeHeaderText(text) {
    $("#level-title").text(text);
}

function animateGameOver() {
    $("body").toggleClass("game-over");
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 3);
    randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(200).fadeIn(200);
    var audioFile = `sounds/${randomChosenColour}.mp3`
    playSound(audioFile);
    changeHeaderText(`Level ${level++}`);
}

function animatePress(currentColour) {
    var element = $(`.${currentColour}`);
    element.toggleClass("pressed");
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}