var audio = new Audio('sound/scribble.wav');

nameAndScoreTemplate = document.getElementsByClassName("nameAndScore");

namesAndScoresContainer = document.getElementById("namesAndScoresContainer");

Interval();

function Interval()
{
    setLeaderBoard(nameAndScoreTemplate, namesAndScoresContainer, audio);
    setTimeout(Interval, 1000);
}