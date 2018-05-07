
//preguntas
var questions = [
    {
        question : '¿Capital de Honduras?',
        answer : [
            'Tegucigalpa',
            'Tokio',
            'Madrid'
        ],
        correct: 0,
    },
    {
        question : '¿Color de la bandera de Argentina?',
        answer : [
            'blanco, rojo, negro',
            'azul, blanco, azul',
            'rojo'
        ],
        correct: 1,
    },
    {
        question : '¿Cual es el rio que pasa por Toledo?',
        answer : [
            'Miño',
            'Duero',
            'Tajo'
        ],
        correct: 2,
    },
    {
        question : '¿Aprenderé js?',
        answer : [
            'No',
            'No convencidisima',
            'Tal vez'
        ],
        correct: 2,
    }
]

function getQuestionRamdon(){
    var aleatorio = Math.floor(Math.random()* questions.length);
    //borrar la pregunta
    // questions.splice(aleatorio, 1);
    //console.log(aleatorio);
    return questions[aleatorio];
}

function obtenerDatosPreguntaAleatoria(){
    var preguntaObtenida =  getQuestionRamdon();

    console.log(preguntaObtenida.question);
    console.log(preguntaObtenida.answer);

    //document.getElementById('preguntas').innerHTML = getQuestionRamdon().question;
}

obtenerDatosPreguntaAleatoria();

//SetInterval 20 segundos

setInterval(obtenerDatosPreguntaAleatoria, 20000);

