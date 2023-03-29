// initialize score to 0 
let score = 0
const displayAnswers = Array.from(document.getElementsByClassName("answer"));


// selected quiz category add event listeners

document.querySelector('#category').addEventListener('change', (event) => getData(event.target.value, gameLoop));



// fetch quiz data based on category gets data['results]
function getData(apiCategory, callback){
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', ()=>{
        if(request.readyState === 4 && request.status === 200){
            const data = JSON.parse(request.responseText);
            callback(data['results']);
        } else if(request.readyState === 4){
            console.log('could not fetch data');
        }
    });

    request.open('GET',`https://opentdb.com/api.php?amount=30&category=${apiCategory}&type=multiple`);
    request.send();
}


function gameLoop(data) {
    let currentQuestion = newQuestion(data); // randomizes the question

    displayAnswers.forEach(element => { // removes the added classes to show if the answer is right or wrong
        element.classList.remove('correct');
        element.classList.remove('incorrect');
        element.removeEventListener('click', window.lastClickHandlerFunction); //will be undefined on first call, later it is the correct function
    });

    renderUi(currentQuestion); //loads Q/A to screen

    displayAnswers.forEach(element => { 
        element.addEventListener('click', handleAnswerClick);
    });
    window.lastClickHandlerFunction=handleAnswerClick;//Store a reference to the registered function
    function handleAnswerClick(event) {
        checkAnswer(event, currentQuestion, data);
    }
}



function newQuestion(data){
    let len = 30;
    let randint = Math.floor(Math.random() * len);
    return data[randint];

}


// display question and answer options

function renderUi(data){  
    let answerArray = []; 
    let shuffledAnswerArray = [];
    
    document.getElementById('question-text').innerHTML = data["question"]; // top question

    answerArray.push(data['correct_answer']); // adds all answers to an array
    for(let i = 0; i<displayAnswers.length; i++){ 
        answerArray.push(data['incorrect_answers'][i])
    }
    shuffledAnswerArray = shuffle(answerArray); //shuffles array

    for(let i =0; i<displayAnswers.length; i++){ // adds shuffled array to our displayed answers
        displayAnswers[i].innerHTML = shuffledAnswerArray[i];
        // console.log(1,displayAnswers[i].innerHTML)
    }

    displayAnswers.forEach(element => {
        console.log(element)
    });
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}


// wait for user to select an answer check if selected answer is correct

let loopnum = 0
function checkAnswer(event,checkCurrentQuestion,data) {
    // console.log(event.target.innerHTML);
    loopnum += 1;

    let selectedAnswer = event.target;
    

    console.log('loop num : ',loopnum, selectedAnswer);
    if (selectedAnswer.innerHTML == checkCurrentQuestion['correct_answer']) {
        score += 1;
        document.getElementById('score').innerHTML = `score : ${score}`;
        selectedAnswer.classList.add('correct'); 
        
        setTimeout(()=>gameLoop(data), 2000);
    } else {
        // console.log('incorrect', event.target)

        score -= 1;
        selectedAnswer.classList.add('incorrect');

        setTimeout(()=>gameLoop(data), 2000);; // delay on refresh
    }
}


