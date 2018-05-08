// function getQuestions(callback) {
//     var serverData = [
//         {
//             question: 
//                 { 
//                     id: 1, text: '¿Capital de Honduras?' 
//                 },
//             answers: [
//                         { 
//                             id: 1, text: 'Tegucigalpa' 
//                         }, 
//                         { 
//                             id: 2, text: 'Lima' 
//                         }, 
//                         { 
//                             id: 3, text: 'Buenos Aires' 
//                         }
//                     ],
//             correctAnswerId: 1
//         },
//         {
//             question: 
//                 {
//                  id: 2, text: 'Rio que pasa por Toledo' 
//                 },
//             answers: [
//                         { 
//                             id: 4, text: 'Miño' 
//                         }, 
//                         { 
//                             id: 5, text: 'Tajo' 
//                         }, 
//                         { 
//                             id: 6, text: 'Duero' 
//                         }
//                     ],
//             correctAnswerId: 5
//         },
//         {
//             question: 
//                 { 
//                     id: 3, text: 'Color Bandera de Argentina' 
//                 },
//             answers: [
//                         { 
//                             id: 7, text: 'Rojo Blanco' 
//                         }, 
//                         { 
//                             id: 8, text: 'Blanco y Verde' 
//                         }, 
//                         {
//                             id: 9, text: 'Azul Blanco Azul' 
//                             }
//                     ],
//             correctAnswerId: 9
//         },
//         {
//             question: 
//                 { 
//                     id: 3, text: '¿Quién pintó la capilla sixtina?' 
//                 },
//             answers: [
//                         { 
//                             id: 7, text: 'Picasso' 
//                         }, 
//                         { 
//                             id: 8, text: 'Velazquez' 
//                         }, 
//                         {
//                             id: 9, text: 'Miguel Angel' 
//                             }
//                     ],
//             correctAnswerId: 9
//         },
//     ]
//     callback(serverData);
// };

// var questions = [];
// getQuestions(function (data) {
//     questions = data;
//     /*...*/
// });

// function getQuestionRamdon(){
//     var randomPosition = Math.floor(Math.random()* questions.length);
//     var questionToGet = questions[randomPosition];
//     questions.splice(randomPosition, 1);
//     return questionToGet;
// }

// function getRandomQuestionData(){
//     var questionObtained =  getQuestionRamdon();
//     var titleOfQuestionObtained = questionObtained.question.text;
//     var anwersOfQuestionObtained = questionObtained.answers;
//     var idOfQuestionObtained = questionObtained.question.id;

//     paintQuestions(titleOfQuestionObtained, anwersOfQuestionObtained);
// }

// function paintQuestions (question, answers) {
//     var listOfAnswersContainer = '';

//     document.getElementById('preguntas').innerHTML = question;
//     for (var i = 0; i < answers.length; i++) {
//         var itemListDefinition = '<li><input id= "item-' + i + '" name = "answers" type="radio" value = "' + answers[i].id + '">' + answers[i].text + ' </li>';
//         listOfAnswersContainer += itemListDefinition;
//     }
//     document.getElementById('listaRespuestas').innerHTML = listOfAnswersContainer;
// }

// getRandomQuestionData();


// var myInterval = setInterval( function(){
//     if(questions.length > 0){
//         getRandomQuestionData();
//     }else{
//         clearInterval(myInterval);
//     }
// }, 3000);


// function stopMyInterval(){
//     clearInterval(myInterval);
// }


// function recalcularNoContesta(puntos, tiempo){
//     if (tiempo === ''){
//         return puntos - 2;
//     }
//     if (tiempo > 20){
//         return puntos - 3;
//     }
// }

// function recalcularMarcadorAcierto(puntos, tiempo){
//     if (tiempo <= 2){
//         return puntos + 2;
//     }
//     if (tiempo >= 2 && tiempo < 10){
//         return ++puntos;
//     }
//     if (tiempo > 10){
//         return puntos;
//     }
// }

// function recalcularMarcadorFallo(puntos, tiempo){
//     if (tiempo > 10){
//         return puntos - 2;
//     }
//     if (tiempo <= 10){
//         return puntos - 1;
//     }
// }



//version español

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
};

var questions = [];
getQuestions(function (data) {
    questions = data;
    /*...*/
});

var preguntaObtenida;

function getQuestionRamdon(){
    var posicionDeAleatorio = Math.floor(Math.random()* questions.length); 
    var preguntaAdevolver = questions[posicionDeAleatorio];
    questions.splice(posicionDeAleatorio, 1);
    return preguntaAdevolver;
}
function pintarPreguntas () {
    preguntaObtenida = getQuestionRamdon();
    var listaContenedora             = '';
    var tituloDePreguntaObtenida     = preguntaObtenida.question.text;
    var respuestasDePreguntaObtenida = preguntaObtenida.answers;
    document.getElementById('preguntas').innerHTML = tituloDePreguntaObtenida;
    for (var i = 0; i < respuestasDePreguntaObtenida.length; i++) {
        var estructuraRespuesta = '<li><input id= "item-' + i + '" name = "answers" type="radio" value = "' 
                + respuestasDePreguntaObtenida[i].id + '">' + respuestasDePreguntaObtenida[i].text + ' </li>';
        listaContenedora += estructuraRespuesta;
    }
    document.getElementById('listaRespuestas').innerHTML = listaContenedora;
}

pintarPreguntas();

var myInterval = setInterval( function(){
    if(questions.length > 0){
        pintarPreguntas();
    }else{
        clearInterval(myInterval);
    }
}, 3000);

function comprobarRespuesta(){
    var miRespuestaElegida = document.miformulario.answers.value;
    console.log(preguntaObtenida.correctAnswerId);
    document.getElementById('mensaje').innerHTML = '';
    if(miRespuestaElegida == preguntaObtenida.correctAnswerId){
        document.getElementById('mensaje').innerHTML = 'Has acertado';
    }else{
        document.getElementById('mensaje').innerHTML = 'Has fallado';
    }
  }

document.miformulario.addEventListener('click', comprobarRespuesta);
