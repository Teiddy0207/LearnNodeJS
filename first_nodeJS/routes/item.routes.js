const express = require('express');
const router = express.Router();
const {showLogin, handelLogin, getWelcome , logout } = require('../controllers/item.controller')
const carController = require('../controllers/carController');

//auth
router.get('/login', showLogin);
router.post('/login', handelLogin);
router.get('/welcome', getWelcome);
router.get('/', (req, res) => {
    res.redirect('/login'); 
});
router.post('/logout', (req, res) => {
    req.session.destroy(err => {

        res.json({ redirect: '/login' });
    });
});


router.get('/car-management', carController.index);
router.get('/api/get-cars', carController.getCar);
router.post('/api/insert-car', carController.insertCar);
router.delete('/api/delete-car/:id', carController.deleteCar);
router.put('/api/update-car/:id', carController.updateCar);



module.exports = router;
