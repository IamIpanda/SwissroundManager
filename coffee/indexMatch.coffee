@buildIndexMatch = (index, round)->
  global["index-match"].index = index
  global["index-match"].round = round
  $('#roundName').html "第 #{index + 1} 轮对局"
  $('#roundMatches ul').replaceWith createIndexMatch round
  @setIndexMatchScript()

@createIndexMatch = (round) ->
  roundNode = $('<ul></ul>')
  for match in round.matches
    roundNode.append createLi match.str(), match.stateStr(), "match.html", match, (event) ->
      global.data.match = event.data
  roundNode

@setIndexMatchScript = ->
  $('#button-start-all-matches').off 'click'
  $('#button-end-this-round').off 'click'

  $('#button-start-all-matches').on 'click', ->
    data.runningRound.startAll()
    buildIndexMatch global.data.index, global.data.round
  $('#button-end-this-round').on 'click', ->
    data.newRound()
    buildIndexMatch global.data.index + 1, data.runningRound