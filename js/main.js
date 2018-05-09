var app = (function (){
    var questions = [];
    var questionObtained;
    var btnNext;
    var seconds = 0;
    var timer = null;
    var score = 0;

    function getQuestions(callback) {
    var serverData = [
        {
            question: 
                { 
                    id: 1, text: '¿Capital de Honduras?' 
                },
            answers: [
                        { 
                            id: 1, text: 'Tegucigalpa' 
                        }, 
                        { 
                            id: 2, text: 'Lima' 
                        }, 
                        { 
                            id: 3, text: 'Buenos Aires' 
                        }
                    ],
            correctAnswerId: 1
        },
        {
            question: 
                {
                 id: 2, text: 'Rio que pasa por Toledo' 
                },
            answers: [
                        { 
                            id: 4, text: 'Miño' 
                        }, 
                        { 
                            id: 5, text: 'Tajo' 
                        }, 
                        { 
                            id: 6, text: 'Duero' 
                        }
                    ],
            correctAnswerId: 5
        },
        {
            question: 
                { 
                    id: 3, text: 'Color Bandera de Argentina' 
                },
            answers: [
                        { 
                            id: 7, text: 'Rojo Blanco' 
                        }, 
                        { 
                            id: 8, text: 'Blanco y Verde' 
                        }, 
                        {
                            id: 9, text: 'Azul Blanco Azul' 
                            }
                    ],
            correctAnswerId: 9
        },
        {
            question: 
                { 
                    id: 3, text: '¿Quién pintó la capilla sixtina?' 
                },
            answers: [
                        { 
                            id: 7, text: 'Picasso' 
                        }, 
                        { 
                            id: 8, text: 'Velazquez' 
                        }, 
                        {
                            id: 9, text: 'Miguel Angel' 
                            }
                    ],
            correctAnswerId: 9
        },
    ]
    callback(serverData);
}

getQuestions(function (data) {
    questions = data;
    /*...*/
});

function getQuestionRamdon(){
    var randomPosition = Math.floor(Math.random()* questions.length);
    var questionToGet = questions[randomPosition];
    questions.splice(randomPosition, 1);
    return questionToGet;
}

function paintQuestions () {
    questionObtained = getQuestionRamdon();
    var titleOfQuestionObtained = questionObtained.question.text;
    var anwersOfQuestionObtained = questionObtained.answers;
    var idOfQuestionObtained = questionObtained.question.id;
    var listOfAnswersContainer = '';

    document.getElementById('preguntas').innerHTML = titleOfQuestionObtained;
    for (var i = 0; i < anwersOfQuestionObtained.length; i++) {
        var itemListDefinition = '<li><input id= "item-' + i + '" name = "answers" type="radio" required value = "' + anwersOfQuestionObtained[i].id + '">' + anwersOfQuestionObtained[i].text + ' </li>';
        listOfAnswersContainer += itemListDefinition;
       
    }
    document.getElementById('listaRespuestas').innerHTML = listOfAnswersContainer;
   
}
var inputValueOfAnswer;
var correctAnswerId;
function getValuesToCompare(target) {    
    inputValueOfAnswer = target.value;
    correctAnswerId = questionObtained.correctAnswerId;
    // valuesToCompare = (inputValueOfAnswer, correctAnswerId);
    // return valuesToCompare;     
}

function preventNextQuestion (targetRadio) {
    if (targetRadio.checked) {
        btnNext.disabled = false;
    }
    else{
        btnNext.disabled = true;
    }
}

function handleEventsOfRadios(event) {
    var target = event.target;
    getValuesToCompare(target);
    preventNextQuestion(target);
}

function compareAnswers (answerCorrect, answerOfUser){
    if (answerCorrect == answerOfUser) {
        doWhenIsCorrect();
        recalculateScoreWhenIsCorrect();
        return true;      
    }
    if (answerCorrect != answerOfUser) {
        doWhenIsIncorrect();
        return false;
    }
}
function doWhenIsCorrect() {
    // recalculateScoreWhenIsCorrect();
    return console.log('Correcto!');        
    
}
    function doWhenIsIncorrect() {
    return console.log('Incorrecto!'); 
}
function recalculateScoreWhenIsCorrect() {
    if (seconds <= 2) {
        return score + 2;
    }
    if (seconds <= 10) {
        return score + 1;
    }
    if (seconds > 10) {
        return score;
    }
}
function goToNextQuestion() {
    // if (result === true) {
        
    //     console.log(`La puntuación es ${score}`);
    // }
    console.log(compareAnswers(inputValueOfAnswer, correctAnswerId));
    paintQuestions();   
    console.log(seconds)
    resetAnswerTimer();
}

//De momento no la uso
function getAnswerTime() {
    console.log(seconds);
    return seconds;
}

//Funciones de temporizador
function startTimer() {
    if (!timer) {
        timer = setInterval(setTimeAndConditions, 1000);
    }
}

function setTimeAndConditions() {
    seconds++;
    if (btnNext.disabled === true) {
        if (questions.length > 0 && seconds > 5) {
            paintQuestions();
            resetAnswerTimer();
        }
        if (questions.length === 0) {
            stopTimer();
        }
    }
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);        
    }
    timer = null;
    resetAnswerTimer();
}

function resetAnswerTimer () {
    seconds = 0;
}

function startApp() {
    btnNext = document.getElementById('btn-next');
    btnNext.disabled = true;
    document.miformulario.addEventListener('click', handleEventsOfRadios);
    btnNext.addEventListener('click', goToNextQuestion);
    
    paintQuestions();

    startTimer();

    
  
}






// function recalculateWhenNoAnswer(score, seconds){
//     if (seconds === ''){
//         return score - 2;
//     }
//     if (seconds > 20){
//         return score - 3;
//     }
// }


// function recalculateScoreWhenIsIncorrect(score, seconds){
//     if (seconds > 10){
//         return score - 2;
//     }
//     if (seconds <= 10){
//         return score - 1;
//     }
// }
    return {
        getQuestionRamdon: getQuestionRamdon,
        paintQuestions: paintQuestions,
        getInputValueAndCompare: getValuesToCompare,
        startApp: startApp
        
    };
})();


