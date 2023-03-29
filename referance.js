function newQuiz(){

    let score = 0;
    
    let quizData = {
        question : [['What country has the highest life expectancy?'],['What is the most common surname in the United States?'],['The moon called Titan orbits which planet?'],['What protects Earth from meteoroids and radiation from the sun?']],
        answers : [['Hong Kong','Japan','Italy','germany'],['Smith','Williams','Jones','brown'],['Saturn','Jupiter','Neptune','Venus'],['Atmosphere','O Zone','Magnetic field','Suns Gravity']],
        correct : [['Hong Kong'],['Smith'],['Saturn'],['Atmosphere']]
    }
    let randomizer = Math.floor(Math.random() * quizData.question.length);

    let questionList = Array.from(document.getElementsByClassName("answer"));  // displayed list of possible answers
    document.getElementById('question-text').innerHTML = quizData.question[randomizer];   // displays the question in top box

    for(let i = 0; i<questionList.length; i++){
        questionList[i].innerHTML = quizData.answers[randomizer][i]; // gets our question list and adds possible answers
    }

    function checkAnswer(event) {
        event.stopPropagation();
        let selectedAnswer = event.target;
        if (selectedAnswer.innerHTML == quizData.correct[randomizer]) { // checks if answer is correct adds green class and updates score
            score += 1;
            document.getElementById('score').innerHTML = `score : ${score}`;
            selectedAnswer.classList.add('correct'); 
            setTimeout(newQuiz, 2000);
        } else {
            console.log(selectedAnswer);
            // score -= 1;
            // newQuiz(); // need to add delay on refresh
        }
    }

    questionList.forEach(element => {
        element.classList.remove('correct');
        element.removeEventListener('click', checkAnswer); // remove existing event listener
        element.addEventListener('click', checkAnswer);
    });
}


newQuiz();