let express = require('express');
let bodyParser = require('body-parser');
let request = require('request');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.render('index', {
        weather: null,
        error: null,
        city: null,
    })
})

app.post('/', (req, res) => {
    let city = req.body.city;
    let key = '2adb16f8d4a10381b73ceb63de41f402';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

    request(url, (err, response, body) => {

        if (err) {
            res.render('index', {
                weather: null,
                error: 'There was an error'
            })
        } else {
            let json = JSON.parse(body);

            if (json.main === undefined) {
                res.render('index', {
                    weather: null,
                    error: json.message
                })
            } else {
                res.render('index', {
                    weather: json.main,
                    error: null,
                    city: city
                })
            }
        }

    })
})

app.listen(PORT, () => {
    console.log('server running!!')
})