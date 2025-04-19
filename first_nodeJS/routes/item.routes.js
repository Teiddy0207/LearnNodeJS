const express = require('express');
const router = express.Router();
const {showLogin, handelLogin, getWelcome , logout } = require('../controllers/item.controller')
const carController = require('../controllers/carController');
const { authenticateJWT } = require('../middleware/authMiddleware');
const { authorizePermission } = require('../middleware/permissionMiddleware');
const checkPermission = require('../middleware/checkPermission');

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


router.get('/car-management',  carController.index);  
router.get('/api/get-cars' ,checkPermission('view_car'), carController.getCar); 
router.post('/api/insert-car', checkPermission('add_car'), carController.insertCar);  

router.put('/api/update-car/:id', checkPermission('edit_car'), carController.updateCar);  
router.delete('/api/delete-car/:id', checkPermission('delete_car'), carController.deleteCar);


module.exports = router;
