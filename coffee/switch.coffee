@onInitIndexMatch = (page) ->
  buildIndexMatch data.rounds.length - 1, data.runningRound

@onInitMatch = (page) ->
  buildMatch global.data.match

@onLeaveMatch = (page) ->

@onInitIndexPlayer = (page) ->
  buildIndexPlayer data.players
  
@onInitPlayer = (page) ->
  buildPlayer global.data.player

@onLeaveIndexPlayer = (page) ->

@onInitIndexHistory = (page) ->
  buildIndexHistory()

@onLeaveIndexHistory = (page) ->

