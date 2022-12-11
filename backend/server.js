import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
app.use(express.json());

import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB);

const PORT = process.env.PORT || 5001;

const conversationSchema = new mongoose.Schema({
    title: String,
    category: String,
    conversation: [
        {
            botResponse: { type: String, default: '' },
            promptQuestion: String,
            totalTokens: Number,
        },
    ],
});
const Conversation = mongoose.model('Conversation', conversationSchema);

app.get('/api', async (req, res) => {
    Conversation.find({}, (error, conversations) => {
        if (error) {
            console.log(error);
        } else {
            res.send(conversations);
        }
    });
});

app.post('/api', (req, res) => {
    Conversation.findOneAndUpdate({ title: req.body.title }, req.body, { upsert: true }, (error, doc) => {
        if (error) {
            console.log(error);
        } else {
            console.log(doc);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
