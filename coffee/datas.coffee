# 牌手的抽象
@player = (name) ->
  name = '无名牌手' if !name
  @name = name
  @results = []
  @matches = []
  this
@player.resultScores =
  'win': config.score.winScore
  'lose': config.score.loseScore
  'peace': config.score.peaceScore
  'bye': config.score.byeScore
@player.prototype.win = ->
  @results.push 'win'#config.score.winScore
@player.prototype.bye = ->
  @results.push 'bye'#config.score.byeScore
  @matches.push null
@player.prototype.peace = ->
  @results.push 'peace'#config.score.pairScore
@player.prototype.lose = ->
  @results.push 'lose'#config.score.loseScore
@player.prototype.rollback = ->
  @results.pop()
@player.prototype.getScore = ->
  sum = 0
  sum += player.resultScores[result] for result in @results
  sum
@player.prototype.getResultCount = (searchingResult) ->
  count = 0
  for result in @results
    count += 1 if result == searchingResult
  count

Object.defineProperty @player.prototype, 'winCount', get: -> this.getResultCount 'win'
Object.defineProperty @player.prototype, 'loseCount', get: -> this.getResultCount 'lose'
Object.defineProperty @player.prototype, 'peaceCount', get: -> this.getResultCount 'peace'
Object.defineProperty @player.prototype, 'byeCount', get: -> this.getResultCount 'bye'

@player.prototype.winLoseStr = ->
  str = this.winCount + "-"
  draw = this.peaceCount
  str += if draw == 0 then "" else draw + "-"
  str += this.loseCount
  str
@player.prototype.anotherPlayer = (match) ->
  match.anotherPlayer this
@player.prototype.resultStr = (match) ->
  match.resultStr this

Object.defineProperty @player.prototype, 'score', get: @player.prototype.getScore

# 一场对局的抽象
@match = (player1, player2, order)->
  @player1 = player1
  @player2 = player2
  @player1.matches.push this
  @player2.matches.push this
  @actualState = 'waiting' # win, lose, peace, matching, waiting
  @order = order
  this
@match.prototype.getState = ->
  @actualState
@match.prototype.setState = (state) ->
  switch @actualState
    when 'win', 'lose', 'peace'
      @player1.rollback()
      @player2.rollback()
  switch state
    when 'win'
      @player1.win()
      @player2.lose()
    when 'lose'
      @player1.lose()
      @player2.win()
    when 'peace'
      @player1.peace()
      @player2.peace()
    when 'matching'
      'matching'
    when 'waiting'
      'waiting'
  @actualState = state
@match.prototype.containPlayer = (player) ->
  @player1 == player or @player2 == player
@match.prototype.containPlayers = (player1, player2)->
  (@player1 == player1 and @player2 == player2) or (@player1 == player2 and @player2 == player1)
@match.prototype.str = ->
  @player1.name + " 对阵 " + @player2.name
@match.prototype.stateStr = ->
  switch @state
    when 'win'
      @player1.name + '胜利'
    when 'lose'
      @player2.name + '胜利'
    when 'peace'
      '双方平局'
    when 'matching'
      '正在进行'
    when 'waiting'
      '等待开始'
@match.prototype.anotherPlayer = (player) ->
  if (player == null or player == undefined)
    player = @player1
  if (player != @player1 and player != @player2)
    return null
  return if player == @player1 then @player2 else @player1
@match.prototype.resultStr = (player) ->
  if (player == null or player == undefined)
    player = @player1
  if (player != @player1 and player != @player2)
    return ""
  switch @state
    when 'win'
      if @player1 == player then '胜利' else '败北'
    when 'lose'
      if @player2 == player then '胜利' else '败北'
    when 'peace'
      '平局'
    when 'matching'
      '正在进行'
    when 'waiting'
      '等待开始'
