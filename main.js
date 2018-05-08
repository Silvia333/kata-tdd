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

function getQuestionRamdon(){
    var posicionDeAleatorio = Math.floor(Math.random()* questions.length); 
    var preguntaAdevolver = questions[posicionDeAleatorio];
    questions.splice(posicionDeAleatorio, 1);
    return preguntaAdevolver;
}

function obtenerDatosPreguntaAleatoria(){
    var preguntaObtenida =  getQuestionRamdon();
    var tituloDePreguntaObtenida = preguntaObtenida.question.text;
    var respuestasDePreguntaObtenida = preguntaObtenida.answers;
    var idDePreguntaObtenida = preguntaObtenida.question.id;
    
    pintarPreguntas(tituloDePreguntaObtenida, respuestasDePreguntaObtenida);
}

function pintarPreguntas (pregunta, respuestas) {
    var listaContenedora = '';

    document.getElementById('preguntas').innerHTML = pregunta;
    for (var i = 0; i < respuestas.length; i++) {
        var estructuraRespuesta = '<li><input id= "item-' + i + '" name = "answers" type="radio" value = "' 
                + respuestas[i].id + '">' + respuestas[i].text + ' </li>';
        listaContenedora += estructuraRespuesta;
    }
    document.getElementById('listaRespuestas').innerHTML = listaContenedora;
}

obtenerDatosPreguntaAleatoria();

var myInterval = setInterval( function(){
    if(questions.length > 0){
        obtenerDatosPreguntaAleatoria();
    }else{
        clearInterval(myInterval);
    }
}, 3000);