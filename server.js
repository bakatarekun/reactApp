const express = require('express');

const app = express();

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
const port =  process.env.POR || 5000;


app.listen(port, () => console.log(`Server started on port ${port}`));

