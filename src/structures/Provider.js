class Provider {
    constructor(data){
        if(data) this.setup(data);
    }
    setup(data){
        this.name = String(data.name);
        this.appId = data.appid
        this.version = data.version;
        this.steamId = data.steamid;
        this.timestamp = data.timestamp;
    }
}
module.exports = Provider;