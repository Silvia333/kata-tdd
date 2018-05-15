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
    
    var preguntaObtenida, 
        questions = [],
        segundos = 0, 
        nombreJugador, 
        puntos = 0,
        miRespuestaElegida, 
        numeroPreguntasOk = 0, 
        numeroPreguntasNoOk = 0, 
        tiempo,
        promedio = 0, 
        totalQuestions;
    
    function getQuestionRamdon() {
        var posicionDeAleatorio = Math.floor(Math.random() * questions.length);
        var preguntaAdevolver = questions[posicionDeAleatorio];
        return preguntaAdevolver;
    }
  
    function quitarPreguntaQueYaHaSalido(posicion){
        questions.splice(posicion, 1);
    }

    function pintarPregunta(preguntaObtenida) {
        var listaContenedora = '';
        var tituloDePreguntaObtenida = preguntaObtenida.question.text;
        var respuestasDePreguntaObtenida = preguntaObtenida.answers;
        document.getElementById('preguntas').innerHTML = tituloDePreguntaObtenida;
        for (var i = 0; i < respuestasDePreguntaObtenida.length; i++) {
            var estructuraRespuesta = '<li><input id= "item-' + i + '" name = "answers" type="radio" value = "'+ respuestasDePreguntaObtenida[i].id + '">' + respuestasDePreguntaObtenida[i].text + ' </li>';
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
            onNextQuestion();
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
            preguntaObtenida = getQuestionRamdon();
            quitarPreguntaQueYaHaSalido(questions.indexOf(preguntaObtenida));
            pintarPregunta(preguntaObtenida);
            promedio += parseInt(segundos);
            segundos = 0;
            pintarMensaje('');
            iniciarCronometro();
        } else {
            pintarPuntosMarcador();
            guardarDatosJugador();
            document.getElementById('siguiente').style.display = 'none';
            clearTimeout(tiempo);
            pintarPromedio();
        }
    }
    function iniciarCronometro(){
        cronometro();
    }
    function pintarPromedio(){
        promedio = promedio / totalQuestions;
        document.getElementsByClassName('promedio')[0].innerHTML = promedio + ' segundos';
    }

    function pintarPuntosMarcador(){
        document.getElementById('puntosJugador').innerHTML = puntos + ' puntos';
    }

    function guardarDatosJugador(){
       var marcador = {
           nombre: nombreJugador,
           puntos: puntos
       };
       localStorage.setItem('marcadorAppTrivial', JSON.stringify(marcador));
       //localStorage.getItem('marcadorAppTrivial', JSON.parse(marcador));
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
        miRespuestaElegida = document.miformulario.answers.value;
        if (miRespuestaElegida === ''){
            puntosSiNoContesta();
        } else if (parseInt(miRespuestaElegida) === preguntaObtenida.correctAnswerId){
            puntosSiAcierto();
        } else if (parseInt(miRespuestaElegida) !== preguntaObtenida.correctAnswerId){
            puntosSiFallo();
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

    function actualizarUI() {
        miRespuestaElegida = document.miformulario.answers.value;
        if (miRespuestaElegida === '') {
            pintarMensaje('No has contestado');
        } else if (parseInt(miRespuestaElegida) === preguntaObtenida.correctAnswerId) {
            pintarMensaje('Has acertado');
            pintarPuntos(true);
        } else if (parseInt(miRespuestaElegida) !== preguntaObtenida.correctAnswerId) {
            pintarMensaje('Has fallado');
            pintarPuntos(false);
        }
    }
   
    function onCheck(){
        actualizarUI();
    }

    function onNextQuestion(){
        calcularPuntos();
        siguientePregunta();
    }

    function iniciar() {
        document.getElementById('iniciar').addEventListener('click', function(){
            document.getElementsByClassName('overlay')[0].style.display = 'none';
            nombreJugador = document.getElementById('nombrejugador').value;   
            document.getElementById('jugador').innerHTML = nombreJugador;
            getQuestions(function (data) {
                questions = data;
                totalQuestions = data.length;
            });
            preguntaObtenida = getQuestionRamdon();
            quitarPreguntaQueYaHaSalido(questions.indexOf(preguntaObtenida));
            pintarPregunta(preguntaObtenida);
            iniciarCronometro();
            document.getElementById('enviar').addEventListener('click', onCheck);
            document.getElementById('siguiente').addEventListener('click', onNextQuestion);
        });
    }

    return {
        iniciar: iniciar,
    };
})();