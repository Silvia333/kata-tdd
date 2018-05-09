const app = (function (){
    let questions = [];
    let questionObtained;
    let btnNext;
    let seconds = 0;
    let timer = null;
    let score = 0;

    const getQuestions = callback => {
        const serverData = [
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
    };

    getQuestions(function (data) {
        questions = data;
        /*...*/
    });

    const getQuestionRamdon = () => {
        const randomPosition = Math.floor(Math.random()* questions.length);
        let questionToGet = questions[randomPosition];
        questions.splice(randomPosition, 1);
        return questionToGet;
    };

    const paintQuestions = () => {
        questionObtained = getQuestionRamdon();
        const titleOfQuestionObtained = questionObtained.question.text;
        const anwersOfQuestionObtained = questionObtained.answers;
        const idOfQuestionObtained = questionObtained.question.id;
        let listOfAnswersContainer = '';

        document.getElementById('preguntas').innerHTML = titleOfQuestionObtained;
        for (var i = 0; i < anwersOfQuestionObtained.length; i++) {
            var itemListDefinition = 
                `<li>
                    <input id="item-${i}" name="answers" type="radio" required value="${anwersOfQuestionObtained[i].id}" >${anwersOfQuestionObtained[i].text}
                </li>`;
            listOfAnswersContainer += itemListDefinition;
        
        }
        document.getElementById('listaRespuestas').innerHTML = listOfAnswersContainer;
    
    };

    const preventNextQuestion = (targetRadio) => {
        if (targetRadio.checked) {
            btnNext.disabled = false;
        }
        else {
            btnNext.disabled = true;
        }
    };

let inputValueOfAnswer;
let correctAnswerId;
const getValuesToCompare = (target) => {    
    inputValueOfAnswer = target.value;
    correctAnswerId = questionObtained.correctAnswerId;

}

const handleEventsOfRadios = (event) => {
    const target = event.target;
    getValuesToCompare(target);
    preventNextQuestion(target);
}

const compareAnswers = (answerCorrect, answerOfUser) => {
    if (answerCorrect == answerOfUser) {
        showMsgWhenIsCorrect();
        showScore(recalculateScoreWhenIsCorrect);
        return true;      
    }
    if (answerCorrect != answerOfUser) {
        showMsgWhenIsIncorrect();
        showScore(recalculateScoreWhenIsIncorrect);
        return false;
    }
}

//Mensajes que se mostrarán en la interfaz
const showMsgWhenIsCorrect = () => console.log('Correcto!');     

const showMsgWhenIsIncorrect = () => console.log('Incorrecto!'); 

const recalculateScoreWhenIsCorrect = (score, seconds) => {
    if (seconds <= 2) {
        return score + 2;
    }
    if (seconds <= 10) {
        return score + 1;
    }
    if (seconds > 10) {
        return score;
    }
};

const recalculateScoreWhenIsIncorrect = (score, seconds) => {
    if (seconds > 10) {
        return score - 2;
    }
    if (seconds <= 10) {
        return score - 1;
    }
};

const showScore = (myRecalculateFunction) => {
    console.log(`La puntuación es ${myRecalculateFunction(score, seconds)}`);
};

const goToNextQuestion = () => {
    compareAnswers(inputValueOfAnswer, correctAnswerId);
    paintQuestions();   
    console.log(`Tiempo transcurrido ${seconds} segundos`)
    resetAnswerTimer();
};

//De momento no la uso
const getAnswerTime = () => {
    console.log(seconds);
    return seconds;
}

//Funciones de temporizador
const startTimer = () => {
    if (!timer) {
        timer = setInterval(setTimeAndConditions, 1000);
    }
}

const setTimeAndConditions = () => {
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

const stopTimer = () => {
    if (timer) {
        clearInterval(timer);        
    }
    timer = null;
    resetAnswerTimer();
}

const resetAnswerTimer = () => {
    seconds = 0;
}

const startApp = () => {
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

    return {
        getQuestionRamdon: getQuestionRamdon,
        paintQuestions: paintQuestions,
        getInputValueAndCompare: getValuesToCompare,
        startApp: startApp
        
    };
})();


