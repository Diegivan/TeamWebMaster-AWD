const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://diegivan:Melina2510@clusteraws.h1jhy.mongodb.net/FastSplash?retryWrites=true&w=majority',{
    
})
 .then(db => console.log('Siuuuu'))
 .catch(err => console.error(err));