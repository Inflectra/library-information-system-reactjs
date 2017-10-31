var express = require("express"),
    http = require("http"),
    https = require("https"),
    path = require('path');

var app = express(),
    _pathClient = path.join(__dirname, '../client/public');

app.set('port', (process.env.PORT || 5000));

// Serve static assets first
app.use(express.static(_pathClient));


// all pages go to index to let react router work
app.get("*", function(request, response, next) {
  response.sendFile("index.html", { root: _pathClient });
});


//Create server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'), ':-)');
});
