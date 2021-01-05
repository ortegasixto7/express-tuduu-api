import express from 'express';
const app = express();

import { signUp, signIn, forgotPassword, changePassword } from '../core/users/user.controller.js';
import { createTuduu } from '../core/tuduus/tuduu.controller.js';

// Auth
app.post('/api/auth/signup', signUp);
app.post('/api/auth/signin', signIn);
app.post('/api/auth/forgotPassword', forgotPassword);
app.post('/api/auth/changePassword', changePassword);

// Tuduu
app.post('/api/tuduus', createTuduu);

export default app;
