const router = require('express').Router();
const verify = require('./verifyToken');
// const { createMenuItemValidation } = require('./validation/menuItemValidation');
const MenuItem = require('../model/menuItem.model');

router.get('/menus', async (req,res) => {

    MenuItem.find()
    .then(menuItems => res.json(menuItems))
    .catch(err => res.status(400).json('Error: '+err));
});

router.post('/menu/:menuId/items', verify, async (req, res) => {

    // const { error } = createMenuItemValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    // check if store exists
    // const storeExist = await Store.findOne({email: req.body.name});
    // if (storeExist) return res.status(400).send("Store Already exists . .");

    //create store
    const menuItem = new MenuItem(req.body);
    try {
        const savedMenuItem = await menuItem.save();
        res.send(savedMenuItem);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;