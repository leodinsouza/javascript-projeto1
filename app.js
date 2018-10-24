/*
Regras do jogo:
- O jogo tem 2 players, jogando em turnos
- Em cada turno, um jogador rola o dado quantas vezes quiser. Cada resultado é adicionado a pontuação da rodada, 
- Mas, se o jogador tirar 1, todos os pontos da rodada são perdidos, e passa a vez para o jogador seguinte. 
- O jogador pode escolher 'Manter', isso significa que os pontos da rodada serão adicionados a póntuação principal do jogador. Ao manter os pontos, é também passada a vez
para o jogador seguinte.
- O primeiro jogador que fizer 100 pontos, ganha o jogo.
*/

var scores, roundScore, activePlayer, dice, gamePlaying
init()
var lastDice
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //Número Randômico
        dice1 = Math.floor(Math.random() * 6) + 1
        dice2 = Math.floor(Math.random() * 6) + 1

        //Mostrar o resultado
        document.getElementById('dice-1').style.display = 'block'
        document.getElementById('dice-2').style.display = 'block'
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png'
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png'

        if(dice === 6 && lastDice === 6){
            scores[activePlayer] = 0
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
            nextPlayer()
        } else if (dice1 !== 1 && dice2 !== 1) { //Atualiza os pontos da rodada se o dado rolado não for igual a 1
            //Adiciona os pontos
            roundScore += dice1 + dice2
            document.querySelector('#current-' + activePlayer).textContent = roundScore
        } else {
            nextPlayer()
        }
        lastDice = dice
    }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //Adiciona a pontuação atual na pontuação global
        scores[activePlayer] += roundScore

        //Atualiza a interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
        var input = document.querySelector('.final-score').value
        var winningScore
        if(input){
             winningScore = input
        }else{
            winningScore = 100
        }

        //Verifica se o jogador ganhou o jogo
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Ganhador!'
            document.getElementById('dice-1').style.display = 'none'
            document.getElementById('dice-2').style.display = 'none'
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            gamePlaying = false
        } else {
            //passa a vez
            
            nextPlayer()
        }
    }
})

function nextPlayer() {
    //passa a vez
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0

    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    document.getElementById('dice-1').style.display = 'none'
    document.getElementById('dice-2').style.display = 'none'
    
   
}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    gamePlaying = true
    scores = [0, 0]
    activePlayer = 0
    roundScore = 0

    document.getElementById('score-0').textContent = 0
    document.getElementById('score-1').textContent = 0
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
    document.getElementById('dice-1').style.display = 'none'
    document.getElementById('dice-2').style.display = 'none'
    
}