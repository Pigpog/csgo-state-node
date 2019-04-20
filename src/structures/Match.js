const gamemodes = require("../data/gamemodes.json");
const maps = require("../data/maps.json");
class Match {
    constructor(data){
        if(data) this.setup(data);
    }
    setup(data){
        this.round = data.map.round;
        this.matchesToWinSeries = data.map.num_matches_to_win_series;
        this.currentSpectators = data.map.current_spectators;
        this.teamCt = {
            name:data.map.team_ct.name || "Counter-Terrorists",
            score: data.map.team_ct.score,
            timeoutsRemaining: data.map.team_ct.timeouts_remaining,
            matchesWonThisSeries: data.map.team_ct.matches_won_this_series
        }
        this.teamT = {
            name:data.map.team_t.name || "Terrorists",
            score:data.map.team_t.score,
            timeoutsRemaining:data.map.team_t.timeouts_remaining,
            matchesWonThisSeries:data.map.team_t.matches_won_this_series
        }
        this.souvenirsTotal = data.map.souvenirs_total;
        this.mode = {
            id:data.map.mode,
            name:function(){return gamemodes[data.map.mode]}
        };
        this.map = {
            id:data.map.name,
            name:function(){return maps[data.map.name]},
            phase: data.map.phase,
        },
        this.round = {
            phase: data.round.phase,
            bomb: data.round.bomb,
            winTeam: data.round.win_team
        }
    }
}

module.exports = Match;