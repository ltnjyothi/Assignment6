const express = require('express');
const User = require('../models/user');
const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      const users = await User.getAllUsers();
      res.send(users);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/login', async (req, res) => {
    try {
      let user = await User.login(req.body);
      res.send({...user, password: undefined})
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/register', async (req, res) => {
    try {
      let user = await User.enroll(req.body);
      res.send({...user, password: undefined})
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .put('/edit', async (req, res) => {
    try {
      let user = await User.userupdate(req.body);
      res.send({...user, password: undefined});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      User.removeUser(req.body);
      res.send({success: "We'll Miss You... :("})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })


  
module.exports = router;