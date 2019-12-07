const mongoose = require('mongoose');

module.exports.connectDB = function(){
    var mongoDBServer = "mongodb+srv://root:root@grubhubparent-cy2ev.mongodb.net/test?retryWrites=true&w=majority";
    mongoose.connect(mongoDBServer, { useNewUrlParser: true , useUnifiedTopology: true })
    .then(data => console.log("DB connection successful!!!"))
    .catch(error => console.log(error));
    mongoose.connection.on('error', err => {
        console.log("========== MONGO DB ERROR ========");
        console.log(err)
    });

}