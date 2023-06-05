const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const authMiddleware = require('../middleware/auth');

// Get all contacts for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const contacts = await Contact.find({ user: userId });
    res.json({ contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a contact for the authenticated user
router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phone } = req.body;

    // Create a new contact associated with the authenticated user
    const contact = new Contact({
      name,
      email,
      phone,
      user: userId
    });

    // Save the contact to the database
    await contact.save();

    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a contact for the authenticated user
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const contactId = req.params.id;
    const { name, email, phone } = req.body;

    // Find the contact by ID and user ID and update its fields
    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, user: userId },
      { name, email, phone },
      { new: true } 
    );

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a contact for the authenticated user
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const contactId = req.params.id;

    // Find the contact by ID and user ID and remove it from the database
    const contact = await Contact.findOneAndRemove({ _id: contactId, user: userId });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
