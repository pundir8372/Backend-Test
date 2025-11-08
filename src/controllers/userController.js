// In-memory storage (replace with database in production)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: new Date().toISOString() },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date().toISOString() }
];

const getUsers = (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedUsers = users.slice(startIndex, endIndex);
    
    res.json({
      users: paginatedUsers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(users.length / limit),
        totalUsers: users.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const createUser = (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const newUser = {
      id: users.length + 1,
      name,
      email,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const getUserById = (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if email already exists (excluding current user)
    const existingUser = users.find(user => user.email === email && user.id !== parseInt(id));
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    users[userIndex] = {
      ...users[userIndex],
      name,
      email,
      updatedAt: new Date().toISOString()
    };
    
    res.json(users[userIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
