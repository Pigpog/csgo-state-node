class PlayerState {
    constructor(data){
        if(data) this.setup(data);
    }
    setup(data){
        this.health = data.health;
        this.armor = data.armor;
        this.helmet = data.helmet;
        this.flashed = data.flashed;
        this.smoked = data.smoked;
        this.burning = data.burning;
        this.money = data.money;
        this.roundKills = data.round_kills;
        this.roundKillHs = data.round_killhs;
        this.equipValue = data.equip_value;
    }
}
module.exports = PlayerState;