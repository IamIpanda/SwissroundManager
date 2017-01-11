@buildEditPlayer = ->
  $('#ok-button').off 'click'
  $('#ok-button').on 'click', onEditPlayerOKPressed
  if global['index-edit-player'].player == null
    $('#remove-button').off 'click'
    $('#remove-button').hide()
  else
    $('#remove-button').off 'click'
    $('#remove-button').on 'click', onRemovePlayerOKPressed
    $('#remove-button').show()

  inputPlayerName = $('#input-player-name')[0]
  if global['index-edit-player'].player != null
    inputPlayerName.value = global['index-edit-player'].player.name

onEditPlayerOKPressed = ->
  global.data.playerName = $('#input-player-name')[0].value
  global.data.playername = $('#input-player-name')[0].placeholder if global.data.playername == ""
  if global['index-edit-player'].player == null
    data.addPlayer global.data.playerName
  else
    global['index-edit-player'].player.name = global.data.playerName
  $$('.view#view-leader')[0].f7View.router.back()

onRemovePlayerOKPressed = ->
  data.players.splice data.players.indexOf(global['index-edit-player'].player), 1
  $$('.view#view-leader')[0].f7View.router.back()