const weapons = require("../data/weapons.json");
const PaintKit = require("./PaintKit.js");
class Weapon {
    constructor(data){
        if(data) this.setup(data);
    }
    setup(data){
        this.id = String(data.name);
        this.paintKit = new PaintKit(data.paintkit);
        this.type = data.type;
        this.clip = data.ammo_clip;
        this.clipMax = data.ammo_clip_max;
        this.ammoReserve = data.ammo_reserve;
        this.state = data.state;
        this.isActive = Boolean(data.state==="active");
        this.resolveName=function(){
            return weapons[this.id];
        }
    }
}
module.exports = Weapon;