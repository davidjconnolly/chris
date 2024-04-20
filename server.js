// Require express and body-parser
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const secret = 'pizza';

// Initialize express and define a port
const app = express();
const PORT = process.env.PORT || 3000;

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json());

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Sandbox Runner
//
// curl -i --header "Content-Type: application/json" \
//   --request POST \
//   --data '{"secret": "pizza"}' \
//   http://localhost:3000/run
app.post('/run', async(req, res) => {
  try {
    if (req.body.secret === secret) {
      console.log('********');
      console.log(req.body.powerState);
      console.log('********');

      res.status(200).json('you are authenticated! + ' + req.body.powerState);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json(error).end();
  }
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
