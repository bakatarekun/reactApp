const express = require('express');
require('dotenv').config({ path: '.env' });
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');
const Datastore = require('nedb');

const app = express();
const db = new Datastore();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,

  useTLS: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  db.find({}, (err, data) => {
    if (err) return res.status(500).send(err);

    res.json(data);
  });
});

app.post('/comment', (req, res) => {
  db.insert(Object.assign({}, req.body), (err, newComment) => {
    if (err) {
      // return res.status(500).send(err);
      return res.status(500).send("Erro is thrown");
    }

    pusher.trigger('comments', 'new-comment', {
      comment: newComment,
    });

    res.status(200).send('OK');
  });
});

app.post('/reset-vote', (req, res) => {
  const { id, vote } = req.body;
  db.findOne({ _id: id }, function (err, doc) {
    if (err) {
      return res.status(500).send(err);
    }

    db.update({ _id: id }, { $set: { votes: 0} }, { returnUpdatedDocs: true }, (err, num, updatedDoc) => {
      if (err) return res.status(500).send(err);

      pusher.trigger('comments', 'reset-vote', {
        doc: updatedDoc,
      });
    });
  });
});

app.post('/remove-comment', (req, res) => {
  const { text,id } = req.body;

 
  db.remove({ _id: id }, {returnUpdatedDocs: true }, (err,updatedDoc) => {
    if (err) return res.status(500).send(err);

    pusher.trigger('comments', 'remove-comment', {
      doc: updatedDoc,
      text:text,
      id:id
    });
  });
  res.status(200).send('OK');
});


app.post('/vote', (req, res) => {
  const { id, vote } = req.body;
  db.findOne({ _id: id }, function (err, doc) {
    if (err) {
      return res.status(500).send(err);
    }

    db.update({ _id: id }, { $set: { votes: doc.votes + vote } }, { returnUpdatedDocs: true }, (err, num, updatedDoc) => {
      if (err) return res.status(500).send(err);

      pusher.trigger('comments', 'new-vote', {
        doc: updatedDoc,
      });
    });
  });
});

//comments
/*app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});*/

app.get('/api/customers', (req, res) => {
  const customers = [
      {id: 1, firstName: 'John', lastName: 'Doe'},
      {id: 2, firstName: 'John2', lastName: 'Doe2'},
      {id: 3, firstName: 'John3', lastName: 'Doe3'},
  ];

  res.json(customers);
});

if(process.env.NODE_ENV === "production")
{
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {

  rest.sendFile(path.resolove(__dirname, "client", "build", "index.html"))
 })
}
const port =  process.env.PORT || 5000;


app.listen(port, () => console.log(`Server started on port ${port}`));

