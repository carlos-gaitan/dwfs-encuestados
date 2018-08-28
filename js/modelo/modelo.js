/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
      if (this.preguntas.length > 0) {
        var ultimaPregunta = this.preguntas[this.preguntas.length -1];
        return ultimaPregunta.id;
      } else {
        return 0;
      }
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(objetoPregunta) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': objetoPregunta.pregunta, 'id': id, 'cantidadPorRespuesta': objetoPregunta.respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function (id) {
    for (var i = 0; i < this.preguntas.length; i++) {
      var pregunta = this.preguntas[i];
      if (pregunta.id == id) {
        this.preguntas.splice(i, 1);
        break;
      };
    };
    this.preguntaEliminada.notificar();
  },
  //se guardan las preguntas
  guardar: function(){
  },
};
