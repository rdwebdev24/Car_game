// VARIABLES --

const score = document.querySelector('.score')
const startScreen = document.querySelector('.startScreen')
const gameArea = document.querySelector('.gameArea')
let keys = { ArrowUp: false, ArrowRight: false, ArrowDown: false, ArrowLeft: false }
const game_sound = new Audio('./audio/game_audio.mp3')
const crash_sound = new Audio('./audio/crash_sound.mp3')
const crash_soundModi = new Audio('./audio/fakir aadmi.mp3')
const rahul_sound = new Audio('./audio/sorry sorry sorry.mp3')
const kejriwaal_sound = new Audio('./audio/to kar na cut audii.mp3')
const modi_sound = new Audio('./audio/bhaiyo or behno.mp3')
let new_Game = document.getElementById('new_game')

let player = { score: 0 }
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyup)
new_Game.addEventListener('click', start)


// FUNCTIONS -- 

function keyDown(e) {
     keys[e.key] = true
     // console.log(keys);
}
function keyup(e) {
     keys[e.key] = false
     // console.log(keys);
}

// colliding function 
function iscollide(a, b) {
     aRect = a.getBoundingClientRect()
     bRect = b.getBoundingClientRect()
     return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
}



function endGame() {
     crash_soundModi.play()
     crash_sound.play()
     kejriwaal_sound.pause()
     rahul_sound.play()
     game_sound.pause()
     player.start = false
     startScreen.classList.remove('hide')
     startScreen.innerHTML = `Game over<br>Your Score is : ${player.score + 2}<br>Click to Restart the game`
}

// moving line funtions
function moveline() {
     let lines = document.querySelectorAll('.lines')
     lines.forEach(function (item) {
          if (item.y >= 700) {
               item.y = -100;
               // console.log(item.y)
          }
          item.y += player.speed;
          item.style.top = item.y + 'px'
     })
}

// moving enemy car funtions
function moveEnemy(car) {
     let enemy = document.querySelectorAll('.enemy')
     enemy.forEach(function (item) {

          if (iscollide(car, item)) {
               endGame();
               // player.start = false
          }

          if (item.y >= 750) {
               item.y = -300;
               // console.log(item.y)
               item.style.left = Math.floor(Math.random() * 550) + 'px'
          }
          item.y += player.speed;
          item.style.top = item.y + 'px'
     })
}

// START THE GAME : -- 
function start() {
     let speed__ = parseInt(document.getElementById('Speed').value)
     // console.log(speed__)
     player.speed = speed__
     // let player = { speed:speed__, score: 0 }
     // console.log(player)
     gameArea.classList.remove('hide')
     startScreen.classList.add('hide')
     gameArea.innerHTML = '';
     player.start = true
     player.score = 0
     player.speed = speed__
     window.requestAnimationFrame(gamePlay)

     // ROAD LINE 
     for (i = 0; i < 5; i++) {
          let roadLine = document.createElement('div');
          roadLine.setAttribute('class', 'lines')
          gameArea.appendChild(roadLine)
          roadLine.y = (i * 150);
          roadLine.style.top = roadLine.y + 'px'

     }

     // CREATING ELEMENT CAR 
     let car = document.createElement('div')
     car.setAttribute('class', 'car')
     gameArea.appendChild(car)

     player.x = car.offsetLeft
     player.y = car.offsetTop


     // CREATING ENEMY CAR 
     for (i = 0; i <= 5; i++) {
          let enemyCar = document.createElement('div');
          enemyCar.setAttribute('class', 'enemy')
          enemyCar.y = ((i + 1) * 150 * (-1));
          switch (i) {
               case 0:
                    enemyCar.style.backgroundImage = `url('./rahul_car.png')`
                    break;
               case 1:
                    enemyCar.style.backgroundImage = `url('./mamta_car.png')`
                    break;
               case 2:
                    enemyCar.style.backgroundImage = `url('./kejjriwaal_car.png')`
                    break;
               case 3:
                    enemyCar.style.backgroundImage = `url('./rahul_car.png')`
                    break;
               case 4:
                    enemyCar.style.backgroundImage = `url('./kejjriwaal_car.png')`
                    break;
               case 5:
                    enemyCar.style.backgroundImage = `url('./mamta_car.png')`
                    break;

               default:
                    break;
          }
          enemyCar.style.top = enemyCar.y + 'px'
          enemyCar.style.left = Math.floor(Math.random() * 550) + 'px'
          gameArea.appendChild(enemyCar)
     }
}

//  REQUST ANIMATION FRAME : --

function gamePlay() {
     let car = document.querySelector('.car')
     let road = gameArea.getBoundingClientRect()
     // console.log((road));
     if (player.start) {
          game_sound.play()
          moveline();
          moveEnemy(car);
          if (keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed }
          if (keys.ArrowDown && player.y < (road.bottom - 70)) { player.y += player.speed }
          if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
          if (keys.ArrowRight && player.x < 520) { player.x += player.speed }
          car.style.top = player.y + 'px'
          car.style.left = player.x + 'px'
          window.requestAnimationFrame(gamePlay)
          // console.log(player.score++)
          player.score++;
          if (player.score > highscore_value) {
               highscore_value = player.score
               localStorage.setItem('highscore_car', JSON.stringify(highscore_value))
               High_score.innerHTML = "High Score : " + highscore_value
          }
          
          score.innerHTML = "Score : " + player.score;
          // console.log('hey');
     }

}


//  HIGH SCORE 
let highscore_car = localStorage.getItem('highscore_car');
if (highscore_car == null) {
     highscore_value = 0;
     localStorage.setItem('highscore', JSON.stringify(highscore_value))
}
else {
     highscore_value = JSON.parse(highscore_car)
     High_score.innerHTML = "High Score : " + highscore_value
}

// RESET BUTTON 

let reset_btn = document.getElementById('Reset_highScore')
reset_btn.addEventListener('click',()=>{
     highscore_value = 0;
     localStorage.setItem('highscore', JSON.stringify(highscore_value))
     High_score.innerHTML = "High Score : " + highscore_value
})
