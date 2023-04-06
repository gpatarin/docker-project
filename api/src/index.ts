import express from 'express';
import { Poll, PollModel } from './model/Poll';
import * as dotenv from 'dotenv'
import mongoose, { ConnectOptions, Mongoose } from 'mongoose';
dotenv.config()

const PORT = process.env['PORT'];
const MONGO_URI = process.env['MONGO_URI'];

if (!PORT) throw Error('PORT not existing. You forgot to set it as env variable.')
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



const server = express();

server.post('/api/insert', async (req, res) => {
  const poll: Poll = req.body as Poll;
  try {
    const newPoll = new PollModel(poll);
    await newPoll.save();
    res.status(201).send('Poll inserted successfully');
  } catch (err) {
    console.log(`Error inserting poll: ${err}`);
    res.status(500).send('Internal server error');
  }
});

server.post('/api/update', async (req, res) => {
  const poll: Poll = req.body as Poll;
  try {
    const updatedPoll = await PollModel.findOneAndUpdate(
      { id: poll.id },
      poll,
      { new: true }
    );
    res.status(200).json(updatedPoll);
  } catch (err) {
    console.log(`Error updating poll: ${err}`);
    res.status(500).send('Internal server error');
  }
});

server.post('api/addAgree', async (req, res) => {
 const poll : Poll = await PollModel.findOne({ id: req.body }) as Poll;
  poll.agree++;
  try {
    const updatedPoll = await PollModel.findOneAndUpdate(
      { id: poll.id },
      poll,
      { new: true }
    );
    res.status(200).json(updatedPoll);
  } catch (err) {
    console.log(`Error updating poll: ${err}`);
    res.status(500).send('Internal server error');
  }
});


server.post('api/addDisagree', async (req, res) => {
  const poll : Poll = await PollModel.findOne({ id: req.body }) as Poll;
   poll.disagree++;
   try {
     const updatedPoll = await PollModel.findOneAndUpdate(
       { id: poll.id },
       poll,
       { new: true }
     );
     res.status(200).json(updatedPoll);
   } catch (err) {
     console.log(`Error updating poll: ${err}`);
     res.status(500).send('Internal server error');
   }
 });

server.post('/api/removeAgree', async (req, res) => {
  const poll : Poll = await PollModel.findOne({ id: req.body }) as Poll;
  poll.agree--;
  try {
    const updatedPoll = await PollModel.findOneAndUpdate(
      { id: poll.id },
      poll,
      { new: true }
    );
    res.status(200).json(updatedPoll);
  } catch (err) {
    console.log(`Error updating poll: ${err}`);
    res.status(500).send('Internal server error');
  }
});

server.post('/api/removeDisagree', async (req, res) => {
  const poll : Poll = await PollModel.findOne({ id: req.body }) as Poll;
  poll.disagree--;
  try {
    const updatedPoll = await PollModel.findOneAndUpdate(
      { id: poll.id },
      poll,
      { new: true }
    );
    res.status(200).json(updatedPoll);
  } catch (err) {
    console.log(`Error updating poll: ${err}`);
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
