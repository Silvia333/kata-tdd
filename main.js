
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

    console.log(preguntaObtenida.question);
    console.log(preguntaObtenida.answer);

    //document.getElementById('preguntas').innerHTML = getQuestionRamdon().question;
}

obtenerDatosPreguntaAleatoria();

//SetInterval 20 segundos

var myInterval = setInterval(obtenerDatosPreguntaAleatoria, 5000);

// function stopMyInterval(){
//     clearInterval(myInterval);
// }
obtenerDatosPreguntaAleatoria();
