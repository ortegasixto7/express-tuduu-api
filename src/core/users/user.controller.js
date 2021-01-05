import User from './user.model.js';
import bcrypt from 'bcrypt';
import { success, error, logError } from '../../utils/response.js';

export const signUp = async (req, res) => {
  if (!req.body.firstName) return error(400, 'Invalid firstName', res);
  if (!req.body.lastName) return error(400, 'Invalid lastName', res);
  if (!req.body.username) return error(400, 'Invalid username', res);
  if (!req.body.password) return error(400, 'Invalid password', res);
  if (!req.body.securityCode) return error(400, 'Invalid securityCode', res);

  const usernameResult = await User.findOne({ username: req.body.username });
  if (!!usernameResult) {
    return error(400, 'Email not available!', res);
  }

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    securityCode: bcrypt.hashSync(req.body.securityCode, 10)
  });

  try {
    await user.save();
    return success([], 'User created successfully', res);
  } catch (err) {
    logError('auth.signUp', err.message);
    return error(500, 'Some error occurred while trying to create the user!', res);
  }
};

export const signIn = async (req, res) => {
  try {
    if (!req.body.username) return error(400, 'Invalid username', res);
    if (!req.body.password) return error(400, 'Invalid password', res);

    const user = await User.findOne({ username: req.body.username });

    if (!user) return error(404, 'Username or password invalid!', res);
    if (!bcrypt.compareSync(req.body.password, user.password)) return error(404, 'Username or password invalid!', res);

    return success([], 'Login Ok', res);
  } catch (err) {
    logError('auth.signIn', err.message);
    return error(500, 'Some error occurred while trying login the user!', res);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    if (!req.body.username) return error(400, 'Invalid username', res);
    if (!req.body.securityCode) return error(400, 'Invalid securityCode', res);

    const user = await User.findOne({ username: req.body.username });

    if (!user) return error(404, 'Username or securityCode invalid!', res);
    if (!bcrypt.compareSync(req.body.securityCode, user.securityCode)) return error(404, 'Username or securityCode invalid!', res);

    return success([], 'Validation Ok', res);
  } catch (err) {
    logError('auth.forgotPassword', err.message);
    return error(500, 'Some error occurred while trying forgotPassword the user!', res);
  }
};

export const changePassword = async (req, res) => {
  if (!req.body.id) return error(400, 'Invalid id', res);
  if (!req.body.password) return error(400, 'Invalid password', res);

  try {
    const user = await User.findById(req.body.id);
    if (!user) return error(404, 'User does not exists!', res);

    user.password = bcrypt.hashSync(req.body.password, 10);

    await User.updateOne({ _id: req.body.id }, user);
    return success([], 'Password updated successfully', res);
  } catch (err) {
    logError('auth.changePassword', err.message);
    return error(500, 'Some error occurred while trying to changePassword the user!', res);
  }
};
