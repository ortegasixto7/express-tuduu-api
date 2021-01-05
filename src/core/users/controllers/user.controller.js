import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { success, error, logError } from '../../../utils/response.js';

async function getAll(req, res) {
  try {
    const result = await User.find();
    success(result, '', res);
  } catch (err) {
    logError('users.getAll', err.message);
    error(500, 'Some error occurred while trying to get the users!', res);
  }
}

async function get(req, res) {
  try {
    const result = await User.findById(req.params.id);
    if (result === null) {
      error(404, 'User does not exists!', res);
    } else {
      success(result, '', res);
    }
  } catch (err) {
    logError('users.get', err.message);
    error(500, 'Some error occurred while trying to get the user!', res);
  }
}

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
    logError('users.signUp', err.message);
    return error(500, 'Some error occurred while trying to create the user!', res);
  }
};

async function update(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (user === null) {
      error(404, 'User does not exists!', res);
    } else {
      if (req.body.first_name != null) user.first_name = req.body.first_name;
      if (req.body.last_name != null) user.last_name = req.body.last_name;
      if (req.body.is_active != null) user.is_active = req.body.is_active;
      await User.updateOne({ _id: req.params.id }, user);
      success([], 'User updated successfully', res);
    }
  } catch (err) {
    logError('users.update', err.message);
    error(500, 'Some error occurred while trying to update the user!', res);
  }
}

async function remove(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (user === null) {
      error(404, 'User does not exists!', res);
    } else {
      await User.deleteOne({ _id: req.params.id });
      success([], 'User removed successfully', res);
    }
  } catch (err) {
    logError('users.remove', err.message);
    error(500, 'Some error occurred while trying to delete the user!', res);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user == null) {
      error(404, 'Username or password invalid!', res);
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        success([], 'Login Ok', res);
      } else {
        error(404, 'Username or password invalid!', res);
      }
    }
  } catch (err) {
    logError('users.login', err.message);
    error(500, 'Some error occurred while trying login the user!', res);
  }
}
