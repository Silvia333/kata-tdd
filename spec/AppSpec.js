/* TO DO - list
*
*   velocidad de respuesta, acierto o fallo,
*
*       Si no hay preguntas.
*
*       Si acierto pregunta en menos de 2 segundos - sumo 2 puntos
*           (0 puntos, correcta, 1 segundo) -> 2 puntos
*           (2 puntos, correcta, 0 segundo) -> 4 puntos 
*    
*       Si acierto pregunta entre 2 y 10 segundos - sumo 1 punto
*           (1 punto, correcta, 8 segundos) -> 2 puntos
*
*       Si acierto y tardo mas de 10 segundos - 0 puntos
*           (0 punto, correcta, 11 segundos) -> 0 puntos
*
*       No se puede pasar sin responder
*           (!(''))
*
*       Si en 20 segundos no has respondido , pasa a siguiente pregunta y pierdes 3 punto
*           (4 punto, '', 20 segundos) -> 1 puntos
*
*       Si fallo pregunta en mas de 10 segundos - resto 2 puntos
*           (6, fallo, 11 segundos) -> 4 puntos
*
*       Si fallo antes de 10 segundos - resto 1 punto
*           (0, fallo, 9 segundos) -> -1 puntos
*
* */
describe('comprobador de respuestas', function() {
    function checkAnswer(question, answer){
        return question.correct===parseInt(answer);
    }
    var questionTest = {
        question : '¿Capital de Honduras?',
        answers : [
            'Tegucigalpa',
            'Tokio',
            'Madrid'
        ],
        correct: 0
    };
   
  it('comprobar si ha acertado', function(){
    expect(checkAnswer(questionTest, 0)).toBeTruthy();
  }); 
});

describe('comprobador de respuestas', function() {
    /* comprobamos que la respuesta correcta sea de tipo number;
        que respuestas sea de tipo array y que no este vacío, 
        que pregunta sea string */

        function checkObject(question){
            return typeof question.correct === 'number' 
                && question.answers instanceof Array 
                && typeof question.question === 'string' 
                && question.answers.length === 3;       
        }
        var questionTestTwo = {
            question : '¿Capital de Honduras?',
            answers : [
                'Tegucigalpa',
                'Madrid',
                'Lima'
            ],
            correct: 0
        };
  it('comprobar el formato del objeto pregunta', function(){
    expect(checkObject(questionTestTwo)).toBeTruthy();
  }); 
});

describe('comprobador de respuestas', function() {
	function isCorrect(question, userSelectedAnswer) {
		if(question.id !== userSelectedAnswer.questionId) {
			return false;
		}
		if (userSelectedAnswer.id !== question.correctAnswer.id) {
			return false;
		}
		return true;
    }
    
    it("reconoce una pregunta correcta", function() {
		expect(isCorrect({
						id: 1,
						question: '¿Cual es la capital de Portugal?',
						answers: [
							{id: 1, value: 'Faro'},
							{id: 2, value: 'Oporto'},
							{id: 3, value: 'Lisboa'},

						],
						correctAnswer: {id: 3}
					},
					{questionId: 1, id: 3 })
			).toBeTruthy();
		});
	it("reconoce una pregunta incorrecta", function() {
		expect(isCorrect({
						id: 1,
						question: '¿Cual es la capital de Portugal?',
						answers: [
							{id: 1, value: 'Faro'},
							{id: 2, value: 'Oporto'},
							{id: 3, value: 'Lisboa'},

						],
						correctAnswer: {id: 3}
					},
					{questionId: 1, id: 2 })
		).toBeFalsy();
	});
	it("reconoce una respuesta que no corresponde a la pregunta", function() {
		expect(isCorrect({
					id: 1,
					question: '¿Cual es la capital de Portugal?',
					answers: [
						{id: 1, value: 'Faro'},
						{id: 2, value: 'Oporto'},
						{id: 3, value: 'Lisboa'},

					],
					correctAnswer: {id: 3}
				},
				{questionId: 5, id: 3 })
		).toBeFalsy();
	});
});



describe('calculo de marcador', function(){
    // funcion true
    // funcion false
    function recalcularNoContesta(puntos, tiempo){
        if (tiempo === ''){
            return puntos - 2;
        }
        if (tiempo > 20){
            return puntos - 3;
        }
    }

    function recalcularMarcadorAcierto(puntos, tiempo){
        if (tiempo <= 2){
            return puntos + 2;
        }
        if (tiempo >= 2 && tiempo < 10){
            return ++puntos;
        }
        if (tiempo > 10){
            return puntos;
        }
    }

    function recalcularMarcadorFallo(puntos, tiempo){
        if (tiempo > 10){
            return puntos - 2;
        }
        if (tiempo <= 10){
            return puntos - 1;
        }
    }

    it("suma mas puntos si acierta muy rapido en menos de 2 segundos", function(){
        expect(recalcularMarcadorAcierto(0, 1)).toBe(2);
    });

    it("suma 1 punto si acierta entre 2 y 10 segundos", function(){
        expect(recalcularMarcadorAcierto(3, 3)).toBe(4);
    });

    it("suma 0 puntos si acierta en más de 10 segundos", function(){
        expect(recalcularMarcadorAcierto(10, 15)).toBe(10);
    });

    // it("Si no se responde no se puede seguir", function(){
    //     expect(recalcularNoContesta(0)).toBe(-2);
    // });

    it("Si en 20 segundos no has respondido, pasa a siguiente pregunta", function(){
        expect(recalcularNoContesta(3, 21)).toBe(0);
    }); 

    it("Si fallas en mas de 10 segundos pierdes puntos", function(){
        expect(recalcularMarcadorFallo(3, 21)).toBe(1);
    });

    it("Si fallas en menos de 10 segundos pierdes puntos", function(){
        expect(recalcularMarcadorFallo(0, 9)).toBe(-1);
    });
});