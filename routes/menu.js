const router = require('express').Router();
const verify = require('./verifyToken');
//const { createMenuValidation } = require('./validation/menuValidation');
const Menu = require('../model/menu.model');

router.get('/menu', async (req,res) => {

    Menu.find()
    .then(menus => res.json(menus))
    .catch(err => res.status(400).json('Error: '+err));
});

router.post('/menu', verify, async (req, res) => {

    // const { error } = createStoreValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    // // check if store exists
    // const storeExist = await Store.findOne({email: req.body.name});
    // if (storeExist) return res.status(400).send("Store Already exists . .");

    //create store
    const menu = new Menu(req.body);
    try {
        const savedMenu = await menu.save();
        res.send(savedMenu);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;