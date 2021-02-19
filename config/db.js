const mongoose = require('mongoose');
const config = require('config');
console.log('config ', config)
const db = config.get('mongoURI');
console.log('DB VAR ', db)

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
            console.log('MongoDB is now connected....');
    } catch(err) {
        console.error(err.message);
        //exit the process with failure
        process.exit(1);
    }
}

module.exports = connectDB;