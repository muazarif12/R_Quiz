// •	recipe table fields: name, description, ingredients (references ingredients table)

const mongoose = require('mongoose');

const recipesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description : {
        type: String,
        required: true,
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ingredient'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const recipes = mongoose.model('recipes', recipesSchema);

module.exports = recipes;
