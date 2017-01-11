@onInitIndexMatch = (page) ->
  buildIndexMatch data.rounds.length - 1, data.runningRound

@onInitMatch = (page) ->
  buildMatch global.data.match

@onInitIndexPlayer = (page) ->
  buildIndexPlayer data.players

@onInitPlayer = (page) ->
  buildPlayer global.data.player

@onInitIndexHistory = (page) ->
  buildIndexHistory()

@onInitLeader = (page) ->
  buildLeader()

@onInitIndexEditPlayer = (page) ->
  buildIndexPlayerWithAdd data.players

@onInitEditPlayer = (page) ->
  buildEditPlayer()
