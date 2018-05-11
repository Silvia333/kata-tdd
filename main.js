
var appTrivial = (function () {

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
        ];

        callback(serverData);
    }
    var questions = [];
    var RESPUESTA = {
        ACERTADA: 1,
        FALLIDA: 2,
        VACIA: 0
    };
    var preguntaObtenida, 
        segundos = 0, puntos = 0, 
        miRespuestaElegida, numeroPreguntasOk = 0, 
        numeroPreguntasNoOk = 0, tiempo, promedio = 0, totalQuestions;

    function getQuestionRamdon() {
        var posicionDeAleatorio = Math.floor(Math.random() * questions.length);
        var preguntaAdevolver = questions[posicionDeAleatorio];
        questions.splice(posicionDeAleatorio, 1);
        return preguntaAdevolver;
    }

    function pintarPregunta() {
        preguntaObtenida = getQuestionRamdon();
        var listaContenedora = '';
        var tituloDePreguntaObtenida = preguntaObtenida.question.text;
        var respuestasDePreguntaObtenida = preguntaObtenida.answers;
        document.getElementById('preguntas').innerHTML = tituloDePreguntaObtenida;
        for (var i = 0; i < respuestasDePreguntaObtenida.length; i++) {
            var estructuraRespuesta = '<li><input id= "item-' + i + '" name = "answers" type="radio" value = "'
                + respuestasDePreguntaObtenida[i].id + '">' + respuestasDePreguntaObtenida[i].text + ' </li>';
            listaContenedora += estructuraRespuesta;
        }
        document.getElementById('listaRespuestas').innerHTML = listaContenedora;
    }
    function cronometro() {
        if (segundos > 9) {
            document.getElementById('displayReloj').innerHTML = segundos;
        } else {
            document.getElementById('displayReloj').innerHTML = '0' + segundos;
        }
        if (segundos === 20) {
            siguientePregunta();
        } else {
            clearTimeout(tiempo);
            tiempo = setTimeout(function () {
                cronometro();
            }, 1000);
            segundos++;
        }
    }

    function siguientePregunta() {
        if (questions.length > 0) {
            clearTimeout(tiempo);
            pintarPregunta();
            promedio += parseInt(segundos);
            segundos = 0;
            pintarMensaje('');
            cronometro();
        } else {
            mostrarMarcador();
            document.getElementById('siguiente').style.display = 'none';
            clearTimeout(tiempo);
            mostrarPromedio();
        }
    }
    function mostrarPromedio(){
        promedio = promedio / totalQuestions;
        document.getElementsByClassName('promedio')[0].innerHTML = promedio + ' segundos';
    }
    function mostrarMarcador(){
            document.getElementById('puntos').innerHTML = puntos + ' puntos';
    }

    function esRespuestaCorrecta(){
        miRespuestaElegida = document.miformulario.answers.value;
        var resultado;
        if (miRespuestaElegida === '') {
            resultado = RESPUESTA.VACIA;
        } else if (parseInt(miRespuestaElegida) === preguntaObtenida.correctAnswerId) {
            resultado = RESPUESTA.ACERTADA;
        } else if (parseInt(miRespuestaElegida) !== preguntaObtenida.correctAnswerId) {
            resultado = RESPUESTA.FALLIDA;
        }
        return resultado;
    }

    function actualizarUI() {
        miRespuestaElegida = document.miformulario.answers.value;
        var resultado;
        if (miRespuestaElegida === '') {
            resultado = RESPUESTA.VACIA;
            pintarMensaje('No has contestado');
        } else if (parseInt(miRespuestaElegida) === preguntaObtenida.correctAnswerId) {
            resultado = RESPUESTA.ACERTADA;
            pintarMensaje('Has acertado');
            pintarPuntos(true);
        } else if (parseInt(miRespuestaElegida) !== preguntaObtenida.correctAnswerId) {
            resultado = RESPUESTA.FALLIDA;
            pintarMensaje('Has fallado');
            pintarPuntos(false);
        }
        return resultado;
    }
    function pintarMensaje(mensaje) {
        document.getElementById('mensaje').innerHTML = mensaje;
    }

    function pintarPuntos(acierto){
        if(acierto){
            document.getElementById('ok').innerHTML = ++numeroPreguntasOk;
        }else{
            document.getElementById('noOk').innerHTML = ++numeroPreguntasNoOk;
        }
    }

    function calcularPuntos(){
        if (esRespuestaCorrecta() === RESPUESTA.ACERTADA) {
            puntosSiAcierto();
        }
        if (esRespuestaCorrecta() === RESPUESTA.FALLIDA) {
            puntosSiFallo();
        }
        if (esRespuestaCorrecta() === RESPUESTA.VACIA) {
            puntosSiNoContesta();
        }
    }
    function puntosSiNoContesta() {
        if (segundos >= 19) {
            puntos += - 3;
            console.log(segundos + 'menos 3');
        }
    }
    function puntosSiAcierto() {
        if (segundos <= 2) {
            puntos += + 2;
            console.log(segundos + 'mas dos')
        }
        if (segundos >= 2 && segundos < 10) {
            puntos += 1;
            console.log(segundos + 'mas uno')
        }
        if (segundos > 10) {
            puntos;
            console.log(segundos + '0 puntos')
        }
    }
    function puntosSiFallo() {
        if (segundos > 10) {
            puntos += - 2;
            console.log(segundos + 'menos dos puntos')
        }
        if (segundos <= 10) {
            puntos += - 1;
            console.log(segundos + 'menos 1 punto')
        }
    }

    function pintarJugador(){
        var jugador = document.getElementsByClassName('nombrejugador')[0].value; 
        localStorage.setItem(jugador);
    }
    function onCheck(){
        actualizarUI();
    }

    function onNextQuestion(){
        calcularPuntos();
        siguientePregunta();
    }

    function iniciar() {
        getQuestions(function (data) {
            questions = data;
            totalQuestions = data.length;
        });
        pintarPregunta();
        cronometro();
        document.getElementById('enviar').addEventListener('click', onCheck);
        document.getElementById('siguiente').addEventListener('click', onNextQuestion);
    }

    return {
        iniciar: iniciar
    };

})();

document.getElementById('iniciar').addEventListener('click', function(){
    document.getElementsByClassName('overlay')[0].style.display = 'none';
    // var jugador = document.getElementsByClassName('nombrejugador')[0].value;
    // document.getElementById('jugador').innerHTML = jugador;
    appTrivial.iniciar();
});
