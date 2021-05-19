
'use strict';
const express = require('express');
const clothesModel = require('../models/clothes.js');
const DataManager = require('../models/data-collection-class.js');
const dataManager = new DataManager(clothesModel);
const router = express.Router();

router.get('/', getClothes);
router.get('/:id', getClothesByID);
router.post('/', createClothes);
router.put('/:id', updateClothes);
router.delete('/:id', deleteClothes);

async function deleteClothes(req, res, next) {
  try {
    const resObj = await dataManager.delete(req.params.id);
    res.json(resObj);
  } catch (error) {
    next(error);
  }
}

async function updateClothes(req, res, next) {
  try {
    const dataManagerObj = req.body;
    const resObj = await dataManager.update(req.params.id, dataManagerObj);
    res.json(resObj);
  } catch (error) {
    next(error);
  }
}

async function createClothes(req, res, next) {
  try {
    const dataManagerObj = req.body;
    const resObj = await dataManager.create(dataManagerObj);
    res.status(201).json(resObj);
  } catch (error) {
    next(error);
  }
}

async function getClothes(req, res,next) {
  try {
    const resObj = await dataManager.read();
    res.json(resObj);
  } catch (error) {
    next(error);
  }
 
}

async function getClothesByID(req, res, next) {
  try {
    const resObj =await  dataManager.read(req.params.id);
    res.json(resObj);
  } catch (error) {
    next(error);
  }
}

module.exports = router;


