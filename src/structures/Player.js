const PlayerState = require("./PlayerState.js");
const Weapon = require("./Weapon.js");

/**
 * Represents the player.
 */
class Player {
    constructor(data){
        if(data) this.setup(data);
    }
    setup(data){
        /**
         * The steamID of the player
         * @type {string}
         */
        this.steamId = data.steamid;
        /**
         * The clan name of the player
         * @type {string}
         */
        this.clan = data.clan;
        /**
         * The Steam profile name of the player
         * @type {string}
         */
        this.name = data.name;
        this.observerSlot = data.observer_slot;
        /**
         * The team of the player. Either "T" or "CT"
         * @type {string}
         */
        this.team = data.team;
        /**
         * What the player is doing (currently known values: 'menus', 'playing')
         * @type {string}
         */
        this.activity = data.activity;
        /**
         * The current state object of the player
         * @type {PlayerState}
         */
        this.state = new PlayerState(data.state);
        /**
         * @type {Array.<Weapon>}
         */
        this.weapons = new Array();
        /**
         * Ex. ["weapon_0","weapon_1"]. Planned for removal
         * @type {Array.<string>}
         */
        this.weaponIds = new Array();
        /**
         * The weapon that the player is currently holding or reloading
         * @type {Weapon}
         */
        this.activeWeapon;
        for(var weapon in data.weapons){
            this.weapons.push(new Weapon(data.weapons[weapon]));
            this.weaponIds.push(weapon)
            if(data.weapons[weapon].state==="active" || data.weapons[weapon].state==="reloading"){
                this.activeWeapon=this.weapons[this.weapons.length-1];
            }
        }
        /**
         * kills, assists, deaths, mvps, score
         * @type {Object<string,number>}
         */
        this.matchStats=data.match_stats;
        /**
         * Whether or not the player is alive
         * @type {boolean}
         */
        this.state.isAlive;
    }
}

module.exports = Player;