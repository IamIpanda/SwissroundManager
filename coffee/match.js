// Generated by CoffeeScript 1.8.0
(function() {
  var updateMatch;

  this.buildMatch = function(match) {
    global['match'].match = match;
    $('#match-title').html("第 " + data.rounds.length + " 轮 第 " + match.order + " 桌");
    $('#player1-name-box').html(match.player1.name);
    $('#player2-name-box').html(match.player2.name);
    updateMatch(match);
    return setMatchScript();
  };

  updateMatch = function(match) {
    $('#match-report').html(match.reportStr());
    $('#button-player1-win').removeClass('active');
    $('#button-player2-win').removeClass('active');
    $('#button-players-draw').removeClass('active');
    switch (match.state) {
      case 'win':
        $('#button-player1-win').addClass('active');
        break;
      case 'lose':
        $('#button-player2-win').addClass('active');
        break;
      case 'peace':
        $('#button-players-draw').addClass('active');
    }
    $('#button-player1-win').html(match.player1.name + "胜利");
    return $('#button-player2-win').html(match.player2.name + "胜利");
  };

  this.setMatchScript = function() {
    $('#button-player1-win').off('click', "**");
    $('#button-player2-win').off('click', "**");
    $('#button-players-draw').off('click', "**");
    $('#button-player1-win').on('click', function() {
      global.data.match.state = 'win';
      return updateMatch(global.data.match);
    });
    $('#button-player2-win').on('click', function() {
      global.data.match.state = 'lose';
      return updateMatch(global.data.match);
    });
    return $('#button-players-draw').on('click', function() {
      global.data.match.state = 'peace';
      return updateMatch(global.data.match);
    });
  };

}).call(this);

//# sourceMappingURL=match.js.map
