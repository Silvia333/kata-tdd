function getQuestions(callback) {
    var serverData = [
        {
            question: { id: 1, text: 'Pregunta1' },
            answers: [{ id: 1, text: 'A1' }, { id: 2, text: 'A2' }, { id: 3, text: 'A3' }],
            correctAnswerId: 1
        },
        {
            question: { id: 2, text: 'Pregunta2' },
            answers: [{ id: 4, text: 'B1' }, { id: 5, text: 'B2' }, { id: 6, text: 'B3' }],
            correctAnswerId: 5
        },
        {
            question: { id: 3, text: 'Pregunta3' },
            answers: [{ id: 7, text: 'C1' }, { id: 8, text: 'C2' }, { id: 9, text: 'C3' }],
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
    return questions[posicionDeAleatorio];
}

function obtenerDatosPreguntaAleatoria(){
    var preguntaObtenida =  getQuestionRamdon();
    var tituloDePreguntaObtenida = preguntaObtenida.question.text;
    var respuestasDePreguntaObtenida = preguntaObtenida.answers;
    var idDePreguntaObtenida = preguntaObtenida.question.id;
    
    pintarPreguntas(tituloDePreguntaObtenida, respuestasDePreguntaObtenida);
    eliminarPreguntaFormulada(idDePreguntaObtenida);
}

function pintarPreguntas (pregunta, respuestas) {
    var listaContenedora = '';

    document.getElementById('preguntas').innerHTML = pregunta;
    for (var i = 0; i < respuestas.length; i++) {
        var estructuraRespuesta = '<li><input id= "item-' + i + '" name = "answers" type="radio" value = "' + respuestas[i].id + '">' + respuestas[i].text + ' </li>';
        listaContenedora += estructuraRespuesta;
    }
    document.getElementById('listaRespuestas').innerHTML = listaContenedora;
}

obtenerDatosPreguntaAleatoria();

function eliminarPreguntaFormulada(idPreguntaFormulada) {
  
    for (var i = 0; i < questions.length; i++) {
        var idPreguntaEnArray = questions[i].question.id;
        if (idPreguntaEnArray == idPreguntaFormulada){
            var idAeliminar = idPreguntaEnArray;
            questions.splice(idAeliminar, 1);                       
        }
    } 
 }

//SetInterval 20 segundos

var myInterval = setInterval(obtenerDatosPreguntaAleatoria, 10000);

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


