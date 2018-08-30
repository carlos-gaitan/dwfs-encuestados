/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEliminada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntasInicializadas.suscribir(function() {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();

    // FIXME:
    // Esta bien esto aca?? recarga las preguntas del localStorage.
    this.controlador.inicializaPreguntas();

  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem = $('<li class="list-group-item" id="' + pregunta.id + '">' + pregunta.textoPregunta + '</li>');
  //var nuevoItem = `$(`<li class=“list-group-item” id=“${pregunta.id}“>${pregunta.textoPregunta}</li>`);`

    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociación de eventos
    e.botonAgregarPregunta.click(function() {
      var textoPregunta = $('#pregunta').val();
      var respuestas = [];
      $('[name="option[]"]').each(function() {
        var respuesta = $(this).val();
        respuestas.push(respuesta);
      });
      contexto.controlador.agregarPregunta(textoPregunta, respuestas);
      contexto.limpiarFormulario();
    });
    // Completar la asociación de de eventos a los
    // botones editarPregunta, borrarPregunta y borrarTodo
    e.botonBorrarPregunta.click(function() {
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id);
    });
},


  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },

  //se que esto no va asociación
  // $( document ).ready(function() {
  //     console.log( "ready!" );
  //     contexto.controlador.inicializaPreguntas();
  // });

};
