# 对于比赛的抽象
@game = ->
  console.log "Game is a static class."
# 比赛名称
@game.namai = ""
# 比赛轮数
@game.rounds = 4

@game.config = ->
  console.log "Config is a static class."
@config = @game.config

# yes - 允许平局
# lose - 允许平局，平局者双败
# no - 不允许平局
@config.peace = 'no'

# 得分
@config.score =
# 胜利得分
  'winScore': 1,
# 平局得分
  'peaceScore': 0,
# 轮空得分
  'byeScore': 0,
# 败北得分
  'loseScore': 0

