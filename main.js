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

var RESPUESTA = {
    ACERTADA : 1,
    FALLIDA : 2,
    VACIA : 0
};


var preguntaObtenida;
var segundos = 0;
 var puntos = 0;

function getQuestionRamdon(){
    var posicionDeAleatorio = Math.floor(Math.random()* questions.length); 
    var preguntaAdevolver = questions[posicionDeAleatorio];
    questions.splice(posicionDeAleatorio, 1);
    return preguntaAdevolver;
}
function pintarPreguntas() {
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

var miRespuestaElegida;

function esRespuestaCorrecta(){
    miRespuestaElegida = document.miformulario.answers.value;
    var resultado;
    if(miRespuestaElegida === ''){
        resultado = RESPUESTA.VACIA;
        mensajeRespuestas('Contesta algo porfi');
    }else if(parseInt(miRespuestaElegida) === preguntaObtenida.correctAnswerId){
       resultado = RESPUESTA.ACERTADA;
       mensajeRespuestas( 'Has acertado');
    }else if(parseInt(miRespuestaElegida) !== preguntaObtenida.correctAnswerId){
        resultado = RESPUESTA.FALLIDA;
        mensajeRespuestas( 'Has fallado');
    }
    return resultado;
}
function mensajeRespuestas(mensaje){
    document.getElementById('mensaje').innerHTML = mensaje;
}

document.miformulario.addEventListener('change', esRespuestaCorrecta);






// var myInterval = setInterval( function(){
   
//     if(questions.length > 0){
//         pintarPreguntas(); 
//     }else{
//         clearInterval(myInterval);
//         document.getElementById('siguiente').style.display = 'none';
//         document.getElementById('enviar').style.display = 'block';
//     }
// }, 20000);
            var t;
			function reloj() {

				if(segundos > 9){
				    document.getElementById('displayReloj').innerHTML = segundos;
				}else{
				    document.getElementById('displayReloj').innerHTML = '0' + segundos;
				}
				if(segundos === 20){
                    alert('Tu tiempo ha terminado'); 
                    clearInterval(t);
                    siguientePregunta();
                    document.getElementById('displayReloj').innerHTML = segundos;
				}else{
                    t = setTimeout(function(){
                        reloj();
                    },1000);
                    segundos++;
                }
			}
            reloj();

            

function siguientePregunta(){
    if(questions.length > 0) {
        if(esRespuestaCorrecta() === RESPUESTA.ACERTADA){
            recalcularMarcadorAcierto();
        }
        if(esRespuestaCorrecta() === RESPUESTA.FALLIDA){
            recalcularMarcadorFallo();
        }
        if(esRespuestaCorrecta() === RESPUESTA.VACIA){
            recalcularNoContesta();
        }
    clearInterval(t);
    segundos = 0;
    pintarPreguntas();
    reloj();
    }else{
        document.getElementById('siguiente').style.display = 'none';
        document.getElementById('enviar').sstyle.display = 'block';
    }
}

document.getElementById('siguiente').addEventListener('click', siguientePregunta);



function recalcularNoContesta(){
    if (segundos === ''){
        puntos += - 2;
        console.log('menos 2');
    }
    if (segundos >= 19){
        puntos += - 3;
        console.log('menos 3');
    }
}

function recalcularMarcadorAcierto(){
    if (segundos <= 2){
        puntos += + 2;
        console.log('mas dos')
    }
    if (segundos >= 2 && segundos < 10){
        puntos += 1;
        console.log('mas uno')
    }
    if (segundos > 10){
        puntos;
        console.log('0 puntos')
    }
}

function recalcularMarcadorFallo(){
    if (segundos > 10){
        puntos += - 2;
        console.log('menos dos puntos')
    }
    if (segundos <= 10){
        puntos += - 1;
        console.log('menos 1 punto')
    }
}