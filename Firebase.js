import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getDatabase, ref, set, get, child, update, remove} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js';

const firebaseConfig = 
{
    apiKey: "AIzaSyBdELf5obTcleylOW27ERGXES9eZb40cGc",
    authDomain: "leaderboard-e1c63.firebaseapp.com",
    projectId: "leaderboard-e1c63",
    storageBucket: "leaderboard-e1c63.appspot.com",
    messagingSenderId: "354003398537",
    appId: "1:354003398537:web:ed2183a8fc987f208bbb58"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();

const buttonContainer = document.createElement("div");
buttonContainer.setAttribute("class", "buttonContainer");

const enterScore = document.createElement("div");
enterScore.setAttribute("class", "editScore");
enterScore.appendChild(document.createElement("input"));
enterScore.lastElementChild.setAttribute("type", "number");
enterScore.lastElementChild.setAttribute("value", "0");
enterScore.appendChild(document.createElement("button"));
enterScore.lastElementChild.innerHTML = "✔️";

const decrementButton = document.createElement("button");
decrementButton.innerHTML = "-"
decrementButton.setAttribute("class", "decrementButton");

const incrementButton = document.createElement("button");
incrementButton.innerHTML = "+"
incrementButton.setAttribute("class", "incrementButton");

const deleteButton = document.createElement("button");
deleteButton.innerHTML = "Delete"
deleteButton.setAttribute("class", "deleteButton");

window.setLeaderBoard = function(nameAndScoreTemplate, namesAndScoresContainer, audio, editMode = false, updatedMode = false)
{
    const dbref = ref(db);

    var data = [];
    
    get(child(dbref, "/UpdateTime")).then((timeSnapshot) => 
    {   
        if(!updatedMode)
        {
            updatedMode = (namesAndScoresContainer.className != timeSnapshot.val().Time);
        }

        if(updatedMode)
        {
            namesAndScoresContainer.className = timeSnapshot.val().Time;

            get(child(dbref, "/Leaderboard")).then((snapshot) => 
            {   
                var keys = Object.keys(snapshot.val());
        
                keys.forEach(function(key)
                {
                    data.push(snapshot.val()[key]);
                });
        
                sortByScore(keys, data);
        
                audio.play();
        
                refreshLeaderBoard(keys, data, editMode);
            })
            .catch((error) =>
            {
                refreshLeaderBoard();
                
                console.log(error);
            });
        }
    })
    .catch((error) =>
    {
        console.log(error);
    })
}

function UpdateTime()
{
    update(ref(db, "UpdateTime/"),
    {
        Time: new Date().getTime()
    })
    .then(() =>
    {
        console.log("Time logged successfully.");
    })
    .catch((error) =>
    {
        console.log(error);
    })

    setLeaderBoard(nameAndScoreTemplate, namesAndScoresContainer, audio, true, true);
}

window.insertData = function(inputName, inputScore = 0)
{
    set(ref(db, "Leaderboard/" + new Date().getTime()),
    {
        Name: inputName,
        Score: inputScore
    })
    .then(() =>
    {
        console.log("Data stored successfully.");
    })
    .catch((error) =>
    {
        console.log(error);
    })

    UpdateTime();
}

window.editScore = function(id, inputScore)
{
    update(ref(db, "Leaderboard/" + id),
    {
        Score: inputScore
    })
    .then(() =>
    {
        console.log("Score edited successfully.");
    })
    .catch((error) =>
    {
        console.log(error);
    })

    UpdateTime();
}

window.deleteData = function(id)
{
    remove(ref(db, "Leaderboard/" + id))
    .then(() =>
    {
        console.log("Data deleted successfully.");
    })
    .catch((error) =>
    {
        console.log(error);
    })

    UpdateTime();
}

window.clearLeaderboard = function()
{
    remove(ref(db, "Leaderboard/"))
    .then(() =>
    {
        console.log("Data deleted successfully.");
    })
    .catch((error) =>
    {
        console.log(error);
    })

    UpdateTime();
}

function sortByScore(keys, data)
{
    for(var nameAndScore in data)
    {
        for(var nameAndScore in data)
        {
            if(nameAndScore != 0 && data[nameAndScore].Score > data[(nameAndScore - 1)].Score)
            {
                [ data[nameAndScore], data[nameAndScore - 1] ] = [ data[nameAndScore - 1], data[nameAndScore] ];
                [ keys[nameAndScore], keys[nameAndScore - 1] ] = [ keys[nameAndScore - 1], keys[nameAndScore] ];
            }
        }   
    }
}

function refreshLeaderBoard(keys, data, editMode = false)
{
    namesAndScoresContainer.innerHTML = "";

    for (var nameAndScore in data)
    {
        namesAndScoresContainer.appendChild(nameAndScoreTemplate[0].cloneNode(true));

        namesAndScoresContainer.lastElementChild.getElementsByClassName("name")[0].getElementsByTagName("h3")[0].innerText = data[nameAndScore].Name;

        namesAndScoresContainer.lastElementChild.getElementsByClassName("score")[0].getElementsByTagName("h3")[0].innerText = data[nameAndScore].Score;

        namesAndScoresContainer.lastElementChild.setAttribute("id", keys[nameAndScore]);

        if(editMode === true)
        {
            namesAndScoresContainer.lastElementChild.appendChild(buttonContainer.cloneNode(true));
            namesAndScoresContainer.lastElementChild.lastElementChild.appendChild(enterScore.cloneNode(true));
            namesAndScoresContainer.lastElementChild.lastElementChild.lastElementChild.lastElementChild.setAttribute("onclick", "editCurrentScore(" + keys[nameAndScore] + ")");
            namesAndScoresContainer.lastElementChild.lastElementChild.lastElementChild.firstElementChild.value = data[nameAndScore].Score;
            namesAndScoresContainer.lastElementChild.lastElementChild.appendChild(decrementButton.cloneNode(true));
            namesAndScoresContainer.lastElementChild.lastElementChild.lastElementChild.setAttribute("onclick", "decrementScore(" + keys[nameAndScore] + ")");
            namesAndScoresContainer.lastElementChild.lastElementChild.appendChild(incrementButton.cloneNode(true));
            namesAndScoresContainer.lastElementChild.lastElementChild.lastElementChild.setAttribute("onclick", "incrementScore(" + keys[nameAndScore] + ")");
            namesAndScoresContainer.lastElementChild.lastElementChild.appendChild(deleteButton.cloneNode(true));
            namesAndScoresContainer.lastElementChild.lastElementChild.lastElementChild.setAttribute("onclick", "deleteData(" + keys[nameAndScore] + ")");
        }
    }
}