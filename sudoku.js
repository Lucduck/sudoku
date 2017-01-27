var correctCards
var emptyCards

// IMAGENES
var fondo_juego = 'assets/IMG_3565.png'
// var basura_cerrada = 'assets/sudoku2/basura1.png'
// var basura_abierta = 'assets/sudoku2/basura2.png'
var tablero_fondo = 'assets/wood-planks-texture.jpg'
var tablero_border = 'assets/wood_border.png'
var tablero_inferior = 'assets/Wooden_Sign.png'

$(init)

function init () {
  $('body').css('background-image', 'url(' + fondo_juego + ')')



  correctCards = 0
  emptyCards = 16

  // coger tablero aleatorio, y con la funcion Rotar Array, girar las posiciones para que sea mas aleatorio
  var a = Math.floor((Math.random() * tableros.length))
  var tablero = RotarArray(tableros[a])

  // Hide the success message
  $('#successMessage').hide()
  $('#successMessage').animate({
    height: '0',
    opacity: 0
  })

  // Reset the game
  correctCards = 0
  $('#cardPile').html('')
  $('#cardSlots').html('')

  $('<img></img>').attr('src', tablero_fondo).attr('class', 'maderas maderas1').appendTo('#cardSlots')
  $('<img></img>').attr('src', tablero_border).attr('class', 'maderas maderas2').appendTo('#cardSlots')
  $('<img></img>').attr('src', tablero_inferior).attr('class', 'madera').appendTo('#cardPile')

  // Renderizar todas las fichas del tablero  
  var numbers = [ 1, 2, 3, 4 ]

  for ( var i = 0; i < numbers.length; i++) {
    var imatge = ruta_fichas + numbers[i] + '.png'
    $('<div></div>').attr('class', 'cua').css('left', 119 * i + 'px').data('number', numbers[i]).attr('id', 'card' + numbers[i]).appendTo('#cardPile').css('background-image', 'url("' + imatge + '")').draggable({
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'pointer',
      revert: true,
      revertDuration: 0
    })
    // FONDO
    $('<div></div>').appendTo('#cardPile').css('background-image', 'url("' + imatge + '")')
  }

  for ( var i = 0; i < tablero.length; i++) {
    for ( var j = 0; j < tablero[i].length; j++) {
      imatge = ''
      var borderColor = 'rgba(245, 226, 115, 0)'
      if (tablero[i][j] > 5) {
        imatge = ruta_fichas + (tablero[i][j] / 10) + '.png'
        borderColor = 'rgba(181, 160, 38, 1)'
        emptyCards--
      }
      $('<div></div>').data('number', tablero[i][j]).data('dropped', '0').appendTo('#cardSlots').css('background-image', 'url("' + imatge + '")').css('border-color', borderColor).droppable({
        accept: '#cardPile div',
        hoverClass: 'hovered',
        drop: handleCardDrop
      })
    }
  }
  // Basura DROPPABLE
  $('#basura').droppable({
    accept: '#cardSlots div',
    hoverClass: 'hovered',
    drop: eliminar
  })
}

function eliminar (event, ui) {
  var b = $(event.toElement)
  b.css('background-image', '')
  b.css('border-color', 'rgba(245, 226, 115, 0)')
  b.draggable('disable')
  b.droppable('enable')
  b.data('dropped', 0).droppable({
    accept: '#cardPile div',
    hoverClass: 'hovered',
    drop: handleCardDrop
  })
  emptyCards++
}

function handleCardDrop (event, ui) {
  var a = $(event.target)
  var b = $(event.toElement)
  var slotNumber = $(this).data('number')
  var cardNumber = ui.draggable.data('number')

  if (slotNumber < 10) {
    a.css('background-image', 'url("' + ruta_fichas + cardNumber + '.png' + '")')
    a.css('border-color', 'rgba(245, 226, 115, 1)')
    a.droppable('disable')
    a.draggable('enable')
    a.data('dropped', b.data('number')).draggable({
      containment: '#content',
      cursor: 'pointer',
      revert: true,
      revertDuration: 0
    })
    emptyCards--
  }

  // EJECUTA CUANDO SE ACABA
  if (emptyCards == 0) {
    var correcte = true
    for (var x = 1; x <= 16; x++) {
      var h = $('#cardSlots div:nth-child(' + x + ')')
      if (h.data('number') < 10) {
        if (h.data('number') != h.data('dropped')) {
          correcte = false
          break
        }
      }
    }
    //console.log('correcte')
    //console.log(correcte)
    // EJECUTA SI ESTA TODO CORRECTO
    if (correcte) {
      $('#successMessage').show()
      $('#successMessage').animate({
        height: '100%',
        opacity: 1
      })
    }
  }
}
