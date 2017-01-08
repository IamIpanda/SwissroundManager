@buildIndexHistory = ->
  $('#history-list .list-group').replaceWith createIndexHistory round

createIndexHistory = ->
  groupNode = $('<div class="list-group"></div>')
  count = 1
  for round in @data.rounds
    groupNode.append $("<div class=\"list-group-title\">第 #{count} 轮</div>")
    groupNode.append createRoundHistory round
    count += 1
  groupNode

createRoundHistory = (round) ->
  roundNode = $('<ul></ul>')
  for match in round.matches
    $(roundNode).append createLi match.str(), match.stateStr()
  if round.byePlayer
    $(roundNode).append createLi round.byePlayer.name + " 轮空", "轮空"
  roundNode

