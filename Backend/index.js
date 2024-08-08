const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const locationRoutes = require('./routes/location');
const uploadRoutes = require('./routes/upload');

app.use(bodyParser.json());
app.use(cors());



app.use('/api/locations', locationRoutes);
app.use('/api/upload', uploadRoutes);



const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});