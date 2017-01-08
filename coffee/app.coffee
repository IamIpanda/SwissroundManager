@app = new Framework7()
$$ = Dom7

leftView = @app.addView '.view-left',
  dynamicNavbar: true

rightView = @app.addView '.view-main',
  dynamicNavbar: true

@app.onPageInit 'index-match', @onInitIndexMatch
@app.onPageInit 'index-player', @onInitIndexPlayer
@app.onPageInit 'index-history', @onInitIndexHistory
@app.onPageInit 'match', @onInitMatch
@app.onPageInit 'player', @onInitPlayer

@app.onPageBack 'match', @onInitIndexMatch