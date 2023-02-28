import mongoose, { ConnectOptions } from 'mongoose';

export class Database {
  private static uri = 'mongodb://localhost:27017/mydb';

  static connect() {
    mongoose.connect(Database.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    } as ConnectOptions);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB!');
    });
  }
}