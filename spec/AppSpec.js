/* TO DO - list
*
*   velocidad de respuesta, acierto o fallo,
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



describe('calculo de marcador', function(){
    function recalcularMarcador(puntos, esCorrecta, tiempo){
        if (esCorrecta && tiempo <= 2){
            return puntos + 2;
        }
        if (esCorrecta && tiempo >= 2 && tiempo < 10){
            return ++puntos;
        }
    }
    it("suma mas puntos si acierta muy rapido en menos de 2 segundos", function(){
        expect(recalcularMarcador(0, true, 1)).toBe(2);
    });
    it("suma 1 punto si acierta entre 2 y 10 segundos", function(){
        expect(recalcularMarcador(3, true, 3)).toBe(4);
    });
});