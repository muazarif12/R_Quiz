const admin = require("../models/admin");
const User = require("../models/user");
const recipes = require("../models/recipes");
const ingredient = require("../models/ingredients");


var express = require("express");
var router = express.Router();

router.use(async (req, res, next) => {
    if(req.user.role !== "admin") return res.json({ msg: "NOT ADMIN" })
    else next()
})


router.post("/addIngredient", async (req, res) => {
    try {
        const { name, description } = req.body;
        let iv = await ingredient.findOne({ name});
        if (iv) return res.json({ msg: "ingredient already exists" });
        await ingredient.create({ ...req.body });
        return res.json({ msg: "ingredient added" });
    } catch (error) {
        console.error(error);
    }
});

router.post("/addRecipe", async (req, res) => {
    try {
        const { name, description, ingredients } = req.body;
        let recipe = await recipes.findOne({ name });
        if (recipe) return res.json({ msg: "recipe already exists" });
        await recipes.create({ ...req.body });
        return res.json({ msg: "recipe added" });
    } catch (error) {
        console.error(error);
    }
});





module.exports = router;








