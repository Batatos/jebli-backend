const router = require('express').Router();
const verify = require('./verifyToken');
const { createStoreValidation } = require('./validation/storeValidation');
const Store = require('../model/store.model');
const Menu = require('../model/menu.model');

router.get('/stores', async (req,res) => {

    Store.find()
    .then(stores => res.json(stores))
    .catch(err => res.status(400).json('Error: '+err));
});

router.post('/store', verify, async (req, res) => {

    const { error } = createStoreValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if store exists
    const storeExist = await Store.findOne({email: req.body.name});
    if (storeExist) return res.status(400).send("Store Already exists . .");

    //create store
    const store = new Store({
        name: req.body.name,
        description: req.body.description,
        working_hours: req.body.working_hours,
        working_days: req.body.working_days
    });
    try {
        const savedStore = await store.save();
        res.send(savedStore);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/store/:id', verify, async (req, res) => {
    Store.findById(req.params.id)
    .then(store => res.json(store))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.delete('/store/:id', verify, async (req, res) => {
    Store.findByIdAndDelete(req.params.id)
    .then(() => res.json('Store is deleted'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.post('/store/:id/update', verify, async (req, res) => {
    Store.findById(req.params.id)
    .then( store => {
        store.name = req.body.name;
        store.description = req.body.description;
        store.working_hours = req.body.working_hours;
        store.working_days = req.body.working_days;

        store.save()
            .then(() => res.json('Store updated.'))
            .catch(err => res.status(400).json('Error: '+ err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
});

router.post('/store/:storeId/assignMenu/:menuId', verify, async (req, res) => {
    const store = await Store.findById(req.params.storeId);
    const menuObj = await Menu.findById(req.params.menuId);

    console.log(menuObj);
    store.menu = menuObj;

    try{
        const savedStore = await store.save();
        res.send(savedStore);
       }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;