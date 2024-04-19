const admin = require("../models/admin");
const User = require("../models/user");
const recipes = require("../models/recipes");
const ingredient = require("../models/ingredients");


var express = require("express");
var router = express.Router();

router.use(async (req, res, next) => {
    if(req.user.role !== "user") return res.json({ msg: "NOT USER" })
    else next()
})




router.post("/getRecipe", async (req, res) => {
    try {
        const { name } = req.body;
        const recipe = await recipes.findOne({ name }).populate("ingredients");
        return res.json({ recipe });
    } catch (error) {
        console.error(error);
    }
});

router.get("/getAllRecipes", async (req, res) => {
    try {
        const recipe = await recipes.find().populate("ingredients");
        return res.json({ recipe });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;








