const Player = require("./structures/Player.js");
const Match = require("./structures/Match.js");
const Provider = require("./structures/Provider.js");

module.exports = function(body,client){
    var data=JSON.parse(body)
    if(data.provider){
        client.provider=new Provider(data.provider);
    }else{
        client.provider=new Provider();
    }
    if(client.player){
        if(data.player){
            var oldPlayer = client.player;
            client.player = new Player(data.player);
            client.player.state.isAlive = (client.player.steamId === client.provider.steamId && client.player.state.health>0) || client.includeSpectator
            if(client.player.state.isAlive!==oldPlayer.state.isAlive){
                if(client.player.state.isAlive){
                    client.emit("spawn")
                }else{
                    client.emit("death")
                }
            }
            if(client.player.state && client.player.state.isAlive && oldPlayer){
                if(client.player.matchStats.kills>oldPlayer.matchStats.kills){
                    client.emit('kill',client.player.matchStats, oldPlayer.matchStats)
                }else if(client.player.matchStats.kills<oldPlayer.matchStats.kills){
                    if(client.player.matchStats.deaths>oldPlayer.matchStats.deaths){
                        client.emit('suicide')
                    }
                }
                if(client.player.matchStats.assists>oldPlayer.matchStats.assists){
                    client.emit('assist',client.player.matchStats, oldPlayer.matchStats)
                }
                if(client.player.matchStats.mvps>oldPlayer.matchStats.mvps){
                    client.emit('mvp',client.player.matchStats, oldPlayer.matchStats)
                }
                if(client.player.state.health !== oldPlayer.state.health){
                    client.emit('healthChange', client.player, oldPlayer)
                }
                if(client.player.state.armor !== oldPlayer.state.armor){
                    client.emit('armorChange', client.player.state.armor, oldPlayer.state.armor)
                }
                if(client.player.state.money !== oldPlayer.state.money){
                    client.emit('moneyChange', client.player.state.money, oldPlayer.state.money)
                }
                if(oldPlayer.weapons!==client.player.weapons){
                    client.emit('weaponChange', client.player.weapons, oldPlayer.weapons)
                    if(client.player.weapons){
                        for(var i = 0; i < client.player.weapons.length; i++){
                            if(oldPlayer.weapons[i]){
                                if(client.player.weapons[i].state === "active"){
                                    if(oldPlayer.weapons[i].state !== "active"){
                                        for(var j = 0; j < oldPlayer.weapons.length; j++){
                                            if(oldPlayer.weapons[j].isActive){
                                                client.emit('switchWeapon', client.player.weapons[i], oldPlayer.weapons[j]);
                                            }
                                        }
                                    }
                                    if(client.player.weapons[i].clip !== oldPlayer.weapons[i].clip){
                                        if(client.player.weapons[i].clip < oldPlayer.weapons[i].clip){
                                            client.emit('fire', client.player.weapons[i], oldPlayer.weapons[i]);
                                        }
                                    }
                                }
                                if(client.player.weapons[i].clip>oldPlayer.weapons[i].clip){
                                    client.emit('reload',client.player.weapons[i], oldPlayer.weapons[i])
                                }
                            }else{
                                client.emit('pickup', client.player.weapons[i])
                            }
                        }
                        if(oldPlayer.weapons.length > client.player.weapons.length && client.player.weapons.length>0){
                            for(var i = 0; i < oldPlayer.weapons.length; i++){
                                if(!client.player.weaponIds.includes(oldPlayer.weaponIds[i])){
                                    client.emit('drop',oldPlayer.weaponIds[i])
                                }
                            }
                        }
                    }
                }
            }
        }
    }else{
        if(data.player){
            client.player=new Player(data.player);
        }
    }

	if(data.round && data.map){
        if(client.match){
            var oldMatch = client.match;
            client.match = new Match({
                round:data.round,
                map:data.map
            });
            if(client.match.round.phase!==oldMatch.round.phase && client.match.round.phase==="over" && client.match.round.winTeam){
                var winningTeam;
                if(client.match.round.winTeam==="T"){
                    winningTeam=client.match.teamT
                }else{
                    winningTeam=client.match.teamCt
                }
                client.emit('roundEnd',winningTeam)
            }
            if(client.match.round.bomb!==oldMatch.round.bomb){
                if(client.match.round.bomb==="planted"){
                    client.emit('bombPlanted')
                }else if(client.match.round.bomb==="defused"){
                    client.emit("bombDefused")
                }else if(client.match.round.bomb==="exploded"){
                    client.emit("bombExploded")
                }
            }
            if(client.match.map.id!==oldMatch.map.id){
                client.emit('mapChange',client.match.map,oldMatch.map.id)
            }
        }else{
            client.match = new Match({
                round:data.round,
                map:data.map
            });
        }
    }
}