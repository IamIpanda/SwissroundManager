@buildLeader = ->
  setPlaceholder()
  $('#start-button').on 'click', ->
    pressStart()
    loadMain()

pressStart = ->
  game.namai = $('#input-game-name')[0].value
  game.namai = $('#input-game-name')[0].placeholder if game.namai == "" or not game.namai
  game.rounds = $('#input-game-rounds')[0].value
  game.rounds = $('#input-game-rounds')[0].placeholder if game.rounds == "" or not game.rounds
  game.config.peace = {"允许": "yes", "双败": "lose", "禁止": "no"}[$('#input-game-peace')[0].value]
  if game.config.peace == 'lose'
    game.config.score.peaceScore = 0
  data.newRound()

setPlaceholder = ->
  count = Math.floor data.players.length / 2
  count = Math.max count, 3
  $('#input-game-rounds')[0].placeholder = count.toString()
