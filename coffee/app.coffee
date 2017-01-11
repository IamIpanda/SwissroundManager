@app = new Framework7()
@$$ = Dom7

@loadLeader = ->
  viewLeader = @app.addView "#view-leader",
    dynamicNavbar: true
  viewLeader.loadPage 'leader.html'
  @app.hideToolbar '#toolbar'

  @app.onPageInit 'leader-page', @onLeaderload
  @app.onPageInit 'index-edit-player',@onInitIndexEditPlayer
  @app.onPageInit 'edit-player', @onInitEditPlayer

  @app.onPageBack 'edit-player', @onInitIndexEditPlayer
@loadMain = ->
  viewIndexMatch = @app.addView '#view-index-match',
    dynamicNavbar: true
  viewIndexPlayer = @app.addView '#view-index-player',
    dynamicNavbar: true
  viewIndexHistory = @app.addView '#view-index-history',
    dynamicNavbar: true
  viewIndexConfig = @app.addView '#view-index-control',
    dynamicNavbar: true

  viewIndexMatch.loadPage 'index-match.html'
  viewIndexPlayer.loadPage 'index-player.html'
  viewIndexHistory.loadPage 'index-history.html'

  @app.onPageInit 'index-match', @onInitIndexMatch
  @app.onPageInit 'index-player', @onInitIndexPlayer
  @app.onPageInit 'index-history', @onInitIndexHistory
  @app.onPageInit 'match', @onInitMatch
  @app.onPageInit 'player', @onInitPlayer

  @app.onPageBack 'match', @onInitIndexMatch

  @app.showToolbar '#toolbar'
  @app.showTab '#view-index-match'

@loadLeader()