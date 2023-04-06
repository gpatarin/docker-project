import express from 'express';
import { Poll } from './model/pollModel';
import * as dotenv from 'dotenv'
import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

dotenv.config()


const examplePoll: Poll = {
  id: '1',
  agree: 1,
  disagree: 0,
  result: 'agree',
};

const PORT = process.env['PORT'];

if (!PORT) throw Error('PORT not existing. You forgot to set it as env variable.')

const MONGO_URI = process.env['MONGO_URI'];

if(!MONGO_URI) throw Error('MONGO_URI not existing. You forgot to set it as env variable.')

 mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
      } as ConnectOptions)
      .then((res) => {
        console.log(
          'Connected to mongoDB database successfully.'
        );
      })
      .catch((err) => {
        console.log(
          `Could not connect to mongoDB database. Error: ${err}`,
          err
        );
      });


const pollSchema = new mongoose.Schema<Poll>({
  id: { type: String, required: true, unique: true },
  agree: { type: Number, required: true },
  disagree: { type: Number, required: true },
  result: { type: String, required: true },
});

const PollModel = mongoose.model<Poll>('Poll', pollSchema);


const server = express();

server.get('/', (req, res) => {
   const poll = req.body;

});


server.get('/api/insert', async (req, res) => {
  const poll = examplePoll;//req.body as Poll;
  try {
    const newPoll = new PollModel(poll);
    await newPoll.save();
    res.status(201).send('Poll inserted successfully');
  } catch (err) {
    console.log(`Error inserting poll: ${err}`);
    res.status(500).send('Internal server error');
  }
});



server.get('/api/get', async (req, res) => {
  try {
    const polls = await PollModel.find();
    res.status(200).json(polls);
  } catch (err) {
    console.log(`Error retrieving polls: ${err}`);
    res.status(500).send('Internal server error');
  }
});

server.listen(PORT, () => {
  console.log(`Listening on :${PORT}`)
})
