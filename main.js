
//preguntas
var questions = [
    {
        question : '¿Capital de Honduras?',
        answer : [
            'Tegucigalpa',
            'Tokio',
            'Madrid'
        ],
        indexOfCorrectAnswer: 0,
    },
    {
        question : '¿Color de la bandera de Argentina?',
        answer : [
            'blanco, rojo, negro',
            'azul, blanco, azul',
            'rojo'
        ],
        indexOfCorrectAnswer: 1,
    },
    {
        question : '¿Cual es el rio que pasa por Toledo?',
        answer : [
            'Miño',
            'Duero',
            'Tajo'
        ],
        indexOfCorrectAnswer: 2,
    },
    {
        question : '¿Aprenderé js?',
        answer : [
            'No',
            'No convencidisima',
            'Tal vez'
        ],
        indexOfCorrectAnswer: 2,
    }
];

function getQuestionRamdon(){
    var posicionDeAleatorio = Math.floor(Math.random()* questions.length);
    //borrar la pregunta
    // questions.splice(posicionDeAleatorio, 1);
    // console.log(posicionDeAleatorio);
    return questions[posicionDeAleatorio];
}

function deleteQuestionUsed(questionUsed) {
    
}

function obtenerDatosPreguntaAleatoria(){
    var preguntaObtenida =  getQuestionRamdon();
    var respuestasDePreguntaObtenida = preguntaObtenida.answer;
    
    document.getElementById('preguntas').innerHTML = preguntaObtenida.question;
    
    // var estructuraRespuestas = respuestasDePreguntaObtenida.map( function(item){
    // });

    for (var i = 0; i < respuestasDePreguntaObtenida.length; i++){
        var estructuraRespuesta = '<li><input name = "answers" type="radio" value = "'+ i +'">' + respuestasDePreguntaObtenida[i] + ' </li>';
        document.getElementById('listaRespuestas').innerHTML += estructuraRespuesta;
    }
    
    //document.getElementById('respuestas').innerHTML = getQuestionRamdon().;
}

obtenerDatosPreguntaAleatoria();

//SetInterval 20 segundos

var myInterval = setInterval(obtenerDatosPreguntaAleatoria, 20000);

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


