const paintKits = require("../data/paintkits.json");

/**
 * PaintKit (spray)
 */
class PaintKit {
    constructor(data){
        if(data) this.setup(data);
    }
    setup(data){
        /**
         * The techincal name of the PaintKit
         * @type {string}
         */
        this.id = data;
        /**
         * Returns the English name of the PaintKit
         * @returns {string}
         */
        this.resolveName = function(){
            return paintKits[this.id.toLowerCase()+"_tag"];
        }
        /**
         * Returns the English description of the PaintKit
         * @returns {string}
         */
        this.resolveDesc = function(){
            return paintKits[this.id.toLowerCase()];
        }
    }
}
module.exports = PaintKit;