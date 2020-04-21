const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var items = [];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('lists', { listTitle: thisDay, nextItem: items });
});

app.post('/', function (req, res) {
  let item = req.body.newItem;

  if (req.body.list === 'Work List') {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }
});

app.get('/work', function (req, res) {
  res.render('lists', { listTitle: 'Work List', nextItem: workItems });
});

app.post('/work', function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect('/work');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.listen(3000, function () {
  console.log('server is running on port 3000');
});
