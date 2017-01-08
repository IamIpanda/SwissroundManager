@buildIndexPlayer = (players) ->
  $('#players-list ul').replaceWith createIndexPlayer players

createIndexPlayer = (players) ->
  roundNode = $('<ul></ul>')
  for player in players
    playerTitle = "<div class=\"badge\">#{player.score}</div>&nbsp;" + player.name
    $(roundNode).append createLi playerTitle, player.winLoseStr(), "player.html", player, (event) ->
      global.data.player = event.data
  roundNode
