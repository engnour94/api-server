'use strict';

const server = require('../src/server.js');
require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server.app);

describe('server', () => {
  it('should get 404 status', async () => {
    const response = await request.get('/jhu');
    expect(response.status).toBe(404);
  });

  it('should get a welcome message', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('welcome to server.js');
  });

  it('wrong method', async () => {
    const response = await request.delete('/api/v1/clothes');
    expect(response.status).toEqual(404);
  });
 
  it('should get an error', async () => {
    const response = await request.get('/bad');
    expect(response.status).toEqual(500);
  });

});

let idf;
let food;
let idc;
describe('food routes', () => {
  //////////////////////////////Food Test////////////////////////////////
  it('should create a new Food using post request', async () => {
    //arrange
    food = {
      name: 'banana',
      color: 'yellow',
    };
    //act
    const response = await request.post('/api/v1/food').send(food);
    //assert
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('banana');
    expect(response.body.color).toEqual('yellow');
    expect(response.body._id.length).toBeGreaterThan(0);
    
    idf = response.body._id;
  });
  
  it('get all food on GET /api/v1/food', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);

  });
  it('get a food on Get /api/v1/food/:id', async () => {
    food = {
      name: 'banana',
      color: 'yellow',
    };
    const res = await request.get(`/api/v1/food/${idf}`);
    expect(res.status).toEqual(200);
    expect(res.body[0].name).toEqual('banana');
   
    
  });
  it('should update a food using put request', async () => {
    //arrange
    let editFood = {
      name: 'orange',
      color: 'orange',
    };
    //act
    const response = await request.put(`/api/v1/food/${idf}`)
      .send(editFood);
    //assert
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('orange');
    expect(response.body.color).toEqual('orange');
    expect(response.body._id).toEqual(`${idf}`);
  });
  it('should be able to delete data on DELETE /api/v1/food/id', async () => {
    const response = await request.delete(`/api/v1/food/${idf}`);
    expect(response.status).toEqual(200);
    expect(response.body._id).toEqual(`${idf}`);
  });

  ////////////////////////////clothes Test/////////////////////////////
  it('should create a new clothes using post request', async () => {
    //arrange
    let clothes = {
      type: 'skirt',
      price: '20$',
    };
      //act
    const response = await request.post('/api/v1/clothes').send(clothes);
    //assert
    expect(response.status).toEqual(201);
    expect(response.body.type).toEqual('skirt');
    expect(response.body.price).toEqual('20$');
    expect(response.body._id.length).toBeGreaterThan(0);
      
    idc = response.body._id;
  });
  it('get all clothes on GET /api/v1/clothes', async () => {
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
  });
  it('get a clothes on Get /api/v1/clothes/:id', async () => {
    const res = await request.get(`/api/v1/clothes/${idc}`);
    expect(res.status).toEqual(200);
    expect(res.body[0].type).toEqual('skirt');
      
  });
  it('should update a clothes using put request', async () => {
    //arrange
    let editClothes = {
      type: 'scarf',
      price: '15$',
    };
      //act
    const response = await request.put(`/api/v1/clothes/${idc}`)
      .send(editClothes);
      //assert
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('scarf');
    expect(response.body.price).toEqual('15$');
    expect(response.body._id).toEqual(`${idc}`);
  });
 
  it('should be able to delete data on DELETE /api/v1/food/id', async () => {
    const response = await request.delete(`/api/v1/clothes/${idc}`);
    expect(response.status).toEqual(200);
    expect(response.body._id).toEqual(`${idc}`);
    // expect(response.body.data).toEqual(undefined);
  });

});




