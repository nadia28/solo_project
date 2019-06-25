// selecting all the matching cards of the game
const cards = document.querySelectorAll('.matching_card');
const card = document.querySelector('.matching_card');
// start btn to start the game
const start = document.querySelector('.start');
//selecting timer
const timer = document.querySelector('.timer');
// moves counter
const counter = document.querySelector('.moves');
// star ratings
const stars = document.getElementsByTagName('li');
//congratulations modal
const modal = document.querySelector('.victory_modal');
// selecting the game board
const gameBoard = document.querySelector('.matching_game');

// assinging variables
let prevCard = null;
let checkingCard = false;
let disableBoard = false;
let gameScore = 0;
let numOfMoves = 0;
let second = 0;
let minute = 0;
let interval;
let clickSound = new Audio("sound/card-flip.wav");



// flip the card 
    function flipCard(card){
      if (disableBoard) return;
      if (this === prevCard) return;
        this.classList.add('flipped');
          if (checkingCard) {
            if(prevCard.getAttribute('data-type') === this.getAttribute('data-type')) {
                gameScore ++;
                
                prevCard.removeEventListener('click', playSound);
              
                this.removeEventListener('click', flipCard); // if cards match removing event listeners from both
                prevCard.removeEventListener('click', flipCard);
              
                // if cards match removing event listeners from both
              
                // setting timeout to announce the winner after the last pair flipped
                setTimeout(() => {
                  this.removeEventListener('click', playSound);
                  winGame(); // if user opens all 8 pairs he wins
                }, 1000);
                prevCard = this;
                movesCounter();      
              resetBoard();
            } else {
                disableBoard = true;     
                setTimeout(() => { 
                  this.classList.remove('flipped');
                  prevCard.classList.remove('flipped');          
                  prevCard = this;
                  disableBoard = false;
                  resetBoard();
                }, 1000);
                  movesCounter();
              // flipping back current card
            }
          } else {
            prevCard = this;
            
        }
          checkingCard = !checkingCard; 
      }

    // reseting the board, so we cannot click on the same card twice once it turned
    function resetBoard(){
      [checkingCard, disableBoard] [false, false];
      [prevCard] [null];
    }

    // shuffle cards function
    function shuffle(){
      cards.forEach((card) => {
        let randPos = Math.floor(Math.random() * 16);
        card.style.order = randPos;
      })
    };


     //sound effect function while clicking the cards
    function playSound(card){
       clickSound.play();
      }

    // Adding eventListener to cards
    function turnCard(){
      cards.forEach(function(card){
          card.addEventListener('click', flipCard);
          card.addEventListener('click', playSound);
      })
    }

    // congratulations function 
    function winGame(score){      
      if(gameScore === 8){ 
        modal.style.visibility = "visible";
        modal.getElementsByTagName('p')[1].innerHTML = "Your score is " + gameScore;
        modal.getElementsByTagName('p')[2].innerHTML= "You made  " + numOfMoves + " moves";
        modal.getElementsByTagName('p')[3].innerHTML= "Your time is " + minute + ' mins ' + second + ' secs';    
        resetTimer();
        counter.innerHTML = 0;
      }  
    }

    //Start timer function
      function startTimer(){
        interval = setInterval(function(){
          timer.innerHTML = minute + ' mins ' + second + ' secs';
            second ++;
            if(second === 60){
              minute ++;
              second = 0;
            }
        }, 1000);
      }

      // Reseting timer
        function resetTimer (){
          second = 0;
          minute = 0;
          timer.innerHTML = "0 mins 0 secs";
          clearInterval(interval);
        }

      // Reset star raiting
        function resetRating(){
        for (var i= 0; i < stars.length; i++){
          stars[i].style.color = "darkturquoise";
          stars[i].style.visibility = "visible";
        }
      }

      // moves Counter
        function movesCounter(){
          numOfMoves++
          counter.innerHTML = numOfMoves;
          if(numOfMoves === 1){
            startTimer();
          }
          if (numOfMoves > 19 && numOfMoves < 24){
            for( i= 0; i < 3; i++){
                if(i > 1){
                    stars[i].style.visibility = "collapse";
                }
            }
        }
        else if (numOfMoves > 25){
            for( i= 0; i < 3; i++){
                if(i > 0){
                    stars[i].style.visibility = "collapse";
                }
            }
          }
        }

      
      // starting new game with new game button
      function startGame(){
        for (let i = 0; i < cards.length; i ++) {
          cards[i].classList.remove('flipped');
          gameScore = 0;
          numOfMoves= 0;
          counter.innerHTML = numOfMoves;
          modal.style.visibility = "hidden";
          resetTimer();     
          resetRating();
          shuffle(cards);
          resetBoard();
          turnCard();
        }
      }

      //Adding event listener to start button
      start.addEventListener('click', startGame);
     
   