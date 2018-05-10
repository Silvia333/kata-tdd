const app = (function (){
    let questions = [];
    let questionObtained;
    let btnNext;
    let btnSend;
    let seconds;
    let timer;
    let score;
    let inputValueOfAnswer;
    let correctAnswerId;

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
        ];
        callback(serverData);
    };

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

        document.getElementById('question__title').innerHTML = titleOfQuestionObtained;
        for (var i = 0; i < anwersOfQuestionObtained.length; i++) {
            var itemListDefinition = 
                `<li>
                    <input id="item-${i}" name="answers" type="radio" required value="${anwersOfQuestionObtained[i].id}" >${anwersOfQuestionObtained[i].text}
                </li>`;
            listOfAnswersContainer += itemListDefinition;
        
        }
        document.getElementById('answers-list').innerHTML = listOfAnswersContainer;
    
    };

    const changeTextWhenNoMoreQuestions = () => {
        document.querySelector('.trivial').classList.add('hide');
        document.querySelector('.btn--next').classList.add('hide');
    };

    const preventNextQuestion = (targetRadio) => {
        if (targetRadio.checked) {
            btnNext.disabled = false;
        }
        else {
            btnNext.disabled = true;
        }
    };

    const getValuesToCompare = (target) => {    
        inputValueOfAnswer = target.value;
        correctAnswerId = questionObtained.correctAnswerId;

    };

    const handleEventsOfRadios = (event) => {
        const target = event.target;
        getValuesToCompare(target);
        preventNextQuestion(target);
    };

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
    };

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

    const recalculateScoreWhenNoAnswer = (score) => {
        return score - 3;
    };

    const showScore = (myRecalculateFunction) => {
        score = myRecalculateFunction(score, seconds);
        return console.log(`La puntuación es ${score}`);
    };

    const doBeforeNextQuestion = () => {
        compareAnswers(inputValueOfAnswer, correctAnswerId);
        if (questions.length > 0) {
            paintQuestions();
        } else {
            changeTextWhenNoMoreQuestions();
            stopTimer();        
        }
        console.log(`Tiempo transcurrido ${seconds} segundos`);
        resetAnswerTimer();
        btnNext.disabled = true;
    };

    const goToNextQuestion = () => {
    doBeforeNextQuestion();
    };

    //Funciones de temporizador
    const startTimer = () => {
        if (!timer) {
            timer = setInterval(setTimeAndConditions, 1000);
        }
    };

    const setTimeAndConditions = () => {
        seconds++;
        if (btnNext.disabled === true) {
            if (questions.length > 0 && seconds > 5) {
                showScore(recalculateScoreWhenNoAnswer);
                paintQuestions();
                resetAnswerTimer();
            }
            if (questions.length === 0) {
                showScore(recalculateScoreWhenNoAnswer);
                stopTimer();
                changeTextWhenNoMoreQuestions();
            }
        }
    };

    const stopTimer = () => {
        if (timer) {
            clearInterval(timer);        
        }
        timer = null;
        resetAnswerTimer();
    };

    const resetAnswerTimer = () => {
        seconds = 0;
    };

    const startApp = () => {
        seconds = 0;
        timer = null;
        score = 0;
        btnNext = document.getElementById('btn-next');
        btnNext.disabled = true;
        btnNext.addEventListener('click', goToNextQuestion);
        btnSend = document.getElementById('btn-send');        
        btnSend.disabled = true;
        document.form__container.addEventListener('click', handleEventsOfRadios);
        
        getQuestions(function (data) {
            questions = data;
            startTimer();
        });
        
        paintQuestions();        
    };

    return {
        getQuestionRamdon: getQuestionRamdon,
        paintQuestions: paintQuestions,
        getInputValueAndCompare: getValuesToCompare,
        startApp       
    };
});


