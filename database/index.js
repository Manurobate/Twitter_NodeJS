const mongoose = require('mongoose');

mongoose
    .connect('mongodb://manu_twitter:azerty@192.168.1.100:27017/twitter')
    .then(() => { console.log('Connected to MongoDB'); })
    .catch((error) => { console.error(error); });