const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlConsumer = require('../controllers/consumer.controller');
const ctrlFoodtruck = require('../controllers/foodtruck.controller');

const jwtHelper = require('../config/jwtHelper');

// CONSUMER ROUTES
router.post('/registerConsumer', ctrlUser.register, ctrlConsumer.register);
router.get('/consumerProfile', jwtHelper.verifyJwtToken, ctrlConsumer.consumerProfile);

// DISH ROUTES


// FAVORITES ROUTES


// FOODTRUCK ROUTES
router.post('/registerFoodtruck', ctrlUser.register, ctrlFoodtruck.register);
router.get('/allFoodtrucks', jwtHelper.verifyJwtToken, ctrlFoodtruck.allFoodtrucks);
router.get('/foodtruckProfile', jwtHelper.verifyJwtToken, ctrlFoodtruck.foodtruckProfile);
router.patch('/toggleFoodtruckOpen', jwtHelper.verifyJwtToken, ctrlFoodtruck.toggleFoodtruckOpen);
router.get('/foodtruckDetail', jwtHelper.verifyJwtToken, ctrlFoodtruck.getFoodtruckDetail);

// MENU ROUTES


// REVIEW ROUTES


// USER ROUTES
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;