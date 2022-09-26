var buttonColors = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;
var gamePattern = [];
var userClickPattern = [];
handleClick();
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
  userClickPattern = [];
}

$("body").keydown(function () {
  $("#level-title").html("Level " + level);
  $("#level-title.title-second").html("");
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});
function handleClick() {
  $(".btn").click(function () {
    var userColor = $(this).attr("id");
    userClickPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);
    levelProgress(userClickPattern.length - 1);
  });
}
function levelProgress(currentLevel) {

  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    if (gamePattern.length === userClickPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 2000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function nextSequence() {
  level++;
  userClickPattern = [];
  $("#level-title").html("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn()
    .fadeOut()
    .fadeIn();
  $(".btn#" + randomChosenColor).click(function () {
    $("#" + randomChosenColor)
      .fadeIn()
      .fadeOut()
      .fadeIn();
    playSound(randomChosenColor);
  });
}
function playSound(chosenColor) {
  var audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  var buttonSelected = $("." + currentColor).addClass("pressed");
  setTimeout(() => {
    buttonSelected.removeClass("pressed");
  }, 100);
}
