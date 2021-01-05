// module.exports = (app) => {
//   // const tasks = require('../controllers/tasks.js');
//   // const users = require('../core/users/controllers/user.controller');

//   import { signUp } from '../core/users/controllers/user.controller';

//   // Tasks
//   // app.get('/api/tasks', tasks.getAll);
//   // app.get('/api/tasks/:id', tasks.get);
//   // app.post('/api/tasks', tasks.create);
//   // app.put('/api/tasks/:id', tasks.update);
//   // app.delete('/api/tasks/:id', tasks.remove);

//   // Auth
//   app.post('/api/auth', signUp);

//   // Users
//   // app.get('/api/users', users.getAll);
//   // app.get('/api/users/:id', users.get);
//   // app.put('/api/users/:id', users.update);
//   // app.delete('/api/users/:id', users.remove);
//   // app.post('/api/login', users.login);
// };

import express from 'express';
const app = express();

import { signUp } from '../core/users/controllers/user.controller.js';

// Auth
app.post('/api/auth/signup', signUp);

export default app;
