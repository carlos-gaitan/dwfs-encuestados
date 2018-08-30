/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasInicializadas = new Evento(this);
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

  borrarPregunta: function(id) {
    for (var i = 0; i < this.preguntas.length; i++) {
      var pregunta = this.preguntas[i];
      if (pregunta.id == id) {
        this.preguntas.splice(i, 1);
        break;
      };
    };
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  // FIXME:
  // la funcion inicializaPreguntas no se donde ponerla ni de donde llamarla
  // creo que ya esta !
  inicializaPreguntas: function() {
    var stringDelObjetoPreguntas = localStorage.getItem('encuestados_preguntas');
    this.preguntas = JSON.parse(stringDelObjetoPreguntas);
    this.preguntasInicializadas.notificar();
  },

// ---------------------------------------------------------------------------------
//   vistaAdmin.reconstruirLista();
// undefined
// var stringDelObjetoPreguntas = localStorage.getItem('encuestados_preguntas');
// undefined
// modelo.preguntas = JSON.parse(stringDelObjetoPreguntas);
// (3) [{…}, {…}, {…}]
// vistaAdmin.reconstruirLista();
// ---------------------------------------------------------------------------------

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('encuestados_preguntas', JSON.stringify(this.preguntas));
  },
};
