http = require('http');
const EventEmitter = require('events');
const handler = require("../handler.js")
var server;

class Client extends EventEmitter {
	constructor(includeSpectator) {
		super();
		var self=this;
		function dataHandler(data){
			handler(data,self)
		}
		this.listen=function(settings={}) {
			server = http.createServer( function(req, res) {
				if (req.method == 'POST') {
					//console.log("Handling POST request...");
					res.writeHead(200, {'Content-Type': 'text/html'});
					req.on('data', dataHandler)
				}else{
					//console.log("Not expecting other request types...");
					res.writeHead(200, {'Content-Type': 'text/html'});
					var html = '<html><body>HTTP Server at http://' + host + ':' + port + '</body></html>';
					res.end(html);
				}
			})
			server.listen(settings.port, settings.host || "127.0.0.1",this.emit("listening"))
		}
		this.stop=function(){
			server.close();
		}
		this.player;
		this.match;
		this.provider;
		this.includeSpectator=(includeSpectator || false)
	}
}
module.exports=Client;