// start

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

    let currentQuestion = newQuestion(data);

    displayAnswers.forEach(element => {
        element.classList.remove('correct');
        element.removeEventListener('click', checkAnswer);
        element.addEventListener('click', (event) => checkAnswer(event,currentQuestion));// funcation is returning a differnet qustion answer
    });

    renderUi(currentQuestion);

}

function newQuestion(data){
    let len = 30;
    let randint = Math.floor(Math.random() * len);
    return data[randint];

}


// display question and answer options

function renderUi(data){

    let answerArray = [];
    console.log(data)
    
    document.getElementById('question-text').innerHTML = data["question"];

    answerArray.push(data['correct_answer']);
    for(let i = 0; i<displayAnswers.length; i++){ 
        answerArray.push(data['incorrect_answers'][i])
    }
    let shuffledAnswerArray = shuffle(answerArray);

    for(let i =0; i<displayAnswers.length; i++){
        displayAnswers[i].innerHTML = shuffledAnswerArray[i]
    }
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}


// wait for user to select an answer check if selected answer is correct

function checkAnswer(event, data) {
    console.log(data['correct_answer']);

    let selectedAnswer = event.target;
    if (selectedAnswer.innerHTML == data['correct_answer']) {
        console.log('yes');
        score += 1;
        document.getElementById('score').innerHTML = `score : ${score}`;
        selectedAnswer.classList.add('correct'); 
        gameLoop(data)
        // setTimeout(gameLoop, 2000);
    } else {
        console.log(selectedAnswer);
        // score -= 1;
        // newQuiz(); // need to add delay on refresh
    }
    // setTimeout(() => {
    //     gameLoop(data);
    //     displayAnswers.forEach(element => {
    //         element.classList.remove('correct');
    //         element.removeEventListener('click', checkAnswer);
    //         element.addEventListener('click', (event) => checkAnswer(event, currentQuestion));
    //     });
    // }, 2000);
}

// if answer is correct, increment score

// display updated score

// if quiz is not over, display next question

// if quiz is over, display final score and option to restart

// if user chooses to restart, start over from beginning

// end




// function getData(apiCategory, callback){
//     const request = new XMLHttpRequest();

//     request.addEventListener('readystatechange', ()=>{
//         if(request.readyState === 4 && request.status === 200){
//             const data = JSON.parse(request.responseText);
//             callback(data);
//         } else if(request.readyState === 4){
//             console.log('could not fetch data');
//         }
//     });

//     request.open('GET',`https://opentdb.com/api.php?amount=30&category=${apiCategory}&type=multiple`);
//     request.send();
// }



// function renderUi(data){
//     currentQuestion = renderUi(data['results']);
//     let answerArray = [];
    
//     document.getElementById('question-text').innerHTML = currentQuestion["question"];

//     answerArray.push(currentQuestion['correct_answer']);
//     for(let i = 0; i<displayAnswers.length; i++){ 
//         answerArray.push(currentQuestion['incorrect_answers'][i])
//     }
//     let shuffledAnswerArray = shuffle(answerArray);

//     for(let i =0; i<displayAnswers.length; i++){
//         displayAnswers[i].innerHTML = shuffledAnswerArray[i]
//     }
// }

// function checkAnswer(event, data) {
//     console.log(event.target);

//     let selectedAnswer = event.target;
//     if (selectedAnswer.innerHTML == data['correct_answer']) {
//         console.log('yes');
//         score += 1;
//         document.getElementById('score').innerHTML = `score : ${score}`;
//         selectedAnswer.classList.add('correct'); 
//     } else {
//         console.log(selectedAnswer);
//         // score -= 1;
//         // newQuiz(); // need to add delay on refresh
//     }
//     setTimeout(() => {
//         gameLoop(data);
//         displayAnswers.forEach(element => {
//             element.classList.remove('correct');
//             element.removeEventListener('click', checkAnswer);
//             element.addEventListener('click', (event) => checkAnswer(event, currentQuestion));
//         });
//     }, 2000);
// }

// function renderUi(resultsArray){
//     console.log(resultsArray);
//     let randint = Math.floor(Math.random() * resultsArray.length);
//     return resultsArray[randint];
// }





// a func that displays right/wrong answers at the end





// for(let i = 0; i<questionList.length; i++){
//     questionList[i].innerHTML = quizData.answers[randomizer][i]; // gets our question list and adds possible answers
// }










