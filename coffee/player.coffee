@buildPlayer = (player) ->
  $('#player-history-list ul').replaceWith buildPlayerMatches player
  $('#player-text-label').html buildPlayerText player

buildPlayerText = (player) ->
  "#{player.name}当前 <div class=\"badge\">#{player.winCount} - #{player.loseCount}</div> 积 <div class=\"badge\">#{player.score}</div> 分"

buildPlayerMatches = (player) ->
  for i in [0..player.matches.length - 1]
    ul = $("<ul></ul>")
    match = player.matches[i]
    if match == null
      ul.append createLi "第 #{i + 1} 轮 轮空", "轮空"
    else
      ul.append createLi "第 #{i + 1} 轮 对阵 #{match.anotherPlayer(player).name}", "#{match.resultStr(player)}", "match.html", match, (event) ->
        global.data.match = match