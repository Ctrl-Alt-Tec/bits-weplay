// Heroku App Backend using Node.js
var GoogleSpreadsheet = require('google-spreadsheet');
//var creds = require('./client_secret.json')

var bits_db = new GoogleSpreadsheet("1kALw2sXhQEohAyW_zL6TMpDLpbHbKvw58evZasUxpI8")


bits_db.useServiceAccountAuth(creds, function(err){

    bits_db.getRows(1, function(err, rows){
        console.log("hello", rows)
    })
})


