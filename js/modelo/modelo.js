/*
 * Modelo
 */
/*
preguntas[0]: {
  'textoPregunta':'Comida preferida?',
  'id': '1',
  'cantidadPorRespuesta[0]':{
      'textoRespuesta': 'asado',
      'cantidad:0'
  },
},
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

  //se obtiene el indice en el array del id dado
  buscarIndicePorTextoPregunta: function(textoPregunta) {
    for (var i = 0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].textoPregunta == textoPregunta) {
        return i;
        break;
      }
    }
  },

  recuperarObjetoPregunta: function(id) {
    var i = this.buscarIndicePorId(id);
    var objetoPregunta = Object.assign({}, this.preguntas[i]);
    // aca copio el objeto de encuesta a editar desde el array de objetos DE FORMA PRIMITIVA - VIEJA ESCUELA
    // var objetoPregunta = {'textoPregunta': this.preguntas[i].pregunta, 'id': id, 'cantidadPorRespuesta': this.preguntas[i].respuestas};
    // for (var j = 0; j < this.preguntas[i].cantidadPorRespuesta.length-1; j++) {
    //   objetoPregunta.cantidadPorRespuesta[j].textoRespuesta = this.preguntas[i].cantidadPorRespuesta[j].textoRespuesta;
    //   objetoPregunta.cantidadPorRespuesta[j].cantidad = this.preguntas[i].cantidadPorRespuesta[j].cantidad;
    //   //objetoPregunta.cantidadPorRespuesta.push(this.preguntas[i].cantidadPorRespuesta[j]);
    // }
    return objetoPregunta;
  },


  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(objetoPregunta) {
    var id = this.obtenerUltimoId();
    id++;
    // var nuevaPregunta = {'textoPregunta': objetoPregunta.pregunta, 'id': id, 'cantidadPorRespuesta': objetoPregunta.respuestas};
    var nuevaPregunta = {'textoPregunta': objetoPregunta.pregunta, 'id': id, 'respuestas': objetoPregunta.respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  agregarPreguntaEditada: function(objetoPreguntaEditada) {
    var preguntaEditada = objetoPreguntaEditada;
    var indice = this.buscarIndicePorTextoPregunta(preguntaEditada.textoPregunta);
    preguntaEditada.id = this.preguntas[indice].id;
    this.preguntas.splice(indice, 1, preguntaEditada);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se agrega una respuesta dado un id
  // todo: anda! flata vista y controlador -- modelo.agregarRespuesta(2,'elculo de la mierda');
  agregarRespuesta: function(id, textonuevaRespuesta) {
    //this.preguntas[2].cantidadPorRespuesta[2].textoRespuesta
    var nuevaRespuesta = {'cantidad': 0 ,'textoRespuesta': textonuevaRespuesta};
    var indicePreguntas = this.buscarIndicePorId(id);
    // this.preguntas[indicePreguntas].cantidadPorRespuesta.push(nuevaRespuesta);
    this.preguntas[indicePreguntas].respuestas.push(nuevaRespuesta);
    this.guardar();
    this.respuestaAgregada.notificar();
  },

  //sumarle 1 al voto de una respuesta
  sumarVoto: function(textoPregunta, textoRespuesta){
    var indicePreguntas = this.buscarIndicePorTextoPregunta(textoPregunta);
    console.log('probando', textoPregunta, textoRespuesta);
      for (var i = 0; i < this.preguntas[indicePreguntas].respuestas.length; i++) {
        console.log(this.preguntas[indicePreguntas].respuestas[i].textoRespuesta == textoRespuesta);
        if (this.preguntas[indicePreguntas].respuestas[i].textoRespuesta == textoRespuesta) {
          this.preguntas[indicePreguntas].respuestas[i].cantidad++;
          console.log('entro al if debajo de la suma');
          this.guardar();
          this.respuestaAgregada.notificar();
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

  borrarTodo: function() {
    this.preguntas = []
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  //se traen las preguntas del localStorage
  inicializaPreguntas: function() {
    var stringDelObjetoPreguntas = localStorage.getItem('encuestados_preguntas');
    //this.preguntas = JSON.parse(stringDelObjetoPreguntas);
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
