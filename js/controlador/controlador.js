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
    for (var i = 0; i < respuestas.length - 1; i++) {
      objetoRespuestas.push({'textoRespuesta': respuestas[i], 'cantidad':0});
    }
    this.modelo.agregarPregunta({'pregunta': textoPregunta, 'respuestas': objetoRespuestas});
  },

  agregarPreguntaEditada: function(textoPregunta, respuestas, idPregunta) {
    var objetoPreguntaEditada = {
      'textoPregunta': textoPregunta,
      'id': idPregunta,
      'respuestas': [],
    };
    for (var i = 0; i < respuestas.length; i++) {
      objetoPreguntaEditada.respuestas.push({'textoRespuesta': respuestas[i], 'cantidad':0});
    };
    this.modelo.agregarPreguntaEditada(objetoPreguntaEditada);
  },

  borrarPregunta: function(id) {
    // var id = parseInt($('.list-group-item.active').attr('id'));
    this.modelo.borrarPregunta(id);
  },

  borrarTodo: function() {
    this.modelo.borrarTodo();
  },

  inicializaPreguntas: function() {
    this.modelo.inicializaPreguntas();
  },

  editarPregunta: function(id) {
    var objetoPregunta = this.modelo.recuperarObjetoPregunta(id);
    return objetoPregunta;
  },

  agregarVotos: function() {
    if ($('#nombreUsuario').val().length > 0)  {
      var contexto = this;
      $('#preguntas').find('div').each(function() {
        var pregunta = $(this).text();
        var id = $(this).attr('id');
        $('input[name=' + id + ']:checked').each(function() {
          var respuestaSeleccionada = $(this).attr('value');
          contexto.modelo.sumarVoto(pregunta, respuestaSeleccionada);
        });
      });
      alert("Gracias " + $('#nombreUsuario').val() + " por haber participado de la votacion de ENCUESTADOS!");
  } else {
    alert("Para poder votar debe ingresar su nombre de usuario");
  }
  },

};
