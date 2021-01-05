import database from 'mongoose';

export const connectDatabase = async (url) => {
  try {
    await database.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('[Database] connected!');
  } catch (err) {
    console.log("[Database] couldn't connect with the database!");
    console.log('[Database] exiting now');
    process.exit();
  }
};
