/**
 * Provider data such as Steam ID
 */
class Provider {
    constructor(data){
        if(data) this.setup(data);
    }
    setup(data){
        /**
         * The name of the game, in case you forget
         * @type {string}
         */
        this.name = String(data.name);
        /**
         * The app ID of the game
         * @type {number}
         */
        this.appId = data.appid
        /**
         * The version number of the game
         * @type {numer}
         */
        this.version = data.version;
        /**
         * The Steam ID of the logged-in user
         * @type {string}
         */
        this.steamId = data.steamid;
        /**
         * The timestamp of when the data was recieved I guess
         * @type {number}
         */
        this.timestamp = data.timestamp;
    }
}
module.exports = Provider;