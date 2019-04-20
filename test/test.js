const Csgo = require("../index.js")
const client = new Csgo.Client()

client.once("listening",()=>{
	console.log("Bleastr")
})
client.listen({port:3000,host:"127.0.0.1"})

client.on("fire",(newWeapon, oldWeapon)=>{
	console.log("Fired "+(oldWeapon.clip-newWeapon.clip)+" times.")
})

client.on("reload",(newWeapon, oldWeapon)=>{
	console.log("Reloaded")
})

client.on("newData",()=>{
	//console.log("new data")
})

client.on("healthChange",(newPlayer,oldPlayer)=>{
	if(client.player.state.isAlive){
		console.log("Got lit "+(oldPlayer.state.health-newPlayer.state.health))
	}
})

client.on('bombPlanted',()=>{
	if(client.player.team==="T"){
		console.log("The bomb has been planted. Good job.")
	}else{
		console.log("The bomb has been planted! Defuse it!")
	}
})

client.on('bombExploded',()=>{
	console.log("KABOOM")
})

client.on("death",(newPlayer,oldPlayer)=>{
	console.log("Died")
})

client.on("spawn",()=>{
	console.log("Spawned")
})

client.on('kill',(matchStats)=>{
	console.log("Got a kill")
})

client.on('assist',(matchStats)=>{
	console.log("Got an assist")
})

client.on('mvp',(matchStats)=>{
	console.log("Got MVP")
})

client.on("pickup",(weapon)=>{
	console.log("Picked up "+weapon.resolveName())
})
client.on("drop",(weapon)=>{
	console.log("Dropped "+weapon)
})

client.on("roundEnd",(winningTeam)=>{
	console.log(winningTeam.name+" won the round")
})

client.on("switchWeapon",(newWeapon,oldWeapon)=>{
	console.log("Switched to "+newWeapon.resolveName()+" from "+oldWeapon.resolveName())
})