const router = require('express').Router();
const verify = require('./verifyToken');
const { storeValidation } = require('./validation/storeValidation');
let Store = require('../model/store.model');

router.get('/stores', verify, async (req,res) => {

    Store.find()
    .then(users => res.json(stores))
    .catch(err => res.status(400).json('Error: '+err));
});

router.post('/store', verify, async (req, res) => {

    const { error } = storeValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if store exists
    const storeExist = await Store.findOne({email: req.body.name});
    if (storeExist) return res.status(400).send("Store Already exists . .");

    //create user
    const user = new User({
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

module.exports = router;