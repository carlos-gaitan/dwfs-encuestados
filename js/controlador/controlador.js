/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(textoPregunta, respuestas) {
    // var value = objetoPregunta;
    var objetoRespuestas = [];
    for (var i = 0; i < respuestas.length; i++) {
      objetoRespuestas.push({'textoRespuesta': respuestas[i], 'cantidad':0});
    }
    this.modelo.agregarPregunta({'pregunta': textoPregunta, 'respuestas': objetoRespuestas});
  },

  borrarPregunta: function(id) {
    // var id = parseInt($('.list-group-item.active').attr('id'));
    this.modelo.borrarPregunta(id);
  },

  inicializaPreguntas: function() {
    this.modelo.inicializaPreguntas();
  },

  agregarVotos: function(){
    var contexto = this;
    $('#preguntas').find('div').each(function(){
      var nombrePregunta = $(this).attr('value')
      var id = $(this).attr('id')
      var pregunta = contexto.modelo.obtenerPregunta(nombrePregunta);
      var respuestaSeleccionada = $('input[name=' + id + ']:checked').val();
      $('input[name=' + id + ']').prop('checked',false);
      contexto.agregarVoto(pregunta,respuestaSeleccionada);
    });
  },


};
