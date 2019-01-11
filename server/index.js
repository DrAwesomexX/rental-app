const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev.js');
const Rental = require('./models/rental');
const Fakedb = require('./fake-db');
const rentalRoutes = require('./routes/rentals');

mongoose.connect(config.DB_URI).then(() => {
  const fakedb = new Fakedb();
  fakedb.seedDb();
});

const app = express();

app.use('/api/v1/rentals', rentalRoutes);

const PORT = process.env.PORT || 3001;

// app.get('/rentals', (req, res) => {
//   res.json({
//     success: true
//   });
// });
app.listen(PORT, () => {
  console.log(`I am running on ${PORT}`);
});
