const mongoose = require('mongoose');
const URI = 'mongodb+srv://deepFSD:Ronaldo%402002@cluster0.9bgfcuv.mongodb.net/KumarTiffin?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log('Connected to MongoDB');

        fetchData();
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
    }
};

async function fetchData() {
    try {
        const food_item = mongoose.connection.db.collection("food_items");
        const food_cat = mongoose.connection.db.collection("food_category");
    
        global.food_items = await food_item.find({}).toArray();
        global.food_category = await food_cat.find({}).toArray();
        
        console.log();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

module.exports = mongoDB;