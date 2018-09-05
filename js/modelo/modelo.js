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
  this.respuestaAgregada = new Evento(this);
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
  //se obtiene el indice en el array del id dado
  buscarIndicePorId: function(id) {
    for (var i = 0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].id == id) {
        return i;
        break;
      }
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
  //se agrega una respuesta dado un id
  // todo: anda! flata vista y controlador -- modelo.agregarRespuesta(2,'elculo de la mierda');
  agregarRespuesta: function(id, textonuevaRespuesta) {
    //this.preguntas[2].cantidadPorRespuesta[2].textoRespuesta
    var nuevaRespuesta = {'cantidad': 0 ,'textoRespuesta': textonuevaRespuesta};
    var indicePreguntas = this.buscarIndicePorId(id);
    this.preguntas[indicePreguntas].cantidadPorRespuesta.push(nuevaRespuesta);
    this.guardar();
    this.respuestaAgregada.notificar();
  },

  //sumarle 1 al voto de una respuesta
  sumarVoto: function(idPregunta, textoRespuesta){
    var indicePreguntas = this.buscarIndicePorId(idPregunta);
      for (var i = 0; i < this.preguntas[indicePreguntas].cantidadPorRespuesta.length; i++) {
        if (this.preguntas[indicePreguntas].cantidadPorRespuesta[i].textoRespuesta == textoRespuesta) {
          this.preguntas[indicePreguntas].cantidadPorRespuesta[i].cantidad++;
        break;
      }
    }
  },

  //editarPregunta
  editarPregunta: function(id) {

  },

  //se borra pregunta dado un id
  borrarPregunta: function(id) {
    this.preguntas.splice(this.buscarIndicePorId(id), 1);
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  //se traen las preguntas del localStorage
  inicializaPreguntas: function() {
    var stringDelObjetoPreguntas = localStorage.getItem('encuestados_preguntas');
    this.preguntas = JSON.parse(stringDelObjetoPreguntas);
    if (stringDelObjetoPreguntas == null) {
      this.preguntas = [];
    }
    else {
      this.preguntas = JSON.parse(stringDelObjetoPreguntas);
    }
    this.preguntasInicializadas.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('encuestados_preguntas', JSON.stringify(this.preguntas));
  },
};
