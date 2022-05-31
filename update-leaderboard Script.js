var audio = new Audio('sound/scribble.wav');

nameAndScoreTemplate = document.getElementsByClassName("nameAndScore");

namesAndScoresContainer = document.getElementById("namesAndScoresContainer");

enterNameInput = document.getElementById("enterName").getElementsByTagName("input")[0];

enterScoreInput = document.getElementById("enterScore").getElementsByTagName("input")[0];

Interval();

function Interval()
{
    setLeaderBoard(nameAndScoreTemplate, namesAndScoresContainer, audio, true);
    setTimeout(Interval, 10000);
}

function enterNameAndScore()
{
    insertData(enterNameInput.value, enterScoreInput.value);
    enterNameInput.value = "";
    enterScoreInput.value = 0;
}

function editCurrentScore(id)
{
    score = document.getElementById(id).getElementsByTagName("input")[0].value;
    editScore(id, score);
}

function decrementScore(id)
{
    currentScore = document.getElementById(id).getElementsByClassName("score")[0].getElementsByTagName("h3")[0].innerHTML;
    editScore(id,  parseInt(currentScore) - 1);
}

function incrementScore(id)
{
    currentScore = document.getElementById(id).getElementsByClassName("score")[0].getElementsByTagName("h3")[0].innerHTML;
    editScore(id,  parseInt(currentScore) + 1);
}