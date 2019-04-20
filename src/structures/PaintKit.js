const paintKits = require("../data/paintkits.json");

class PaintKit {
    constructor(data){
        if(data) this.setup(data);
    }
    setup(data){
        this.id = data;
        this.resolveName = function(){
            return paintKits[this.id.toLowerCase()+"_tag"];
        }
        this.resolveDesc = function(){
            return paintKits[this.id.toLowerCase()];
        }
    }
}
module.exports = PaintKit;