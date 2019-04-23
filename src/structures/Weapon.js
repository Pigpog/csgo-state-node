const weapons = require("../data/weapons.json");
const PaintKit = require("./PaintKit.js");

/**
 * Represents a weapon
 */
class Weapon {
    constructor(data){
        if(data) this.setup(data);
    }
    setup(data){
        /**
         * The technical name of the weapon
         * @type {string}
         */
        this.id = data.name;
        /**
         * The spray of the weapon
         * @type {PaintKit}
         */
        this.paintKit = new PaintKit(data.paintkit);
        /**
         * The type of weapon. Ex: "Knife", "Pistol", "C4"
         * @type {string}
         */
        this.type = data.type;
        /**
         * The remaining clip of the weapon
         * @type {number}
         */
        this.clip = data.ammo_clip;
        /**
         * The maximum value of the clip
         * @type {number}
         */
        this.clipMax = data.ammo_clip_max;
        /**
         * How many bullets are in the ammo reserve
         * @type {number}
         */
        this.ammoReserve = data.ammo_reserve;
        /**
         * The state of the weapon. Currently known values: "active", "reloading", "holstered"
         */
        this.state = data.state;
        /**
         * Whether or not the weapon is the active weapon
         * @type {boolean}
         */
        this.isActive = Boolean(data.state==="active");
        /**
         * Returns the English name of the weapon
         * @returns {string}
         */
        this.resolveName=function(){
            return weapons[this.id];
        }
    }
}
module.exports = Weapon;