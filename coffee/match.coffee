@buildMatch = (match) ->
  global['match'].match = match
  $('#match-title').html "第 #{data.rounds.length} 轮 第 #{match.order} 桌"
  $('#player1-name-box').html match.player1.name
  $('#player2-name-box').html match.player2.name
  updateMatch match
  setMatchScript()

updateMatch = (match) ->
  $('#match-report').html match.reportStr()
  $('#button-player1-win').removeClass 'active'
  $('#button-player2-win').removeClass 'active'
  $('#button-players-draw').removeClass 'active'
  switch match.state
    when 'win'
      $('#button-player1-win').addClass 'active'
    when 'lose'
      $('#button-player2-win').addClass 'active'
    when 'peace'
      $('#button-players-draw').addClass 'active'
  $('#button-player1-win').html match.player1.name + "胜利"
  $('#button-player2-win').html match.player2.name + "胜利"

@setMatchScript = ->
  $('#button-player1-win').off 'click', "**"
  $('#button-player2-win').off 'click', "**"
  $('#button-players-draw').off 'click', "**"
  $('#button-player1-win').on 'click', ->
    global.data.match.state = 'win'
    updateMatch global.data.match
  $('#button-player2-win').on 'click', ->
    global.data.match.state = 'lose'
    updateMatch global.data.match
  $('#button-players-draw').on 'click', ->
    global.data.match.state = 'peace'
    updateMatch global.data.match