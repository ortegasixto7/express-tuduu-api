import express from 'express';
const app = express();

import { signUp, signIn, forgotPassword, changePassword } from '../core/users/user.controller.js';
import { createTuduu, updateTuduu, deleteTuduu } from '../core/tuduus/tuduu.controller.js';

// Auth
app.post('/api/auth/signup', signUp);
app.post('/api/auth/signin', signIn);
app.post('/api/auth/forgotPassword', forgotPassword);
app.post('/api/auth/changePassword', changePassword);

// Tuduus
app.post('/api/tuduus', createTuduu);
app.put('/api/tuduus/:id', updateTuduu);
app.delete('/api/tuduus/:id', deleteTuduu);

export default app;
