// Generated by CoffeeScript 1.8.0
(function () {
    var match, round, _i, _len, _ref;

    this.data.addPlayer('熊猫');

    this.data.addPlayer('枪兵');

    this.data.addPlayer('包子');

    this.data.addPlayer('废铁');

    this.data.addPlayer('晓言');

    this.data.addPlayer('银风');

    this.data.addPlayer('败天');

    this.data.addPlayer('问号');

    this.data.addPlayer('觉皇');

    this.data.newRound();

    round = this.data.rounds[0];

    _ref = round.matches;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        match = _ref[_i];
        match.state = 'win';
    }

    this.data.newRound();

    round = this.data.rounds[1];

    round.startAll();

}).call(this);

//# sourceMappingURL=Test.js.map
