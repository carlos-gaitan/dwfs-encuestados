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

  agregarPreguntaEditada: function(textoPregunta, respuestas) {
    var objetoPreguntaEditada = {
      'textoPregunta': textoPregunta,
      'id': 0,
      'respuestas': [],
    };
    for (var i = 0; i < respuestas.length; i++) {
      objetoPreguntaEditada.respuestas.push({'textoRespuesta': respuestas[i], 'cantidad':0});
    };
    // console.log('--- Mensaje desde el controlador ---');
    // console.log('Pregunta: ' + objetoPreguntaEditada.textoPregunta);
    // for (var i = 0; i < objetoPreguntaEditada.respuestas.length; i++) {
    //   console.log('textoRespuesta: ' + objetoPreguntaEditada.respuestas[i].textoRespuesta + ' cantidad de votos: ' + objetoPreguntaEditada.respuestas[i].cantidad);
    // };
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

  // agregarVotos VIEJA
  // agregarVotos: function(){
  //   var contexto = this;
  //   $('#preguntas').find('div').each(function(){
  //     var nombrePregunta = $(this).attr("value");
  //     var id = $(this).attr("id");
  //     var pregunta = contexto.modelo.obtenerPregunta(nombrePregunta);
  //     var respuestaSeleccionada = $('input[name=' + id + ']:checked').val();
  //     $('input[name=' + id + ']').prop('checked',false);
  //     contexto.agregarVoto(pregunta,respuestaSeleccionada);
  //   });
  // },
  agregarVotos: function() {
    var contexto = this;
    $('#preguntas').find('div').each(function() {
      var pregunta = $(this).text();
      var id = $(this).attr('id');
      $('input[name=' + id + ']:checked').each(function() {
        var respuestaSeleccionada = $(this).attr('value');
        console.log(id, pregunta, respuestaSeleccionada);
        contexto.modelo.sumarVoto(pregunta, respuestaSeleccionada);
      });
    });
  },

  // Esto anda
  // $('#preguntas').find('div').each(function(){
  //   var pregunta = $(this).text();
  //   var id = $(this).attr('id');
  //   $('input[name=' + id + ']:checked').each(function() {
  //     var respuestaSeleccionada = $(this).attr('value');
  //     console.log(id, pregunta, respuestaSeleccionada);
  //   });
  // });

  // 1 Que deporte practicas con mas frecuencia? correr
  // 2 Que comidas elegís durante los periodos que estas deportivamente activo? frutas
  // 3 Cuando necesitas o decidís desconectar de la rutina que lugar elegis? playa



};
