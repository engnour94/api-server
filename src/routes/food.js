'use strict';
const express = require('express');
const foodModel = require('../models/food.js');
const DataManager = require('../models/data-collection-class.js');
const dataManager = new DataManager(foodModel);
const router = express.Router();

router.get('/', getFood);
router.get('/:id', getFoodWithId);
router.post('/', createFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

// controller
async function deleteFood(req, res, next) {
  try {
    const resObj = await dataManager.delete(req.params.id);
    res.json(resObj);
  } catch (error) {
    next(error);
  }
}

async function updateFood(req, res, next ) {
  try {
    const foodObj = req.body;
    const resObj = await dataManager.update(req.params.id,foodObj);
    res.json(resObj);
  } catch (error) {
    next(error);
  }
}

async function createFood(req, res, next) {
  try {
    const foodObj = req.body;
    const resObj = await dataManager.create(foodObj);
    res.status(201).json(resObj);
  } catch (error) {
    next(error);
  }
}

async function getFood(req, res, next) {
  try {
    const resObj = await dataManager.read();
    res.json(resObj);
  } catch (error) {
    next(error);
  }
}

async function getFoodWithId(req, res, next) {
  try {
    const resObj = await dataManager.read(req.params.id);
    res.json(resObj);
  } catch (error) {
    next(error);
  }
}

module.exports = router;






