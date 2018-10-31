/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var currPlayer, score, currScore, playing;

init();



document.querySelector('.btn-roll').addEventListener('click', () => {
    //1. get a random number
    if(playing) {
        var dice1 = Math.floor(Math.random()*6 + 1);
        var dice2 = Math.floor(Math.random()*6 + 1);

        //2. set dice accordingly
        var Dice1 = document.querySelector('#dice-1');
        var Dice2 = document.querySelector('#dice-2');
        Dice1.style.display = 'block';
        Dice2.style.display = 'block';
        Dice1.src = 'dice-' + dice1 + '.png';
        Dice2.src = 'dice-' + dice2 + '.png';

        
        //3. set current score IF random number generated is not 1
        if (dice1 === 1 || dice2 == 1) {
            //next player
            nextPlayer();
        } else {
            currScore += dice1 + dice2;
            document.getElementById('current-' + currPlayer).textContent = currScore;
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', () => {
    if(playing) {
        score[currPlayer] += currScore;
        document.querySelector('#score-' + currPlayer).textContent = score[currPlayer];

        var win;
        var input = document.querySelector('.maxScore').value;
        win = input ? input : 20;

        if (score[currPlayer] >= win) winner();
        else nextPlayer();
    }
});


document.querySelector('.btn-new').addEventListener('click', init);



function winner() {
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.getElementById('name-' + currPlayer).textContent = 'Winner';
    document.querySelector('.player-' + currPlayer + '-panel').classList.remove('active');
    document.querySelector('.player-' + currPlayer + '-panel').classList.add('winner');
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    playing = false;
}


function nextPlayer() {
    currScore = 0;
    currPlayer ^= 1;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}

function init() {
    score = [0, 0];
    currPlayer = 0;
    currScore = 0;
    playing = true;

    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
}