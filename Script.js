var audio = new Audio('sound/scribble.wav');

nameAndScoreTemplate = document.getElementsByClassName("nameAndScore");

namesAndScoresContainer = document.getElementById("namesAndScoresContainer");

var cachedData = [];

setInterval(fetchData, 1000);

function fetchData()
{
    fetch("https://raw.githubusercontent.com/TheBoardBunch/theboardbunch.github.io/main/leaderboard.json")
        .then(response => response.json())
        .then(data => {
            if(!(JSON.stringify(data) === cachedData))
            {
                cachedData = JSON.stringify(data);
                
                sortByScore(data);
                
                audio.play();

                refreshLeaderBoard(data);
            }
        });
}

function sortByScore(data)
{
    for (nameAndScore in data)
    {
        for (nameAndScore in data)
        {
            if(nameAndScore != 0 && data[nameAndScore].score > data[(nameAndScore - 1)].score)
            {
                [ data[nameAndScore], data[nameAndScore - 1] ] = [ data[nameAndScore - 1], data[nameAndScore] ];
            }
        }   
    }
}

function refreshLeaderBoard(data)
{
    namesAndScoresContainer.innerHTML = "";

    for (nameAndScore in data)
    {
        namesAndScoresContainer.appendChild(nameAndScoreTemplate[0].cloneNode(true));

        namesAndScoresContainer.lastChild.getElementsByClassName("name")[0].getElementsByTagName("h3")[0].innerText = data[nameAndScore].name;

        namesAndScoresContainer.lastChild.getElementsByClassName("score")[0].getElementsByTagName("h3")[0].innerText = data[nameAndScore].score;
    }
}
