const PlayerState = require("./PlayerState.js");
const Weapon = require("./Weapon.js");

class Player {
    constructor(data){
        if(data) this.setup(data);
    }
    setup(data){
        this.steamId = String(data.steamid);
        this.clan = String(data.clan);
        this.name = String(data.name);
        this.observerSlot = data.observer_slot;
        this.team = data.team;
        this.activity = data.activity;
        this.state = new PlayerState(data.state);
        this.weapons = new Array();
        this.weaponIds = new Array();
        for(var weapon in data.weapons){
            this.weapons.push(new Weapon(data.weapons[weapon]));
            this.weaponIds.push(weapon)
        }
        this.matchStats=data.match_stats;
        this.state.isAlive;
    }
}

module.exports = Player;