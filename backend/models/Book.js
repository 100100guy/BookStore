const mongoose = require('mongoose');
//Define the book schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author : {
        type: String,
        required: true,
    },
    category : {
        type: String,
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
}, {
    timestamps: true,
});

//Create a model from the schema
const Book = mongoose.model('Book', bookSchema);
//Export the model
module.exports = Book;
