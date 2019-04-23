const gamemodes = require("../data/gamemodes.json");
const maps = require("../data/maps.json");

/**
 * Match data such as game mode, map, and teams
 */
class Match {
    constructor(data){
        if(data) this.setup(data);
    }
    setup(data){
        /**
         * What round the match is on
         * @type {number}
         */
        this.round = data.map.round;
        /**
         * How many matches need to be won to win the series
         * @type {number}
         */
        this.matchesToWinSeries = data.map.num_matches_to_win_series;
        /**
         * How many people are spectating the match
         * @type {number}
         */
        this.currentSpectators = data.map.current_spectators;
        /**
         * The CT team
         * @property {string} name Team name
         * @property {number} score Team score
         * @property {number} timeoutsRemaining Remaining timeouts
         * @property {number} matchesWonThisSeries Matches won this series
         */
        this.teamCt = {
            name:data.map.team_ct.name || "Counter-Terrorists",
            score: data.map.team_ct.score,
            timeoutsRemaining: data.map.team_ct.timeouts_remaining,
            matchesWonThisSeries: data.map.team_ct.matches_won_this_series
        }
        /**
         * The T team
         * @property {string} name Team name
         * @property {number} score Team score
         * @property {number} timeoutsRemaining Remaining timeouts
         * @property {number} matchesWonThisSeries Matches won this series
         */
        this.teamT = {
            name:data.map.team_t.name || "Terrorists",
            score:data.map.team_t.score,
            timeoutsRemaining:data.map.team_t.timeouts_remaining,
            matchesWonThisSeries:data.map.team_t.matches_won_this_series
        }
        /**
         * I have no idea
         * @type {number}
         */
        this.souvenirsTotal = data.map.souvenirs_total;
        /**
         * The game mode
         * @property {string} id The technical name of the game mode
         * @property {function} name @returns {string} the English name of the game mode
         */
        this.mode = {
            id:data.map.mode,
            name:function(){return gamemodes[data.map.mode]}
        };
        /**
         * The map
         * @property {string} id the technical name of the map
         * @property {function} name the English name of the map
         * @property {string} phase the map phase
         */
        this.map = {
            id:data.map.name,
            name:function(){return maps[data.map.name]},
            phase: data.map.phase,
        },
        /**
         * The round
         * @property {string} phase The round phase
         * @property {?string} bomb The state of the bomb. Known values: "planted", "exploded"
         * @property {?string} winTeam The winning team, either "T" or "CT". Only available when round.phase is "over"
         */
        this.round = {
            phase: data.round.phase,
            bomb: data.round.bomb,
            winTeam: data.round.win_team
        }
    }
}

module.exports = Match;