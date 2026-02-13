const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://varunkamalam_db_user:5iUT6kjF8X1SoMeR@project1.tyqtz1u.mongodb.net/portfolio-db';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Contact Message Schema
const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

// Routes

// Get all contact messages (for admin panel)
app.get('/api/contact-messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
});

// Get unread message count
app.get('/api/contact-messages/unread-count', async (req, res) => {
  try {
    const count = await ContactMessage.countDocuments({ isRead: false });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching unread count', error: error.message });
  }
});

// Create a new contact message (from portfolio contact form)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }
    
    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }
    
    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required' });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({ message: 'Message must be at least 10 characters long' });
    }

    // Create new contact message
    const newMessage = new ContactMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });

    const savedMessage = await newMessage.save();
    
    res.status(201).json({ 
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: savedMessage 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error sending message. Please try again later.', 
      error: error.message 
    });
  }
});

// Mark message as read (for admin)
app.patch('/api/contact-messages/:id/read', async (req, res) => {
  try {
    const { id } = req.params;

    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating message', error: error.message });
  }
});

// Delete a contact message (for admin)
app.delete('/api/contact-messages/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await ContactMessage.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully', data: deletedMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio server is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Portfolio server is running on port ${PORT}`);
});