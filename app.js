var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var server = require('http').createServer(app);
var moment = require('moment');

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var redis = require('redis');

var sheets = google.sheets('v4');
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
	process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-arrduino.json';
var auth;
// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
	if (err) {
		console.log('Error loading client secret file: ' + err);
		return;
	}
	// Authorize a client with the loaded credentials, then call the
	// Google Sheets API.
	authorize(JSON.parse(content), function (response) {
		auth = response;
	});
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
	var clientSecret = credentials.installed.client_secret;
	var clientId = credentials.installed.client_id;
	var redirectUrl = credentials.installed.redirect_uris[0];
	var auth = new googleAuth();
	var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, function (err, token) {
		if (err) {
			getNewToken(oauth2Client, callback);
		} else {
			oauth2Client.credentials = JSON.parse(token);
			callback(oauth2Client);
		}
	});
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
	var authUrl = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES
	});
	console.log('Authorize this app by visiting this url: ', authUrl);
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.question('Enter the code from that page here: ', function (code) {
		rl.close();
		oauth2Client.getToken(code, function (err, token) {
			if (err) {
				console.log('Error while trying to retrieve access token', err);
				return;
			}
			oauth2Client.credentials = token;
			storeToken(token);
			callback(oauth2Client);
		});
	});
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
	try {
		fs.mkdirSync(TOKEN_DIR);
	} catch (err) {
		if (err.code != 'EEXIST') {
			throw err;
		}
	}
	fs.writeFile(TOKEN_PATH, JSON.stringify(token));
	console.log('Token stored to ' + TOKEN_PATH);
}

function writeToGoogle(auth, spreadsheetId, body, time) {
	sheets.spreadsheets.values.append({
		auth: auth,
		spreadsheetId: spreadsheetId,
		range: 'A2:F',
		valueInputOption: "USER_ENTERED",
		resource: {
			majorDimension: "ROWS",
			values: [
				[time, body.temperature, body.humidity, body.heatIndex, body.voltage, body.mac]
			]
		}
	}, function (err, resp) {
		console.log('append: ', err, resp);
	});
	sheets.spreadsheets.values.update({
		auth: auth,
		spreadsheetId: spreadsheetId,
		range: 'G1:G2',
		valueInputOption: "USER_ENTERED",
		resource: {
			majorDimension: "ROWS",
			values: [
				[time],
				[body.temperature]
			]
		}
	}, function (err, resp) {
		console.log('update: ', err, resp);
	});
}

function getSpreadsheets(mac, callback) {
	var client = redis.createClient();
	client.hgetall('dummyhome:sensors:' + mac + ':temperature', function (err, object) {
		sheets.spreadsheets.get({
			auth: auth,
			spreadsheetId: object.spreadsheetId
		}, function (err, response) {
			if (err) {
				var request = {
					auth: auth,
					resource: {
						properties: {
							title: mac
						},
						sheets: [
							{
								properties: {
									title: 'Data',
									gridProperties: {
										columnCount: 7
									}
								}
							}
						]
					}
				};
				sheets.spreadsheets.create(request, function (err, spreadsheet) {
					client.quit();
					if (err) {
						callback(err)

					}
					console.log('new one')
					callback(null, spreadsheet.spreadsheetId)
				});
			}
			else {
				console.log('exists')
				callback(null, object.spreadsheetId)
			}
		})

	});
}

app.use(require('express-domain-middleware'));
app.use(bodyParser.urlencoded({extended: true, parameterLimit: 5000}));
app.use(bodyParser.json({limit: '5mb'}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());

var router = require('express').Router();

router.get('/power', function (req, res) {
	console.log('Recived');
	res.send("response:ON");
});
router.post('/power', function (req, res) {
	console.log('Recived');
	res.send({"led": 1});
});

app.post('/meteo', function (req, res) {
	var client = redis.createClient();
	var body = req.body;
	getSpreadsheets(req.body.mac || "undefined", function (err, id) {
		client.hmset(["dummyhome:sensors:" + body.mac + ":temperature", "spreadsheetId", id, "temp", body.temperature.toString(), "datetime", moment().toString()], function (err, res) {
			console.log('set reddis')
			writeToGoogle(auth, id, body, moment().format('DD.MM.YYYY HH:mm:ss'));
		});
		client.quit();
	});


});

app.get('/stats', function (req, res) {
	var client = redis.createClient();
	client.hgetall('dummyhome:sensors:1:temperature', function (err, object) {
		res.send(object);
		client.quit();
	});
})

app.use("/api", router);

server.listen(3000, function () {
	// console.log('Example app listening on port 3000!');
});

