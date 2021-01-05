import Tuduu from './tuduu.model.js';
import User from '../users/user.model.js';
import { success, error, logError } from '../../utils/response.js';

export const createTuduu = async (req, res) => {
  if (!req.body.name) return error(400, 'Invalid name', res);
  if (!req.body.userId) return error(400, 'Invalid userId', res);

  const tuduu = new Tuduu({
    name: req.body.name,
    userId: req.body.userId
  });

  try {
    const user = await User.findById(req.body.userId);
    if (!user) return error(404, 'User does not exists!', res);

    await tuduu.save();
    return success([], 'Tuduu created successfully', res);
  } catch (err) {
    logError('tuduus.create', err.message);
    return error(500, 'Some error occurred while trying to create the tuduu!', res);
  }
};
