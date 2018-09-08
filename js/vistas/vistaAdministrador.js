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
  this.modelo.respuestaAgregada.suscribir(function() {
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
    e.botonEditarPregunta.click(function() {
      var id = $('.list-group-item.active').attr('id');
      var objetoPregunta = contexto.controlador.editarPregunta(id);
      console.log(objetoPregunta);
      console.log(objetoPregunta.cantidadPorRespuesta[0].textoRespuesta);
      $('#pregunta').val(objetoPregunta.textoPregunta);
      $('#respuesta .form-control').remove();
      for (var i = 0; i < objetoPregunta.cantidadPorRespuesta.length; i++) {
        $('#optionTemplate').clone().removeClass('hide').attr('id', i+1).insertBefore('#optionTemplate').find('[name="option[]"]').val(objetoPregunta.cantidadPorRespuesta[i].textoRespuesta);
        //$('[name="option[' + i+1 + ']"]').val(objetoPregunta.cantidadPorRespuesta[i].textoRespuesta);
      }
    });
},


  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
