http = require('http');
const EventEmitter = require('events');
const handler = require("../handler.js")
var server;

/**
 * The main Class.
 * @extends {EventEmitter}
 * @constructor
 * @param {boolean} includeSpectator Whether or not to call events for players while spectating.
 */
class Client extends EventEmitter {
	constructor(includeSpectator) {
		super();
		var self=this;
		function dataHandler(data){
			handler(data,self)
		}
		/**
		 * Creates a listening server on the port and hostname provided.
		 * @param {Object} settings
		 * @param {string} settings.hostname The hostname to listen on
		 * @param {number} settings.port The port to listen on
		 */
		this.listen=function(settings={}) {
			server = http.createServer( function(req, res) {
				if (req.method == 'POST') {
					res.writeHead(200, {'Content-Type': 'text/html'});
					req.on('data', dataHandler)
				}else{
					res.writeHead(200, {'Content-Type': 'text/html'});
					var html = '<html><body>HTTP Server at http://' + host + ':' + port + '</body></html>';
					res.end(html);
				}
			})
			server.listen(settings.port, settings.host || "127.0.0.1",this.emit("listening"))
		}
		/**
		 * Closes the server.
		 */
		this.stop=function(){
			server.close();
		}
		/**
		 * The current player
		 * @type {Player}
		 */
		this.player;
		/**
		 * The current match
		 * @type {Match}
		 */
		this.match;
		/**
		 * Provider data
		 * @type {Provider}
		 */
		this.provider;
		/**
		 * Whether or not spectators are being included. Set in the constructor.
		 * @type {boolean}
		 */
		this.includeSpectator=(includeSpectator || false)
	}
}
module.exports=Client;