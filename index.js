const app = require("express")();
const fs = require("fs");
const ejs = require("ejs");
const bodyParser = require("body-parser");

app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    let fileContents = [];

    res.render('index', {
        fileContents: fileContents
    });
});

app.get('/read-file', function (req, res) {
    readNLines(req).then(fileContents => {
        res.json({
            fileContents: fileContents
        })
    })

})

fs.watchFile("./test.txt", (err, result) => {
    readNLines(null).then(fileContents => {
        fileContents.forEach(element => {
            console.log(element);    
        });
    })
})

function readNLines(req) {
    return new Promise((resolve, reject) => {
        let noOfLines = (req && req.query && req.query.noOfLines) ? req.query.noOfLines : 10;
        let fileContents = [];
        let data = fs.readFileSync("./test.txt", 'utf8');

        let lines = data.split(/\r?\n/);
        if (lines.length > 0) {
            for (var l = lines.length - 1; l >= lines.length - noOfLines; l--) {
                if(lines[l]) {
                    fileContents.push(lines[l]);
                }
            }
            resolve(fileContents);
        }
    })
}

readNLines(null).then(fileContents => {
    fileContents.forEach(element => {
        console.log(element);    
    });
})

app.listen(8080, () => {
    console.log("The magic happens on port 8080");
})