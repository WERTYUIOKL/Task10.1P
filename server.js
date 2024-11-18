const express = require('express');
const bodyParser = require('body-parser');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const cors = require('cors'); 
require('dotenv').config(); 

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY, 
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html', (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(500).send('Error loading the homepage');
        }
    });
});

app.post('/', (req, res) => {
    const { Email } = req.body;

    if (!Email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    
    const domain = process.env.MAILGUN_DOMAIN;

    if (!domain) {
        return res.status(500).json({ error: 'Mailgun domain is not configured' });
    }

    mg.messages
        .create(domain, {
            from: `Your App <mailgun@${domain}>`,
            to: [Email],
            subject: 'Welcome to our Daily Insider!',
            text: 'Thank you for subscribing to our Daily Insider newsletter. Stay tuned for more updates!',
            html: '<h1>Thank you for subscribing to our Daily Insider newsletter. Stay tuned for more updates!</h1>',
        })
        .then((msg) => {
            console.log('Email sent successfully:', msg);
            res.status(200).json({ message: 'Subscription successful, email sent!' });
        })
        .catch((err) => {
            console.error('Error sending email:', err);
            res.status(500).json({ error: 'Failed to send email' });
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
