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
// };

import express from 'express';
const app = express();

import { signUp, signIn, forgotPassword, changePassword } from '../core/users/controllers/user.controller.js';

// Auth
app.post('/api/auth/signup', signUp);
app.post('/api/auth/signin', signIn);
app.post('/api/auth/forgotPassword', forgotPassword);
app.post('/api/auth/changePassword', changePassword);

export default app;
