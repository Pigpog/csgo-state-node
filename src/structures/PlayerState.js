/**
 * Player state information
 */
class PlayerState {
    constructor(data){
        if(data) this.setup(data);
    }
    setup(data){
        /**
         * The current health of the player
         * @type {?number}
         */
        this.health = data.health;
        /**
         * The current armour of the player
         * @type {?number}
         */
        this.armor = data.armor;
        /**
         * Whether or not the player has a helmet
         * @type {?boolean}
         */
        this.helmet = data.helmet;
        /**
         * How flashed the player is. Max: 255
         * @type {?number}
         */
        this.flashed = data.flashed;
        /**
         * How smoked the player is.
         * @type {?number}
         */
        this.smoked = data.smoked;
        /**
         * How much the player is burning (??)
         * @type {?number}
         */
        this.burning = data.burning;
        /**
         * How much money the player has
         * @type {?number}
         */
        this.money = data.money;
        /**
         * How many kills the player has gotten this round
         * @type {?number}
         */
        this.roundKills = data.round_kills;
        /**
         * How many headshot kills the player has gotten this round
         * @type {?number}
         */
        this.roundKillHs = data.round_killhs;
        /**
         * The combined dollar value of the player's equipment
         * @type {?number}
         */
        this.equipValue = data.equip_value;
    }
}
module.exports = PlayerState;