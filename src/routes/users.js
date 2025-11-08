const express = require('express');
const { getUsers, createUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { validateUser } = require('../middleware/validation');

const router = express.Router();

router.get('/', getUsers);
router.post('/', validateUser, createUser);
router.get('/:id', getUserById);
router.put('/:id', validateUser, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
