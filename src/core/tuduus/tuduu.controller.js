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

export const updateTuduu = async (req, res) => {
  if (!req.params.id) return error(400, 'Invalid id', res);
  if (req.body.completed === null || req.body.completed === undefined) return error(400, 'Invalid completed', res);

  try {
    const tuduu = await Tuduu.findById(req.params.id);
    if (!tuduu) return error(404, 'Tuduu does not exists!', res);

    tuduu.completed = req.body.completed;

    await Tuduu.updateOne({ _id: req.params.id }, tuduu);
    return success([], 'Tuduu updated successfully', res);
  } catch (err) {
    logError('tuduus.update', err.message);
    return error(500, 'Some error occurred while trying to update the tuduu!', res);
  }
};

// export const deleteTuduu = async (req, res) => {
//   if (!req.params.id) return error(400, 'Invalid id', res);

//   try {
//     const tuduu = await Tuduu.findById(req.params.id);
//     if (!tuduu) return error(404, 'Tuduu does not exists!', res);

//     await Tuduu.deleteOne({ _id: req.params.id });
//     return success([], 'Tuduu deleted successfully', res);
//   } catch (err) {
//     logError('tuduus.delete', err.message);
//     return error(500, 'Some error occurred while trying to delete the tuduu!', res);
//   }
// };
