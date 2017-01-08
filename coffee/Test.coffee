@data.addPlayer '熊猫'
@data.addPlayer '枪兵'
@data.addPlayer '包子'
@data.addPlayer '废铁'
@data.addPlayer '晓言'
@data.addPlayer '银风'
@data.addPlayer '败天'
@data.addPlayer '问号'
@data.addPlayer '觉皇'

@data.newRound()
round = @data.rounds[0]
match.state = 'win' for match in round.matches
@data.newRound()
round = @data.rounds[1]
round.startAll()