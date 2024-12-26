const keyboardDiv = document.querySelector(".keyboard");
const gameEndWindow = document.querySelector(".game-end-window");
const playAgainButton = document.querySelector(".play-again-button");
const responseMessage = document.querySelector(".js-response-message")
const strikesMessage = document.querySelector(".js-strikes-message")
const hangmanImage = document.querySelector(".hangman-image")

gameEndWindow.style.visibility = 'hidden';
responseMessage.innerHTML = "Welcome to Hangman!";      // Hide
generateWord()

//event listener
playAgainButton.addEventListener("click", () => {resetGame()})

//creating array of letters
wordArray = wordChoice.split('');
console.log(wordArray);

//create underscored version of wordChoice
let wordStatus = "_".repeat(wordChoice.length);
let wordStatusArray = wordStatus.split('')


//create strike counter
let strikes = 0;

//generate random word
function generateWord(){
    genNum = Math.floor(Math.random() * words.length - 0);
    wordChoice = words[genNum];
    console.log(wordChoice);
    wordArray = wordChoice.split('');
}

function updateImage(){

}

//reset the game state
function resetGame(){
    strikes = 0;
    updateStrikes();
    responseMessage.innerHTML = "Welcome to Hangman!";
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameEndWindow.style.visibility = 'hidden';
    generateWord();
    wordStatus = "_".repeat(wordChoice.length); //repeated from before - fix
    wordStatusArray = wordStatus.split('')
    renderWord(wordStatusArray);
    hangmanImage.src = `images/hangman-image.png`;
    console.log(wordStatusArray);
}

// refreshes the word display - changing underscores to letters
function renderWord(wordStatusArray){
    let wordHTML = ''
    for(i = 0; i < wordChoice.length; i++){
        //console.log(wordStatusArray[i])
        if(wordStatusArray[i] === '_'){
            const html = `
                <li>_</li>
            `
            wordHTML += html;
        }
        else{
            //console.log('adding letter: ',wordArray[i])
            const html = `
                <li>${wordArray[i]}</li>
            `
            wordHTML += html;
        }
    }
    //console.log(wordHTML)

    document.querySelector('.js-word-container')
        .innerHTML = wordHTML
}

renderWord(wordStatusArray)

// gets users guess from the input box 
const inputElement = document.querySelector(".js-input-box");


// checks if letter is in word, then displays a message
function initGame(button, clickedLetter){
    const guess = clickedLetter.toUpperCase();
    button.disabled = true;
    //console.log(guess.length)
    //console.log(wordChoice.toLowerCase());
    if (strikes !== 6){
        if (wordChoice.includes(guess)){
            console.log("The word does contain ", guess);
            responseMessage.innerHTML = "Correct Guess";
            //setTimeout(() => {document.querySelector(".js-response-message").innerHTML = ""}, 3000); // create a function that updates response message
            updateWordStatus(wordArray, wordStatusArray, guess);
            
        }else{
            //console.log("The word does not contain ", guess);
            strikes++;
            updateStrikes();
            hangmanImage.src = `images/hangman-image-${strikes}.png`;
            responseMessage.innerHTML = "Incorrect Guess"
            //setTimeout(() => {document.querySelector(".js-response-message").innerHTML = ""}, 3000);     
        }   
    }
    if(!wordStatusArray.includes("_")) return gameOver(true);
    console.log(wordStatusArray);

}

//Updates the strikes counter
function updateStrikes(){
    //strikes++;
    //document.querySelector('.js-strikes-message').innerHTML = "Incorrect Guesses: " + strikes + "/6";
    strikesMessage.innerHTML = "Incorrect Guesses: " + strikes + "/6";
    if (strikes === 6){
        return gameOver(false) 
    }

}

// Updates wordStatusArray with new letter
function updateWordStatus(wordArray, wordStatusArray, guess){
    //console.log('Ran updateWordStatus functon!');
    for(let i = 0; i < wordArray.length; i++)
    {
        if (wordArray[i] === guess) {
            //console.log('replacing: ', wordStatusArray[i], 'with: ', wordArray[i])
            wordStatusArray[i] = wordArray[i]; // Replace underscore with guessed letter
            //console.log('new word status array: ',wordStatusArray);
            renderWord(wordStatusArray);
        }
    }
}


//Creating Keyboard Layout - WIP
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i).toUpperCase();
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

//

function gameOver(isVictory){
    // After game complete.. showing modal with relevant details
    console.log(isVictory);
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameEndWindow.querySelector("img").src = `images/${isVictory ? 'victory' : 'lose'}.gif`;
    gameEndWindow.querySelector("h4").innerText = isVictory ? 'Congrats!' :  'Game Over!'
    gameEndWindow.querySelector("p").innerHTML = `${modalText} <b>${wordChoice}</b>`;
    gameEndWindow.style.visibility = 'visible';

}


