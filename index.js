//TODO: Use dotenv for api route
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require("./sqlQueries");

const port = 3000;

const api_route = '';

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
})

app.get(`/${api_route}`, db.getRequest);
app.post(`/${api_route}`, db.postRequest);
app.put(`/${api_route}`, db.putRequest)
app.delete(`/${api_route}`, db.deleteRequest);

app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
});