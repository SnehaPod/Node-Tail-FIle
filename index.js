const app = require("express")();
const fs = require("fs");
const ejs = require("ejs");
const http = require("http");

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    
    res.render('index');
});

app.post('/read-file', function(req, res) {
    console.log('API hit');
    let noOfLines = req.body ? req.body.noOfLines: 10;
    let fileContents = [];
    let data = fs.readFileSync("./test.txt", 'utf8');

    let lines = data.split(/\r?\n/);
    if (lines.length > 0) {
        for (var l = lines.length - 1; l >= lines.length - noOfLines; l--) {
            fileContents.push(lines[l]);
        }
    }

    res.render("fileContent", {
        fileContents: fileContents
    })
})


fs.watchFile("./test.txt", (err, result) => {
    let options = {};
    options.path = "/";
    options.port = 8080;
    http.request(options, (err, response, body) => {
        console.log('body', body);
    })
})

app.listen(8080, () => {
    console.log("The magic happens on port 8080");
})