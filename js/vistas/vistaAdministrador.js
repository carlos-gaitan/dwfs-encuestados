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
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    // interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
    interiorItem.find('small').text(pregunta.respuestas.map(function(resp){
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
      if ($('#pregunta').val().length > 0)  {
        if ($('[name="option[]"]').val() !== "") {
          var textoPregunta = $('#pregunta').val();
          var respuestas = [];
          $('[name="option[]"]').each(function() {
            var respuesta = $(this).val();
            respuestas.push(respuesta);
          });
          contexto.controlador.agregarPregunta(textoPregunta, respuestas);
          contexto.limpiarFormulario();
        } else {
            alert("Al menos debes escribir una respuesta");
        }
      } else {
        alert("El campo pregunta no puede estar vacio");
      }
    });
    e.botonAgregarPreguntaEditada.click(function() {
      /*armamos conseguimos la pregunta y respuestas a editar*/
      var textoPregunta = $('#pregunta').val();
      var preguntaId = $('#pregunta').data('dataId');
      console.log(preguntaId);
      var respuestas = [];
      $('[name="option[]"]').each(function() {
        var respuesta = $(this).val();
        if(respuesta != "") {
          respuestas.push(respuesta);
        };
      });
      /*ya tenemos la pregunta y respuestas, ahora las mostramos*/
      /*acomodamos el formulario y lo dejamos listo para volver a agregar una nueva pregunta*/
      $('#agregarPregunta').removeClass('hide');
      $('#agregarPreguntaEditada').addClass('hide');
      $('#respuesta .form-control').removeClass('hide');
      $('.form-group.answer.agregado-a-mano').remove();
      contexto.reconstruirLista();
      contexto.limpiarFormulario();
      /*enviamos la pregunta y respuestas al controlador*/
      contexto.controlador.agregarPreguntaEditada(textoPregunta, respuestas, preguntaId);
    });

    // Completar la asociación de de eventos a los
    // botones editarPregunta, borrarPregunta y borrarTodo
    e.botonBorrarPregunta.click(function() {
      if ($('.list-group-item.active').length > 0) {
        var id = parseInt($('.list-group-item.active').attr('id'));
        contexto.controlador.borrarPregunta(id);
      } else {
        alert("Debes selecciona una pregunta para poder borrar.");
      }
    });

    e.botonBorrarTodo.click(function() {
      contexto.controlador.borrarTodo();
    });

    e.botonEditarPregunta.click(function() {
      if ($('.list-group-item.active').length > 0) {
        $('#agregarPregunta').addClass('hide');
        $('#agregarPreguntaEditada').removeClass('hide');
        var id = $('.list-group-item.active').attr('id');
        var objetoPregunta = contexto.controlador.editarPregunta(id);
        $('#pregunta').val(objetoPregunta.textoPregunta).data('dataId', objetoPregunta.id);
        $('#respuesta .form-control').addClass('hide');
        if ($('.agregado-a-mano').length > 0) {
          $('.agregado-a-mano').remove();
        }
        for (var i = 0; i < objetoPregunta.respuestas.length; i++) {
          $('#optionTemplate').clone().removeClass('hide').addClass('agregado-a-mano').attr('id', i+1).insertBefore('#optionTemplate').find('[name="option[]"]').val(objetoPregunta.respuestas[i].textoRespuesta);
        }
      } else {
        alert("Debes selecciona una pregunta para poder editar.");
      }
    });

  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },

};
