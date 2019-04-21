const Csgo = require("../index.js")
const client = new Csgo.Client()

client.once("listening",()=>{
	console.log("Started Listening")
})
client.listen({port:3000,host:"127.0.0.1"})

client.on("fire",(newWeapon, oldWeapon)=>{
	console.log("Fired "+(oldWeapon.clip-newWeapon.clip)+" times.")
})

client.on("reload",(newWeapon, oldWeapon)=>{
	console.log("Reloaded "+newWeapon.resolveName())
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

client.on('kill',(newPlayer,oldPlayer)=>{
	console.log("Got a kill using "+newPlayer.activeWeapon.resolveName())
})

client.on('headshot',(newPlayer,oldPlayer)=>{
	console.log("Got a headshot using "+newPlayer.activeWeapon.resolveName())
})

client.on('headshotKill',(newPlayer,oldPlayer)=>{
	console.log("Killed with a headshot using "+newPlayer.activeWeapon.resolveName())
})

client.on('assist',(newPlayer,oldPlayer)=>{
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