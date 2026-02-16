const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'BREVO_API_KEY', 'BREVO_FROM_EMAIL', 'YOUR_EMAIL'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ ERROR: Missing required environment variables:');
  missingEnvVars.forEach(varName => console.error(`   - ${varName}`));
  console.error('\nPlease create a .env file with all required variables.');
  console.error('See .env.brevo for an example.\n');
  process.exit(1);
}

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

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
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  autoReplySent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

// Brevo Email Service Functions using Axios

// Send notification email to you
async function sendNotificationEmail(contactData) {
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: 'Portfolio Contact Form',
          email: process.env.BREVO_FROM_EMAIL || 'noreply@yourdomain.com'
        },
        to: [
          {
            email: process.env.YOUR_EMAIL || 'varunkamalam@gmail.com',
            name: 'Arunkumar V'
          }
        ],
        subject: `New Contact Form Submission from ${contactData.name}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4F46E5;">New Contact Form Submission</h2>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${contactData.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${contactData.email}" style="color: #4F46E5;">${contactData.email}</a></p>
              <p><strong>Message:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                ${contactData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p style="color: #6b7280; font-size: 14px;">
              Received at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </p>
            <div style="margin-top: 20px; padding: 15px; background-color: #EEF2FF; border-left: 4px solid #4F46E5;">
              <p style="margin: 0; font-size: 14px;">
                <strong>Quick Actions:</strong><br>
                Reply to: <a href="mailto:${contactData.email}" style="color: #4F46E5;">${contactData.email}</a><br>
                Phone: <a href="tel:${contactData.phone || 'Not provided'}" style="color: #4F46E5;">${contactData.phone || 'Not provided'}</a>
              </p>
            </div>
          </div>
        `
      },
      {
        headers: {
          'accept': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
          'content-type': 'application/json'
        }
      }
    );
    
    console.log('Notification email sent successfully:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error sending notification email:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
}

// Send auto-reply email to the contact person
async function sendAutoReplyEmail(contactData) {
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: 'Arunkumar V',
          email: process.env.BREVO_FROM_EMAIL || 'varunkamalam@gmail.com'
        },
        to: [
          {
            email: contactData.email,
            name: contactData.name
          }
        ],
        subject: 'Thank you for contacting me!',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Reaching Out!</h1>
            </div>
            
            <div style="padding: 30px; background-color: #ffffff;">
              <p style="font-size: 16px; color: #374151;">Hi <strong>${contactData.name}</strong>,</p>
              
              <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                Thank you for contacting me through my portfolio. I have received your message and will get back to you as soon as possible.
              </p>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #4F46E5;">
                <h3 style="margin-top: 0; color: #374151; font-size: 18px;">Your Message:</h3>
                <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0;">
                  ${contactData.message.replace(/\n/g, '<br>')}
                </p>
              </div>
              
              <div style="background-color: #EEF2FF; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <p style="margin: 0; font-size: 15px; color: #374151;">
                  <strong>📧 Response Time:</strong> I typically respond within 24-48 hours.<br><br>
                  <strong>📞 Urgent?</strong> Feel free to call me directly at 
                  <a href="tel:+916380385322" style="color: #4F46E5; text-decoration: none; font-weight: bold;">+91 638 038 5322</a>
                </p>
              </div>
              
              <p style="font-size: 16px; color: #374151; margin-top: 30px;">
                Best regards,<br>
                <strong style="color: #4F46E5; font-size: 18px;">Arunkumar V</strong><br>
                <span style="color: #6b7280; font-size: 14px;">Full Stack Developer</span>
              </p>
            </div>
            
            <div style="background-color: #f9fafb; padding: 25px; border-radius: 0 0 10px 10px; text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0;">
                Connect with me on social media:
              </p>
              <div style="margin: 15px 0;">
                <a href="https://github.com/ARUNKUMAR-VENKATRAMAN" 
                   style="display: inline-block; margin: 0 10px; padding: 10px 20px; background-color: #24292e; color: white; text-decoration: none; border-radius: 5px; font-size: 14px;">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/arunkumar-v-0261b7324/" 
                   style="display: inline-block; margin: 0 10px; padding: 10px 20px; background-color: #0077b5; color: white; text-decoration: none; border-radius: 5px; font-size: 14px;">
                  LinkedIn
                </a>
              </div>
              <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
                This is an automated response. Please do not reply to this email.<br>
                📍 Based in Chennai, India
              </p>
            </div>
          </div>
        `
      },
      {
        headers: {
          'accept': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
          'content-type': 'application/json'
        }
      }
    );
    
    console.log('Auto-reply email sent successfully:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error sending auto-reply email:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
}

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
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    };

    const newMessage = new ContactMessage(contactData);
    const savedMessage = await newMessage.save();

    // Send emails asynchronously (don't block response)
    Promise.all([
      sendNotificationEmail(contactData),
      sendAutoReplyEmail(contactData)
    ]).then(([notificationResult, autoReplyResult]) => {
      // Update message with email status
      savedMessage.emailSent = notificationResult.success;
      savedMessage.autoReplySent = autoReplyResult.success;
      savedMessage.save();
      
      if (!notificationResult.success || !autoReplyResult.success) {
        console.error('Some emails failed to send:', {
          notification: notificationResult,
          autoReply: autoReplyResult
        });
      } else {
        console.log('Both emails sent successfully!');
      }
    }).catch(err => {
      console.error('Error sending emails:', err);
    });
    
    res.status(201).json({ 
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: savedMessage 
    });
  } catch (error) {
    console.error('Error in contact endpoint:', error);
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

// Test email endpoint (for debugging)
app.post('/api/test-email', async (req, res) => {
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message to verify Brevo email integration is working correctly.'
    };

    const notificationResult = await sendNotificationEmail(testData);
    const autoReplyResult = await sendAutoReplyEmail(testData);

    res.json({
      notification: notificationResult,
      autoReply: autoReplyResult
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Portfolio server is running',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Portfolio server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});