@match.prototype.reportStr = ->
  switch @state
    when 'win'
      @player1.name + ' 战胜了 ' + @player2.name
    when 'lose'
      @player2.name + ' 战胜了 ' + @player1.name
    when 'peace'
      @player1.name + ' 与 ' + @player2.name + ' 战平'
    when 'matching'
      @player1.name + ' 与 ' + @player2.name + ' 正在进行对局'
    when 'waiting'
      @player1.name + ' 与 ' + @player2.name + ' 正在等待开始'

Object.defineProperty @match.prototype, 'state',
  get: @match.prototype.getState
  set: @match.prototype.setState

# 一轮瑞士轮的抽象
@round = (order) ->
  @matches = []
  @byePlayer = null
  @order = order
  this
@round.prototype.generate = (players)->
  console.log '开始匹配'
  @waiting_player = null
  # 为玩家排序
  # 随机决定轮空玩家
  operatingPlayers = players.slice 0 # clone
  if players.length % 2 == 1
    byeIndex = Math.floor(Math.random() * players.length)
    @byePlayer = players[byeIndex]
    @byePlayer.bye()
    # 删除轮空玩家
    console.log "#{@byePlayer.name} 轮空"
    operatingPlayers.splice byeIndex, 1
  # 排名
  operatingPlayers = this.sortPlayers operatingPlayers
  # 贪心匹配
  while operatingPlayers.length > 0
    # 抽出第一个玩家
    matchingPlayerA = operatingPlayers[0]
    index = 1
    console.log "试图匹配: #{matchingPlayerA.name}, #{operatingPlayers[index].name}"
    while data.hasMet matchingPlayerA, operatingPlayers[index]
      index += 1
      console.log "试图匹配: #{matchingPlayerA.name}, #{operatingPlayers[index].name}"
      # 如果第一个玩家无合适的匹配，匹配终止。
      if index >= operatingPlayers.length
        break
    # 玩家配对
    matchingPlayerB = operatingPlayers[index]
    console.log "第 #{@matches.length + 1} 桌：#{matchingPlayerA.name} - #{matchingPlayerB.name}"
    #console.log operatingPlayers
    @matches.push new match matchingPlayerA, matchingPlayerB, @matches.length + 1
    # 从操作列表中移除
    operatingPlayers.splice index, 1
    operatingPlayers.splice 0, 1
  @matches

@round.prototype.sortPlayers = (players)->
  players.sort (playerA, playerB)->
    if playerA.score == playerB.score
      Math.random() > 0.5
    else
      playerB.score - playerA.score
  players
@round.prototype.startAll = ->
  @byePlayer.bye()
  for match in @matches
    if match.state == 'waiting'
      match.state = 'matching'
@round.prototype.canFinish = ->
  for match in @matches
    if match.state == 'waiting' or match.state == 'matching'
      return false
  true
@round.prototype.finish = ->
@round.prototype.searchPlayer = (player)->
  if player == @byePlayer
    return null
  for match in matches
    if match.containPlayer player
      return match
  return undefined
@round.prototype.searchPlayers = (player1, player2) ->
  for match in matches
    if match.containPlayers player1, player2
      return match
  null

@data = ->
@data.players = []
@data.rounds = []
@data.searchPlayerMatch = (player) ->
  matches = []
  for round in @rounds
    matches.push round.searchMatch(player)
  matches
@data.searchPlayers = (player1, player2) ->
  for round in @rounds
    match = round.containPlayers player1, player2
    if match != null
      return match
  return null
@data.newRound = ->
  newRound = new round(this.rounds.length + 1)
  newRound.generate(data.players)
  @rounds.push newRound
  newRound
@data.getRunningRound = ->
  @rounds[@rounds.length - 1]
@data.addPlayer = (name) ->
  @players.push new player(name)
  # 充轮空
@data.hasMet = (player1, player2) ->
  if !player1 or !player2
    return null
  for match in player1.matches
    if match != null
      if player1.anotherPlayer(match) == player2
        return true
  false

Object.defineProperty @data, 'runningRound', get: @data.getRunningRound
