@onLeaderload = ->
  #setPlaceholder()
  $('#start-button').on 'click', ->
    pressStart()
    loadMain()

pressStart = ->
  game.namai = $('#input-game-name')[0].value
  game.namai = $('#input-game-name')[0].placeholder if game.namai == "" or not game.namai
  game.rounds = $('#input-game-rounds')[0].value
  game.rounds = $('#input-game-rounds')[0].placeholder if game.rounds == "" or not game.rounds

  data.newRound()

setPlaceholder = ->
  count = Math.floor data.players.count / 2
  count = Math.max count, 3
  $('#input-game-rounds')[0].placeholder = count.toString()
  console.log count
