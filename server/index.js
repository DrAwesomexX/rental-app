const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev.js');
const Rental = require('./models/rental');
const Fakedb = require('./fake-db');
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bodyParser = require('body-parser');

mongoose.connect(config.DB_URI).then(() => {
  const fakedb = new Fakedb();
  fakedb.seedDb();
});

const app = express();
app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 3001;

// app.get('/rentals', (req, res) => {
//   res.json({
//     success: true
//   });
// });
app.listen(PORT, () => {
  console.log(`I am running on ${PORT}`);
});
