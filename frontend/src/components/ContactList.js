import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchContacts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contacts', {
        params: { search: searchQuery },
        headers: {'Authorization': localStorage.getItem('token')}
      });
      console.log(response.data.contacts);
      setContacts(response.data.contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error.response.data);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleEdit = (contact) => {
    setEditContact(contact);
    setEditedName(contact.name);
    setEditedEmail(contact.email);
  };

  const handleCancelEdit = () => {
    setEditContact(null);
    setEditedName('');
    setEditedEmail('');
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/contacts/${editContact._id}`, {
        name: editedName,
        email: editedEmail
      }, {
      headers: { Authorization: localStorage.getItem('token')}
    });
      fetchContacts();
      handleCancelEdit();
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`, {
        headers: {Authorization: localStorage.getItem('token')}
      });
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleAddContact = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/contacts', {
        name: editedName,
        email: editedEmail,
        phone: editedPhone
      },{
        headers: { Authorization: localStorage.getItem('token')}
      });
      setSearchQuery('');
      fetchContacts();
      setEditedName('');
      setEditedEmail('');
      setEditedPhone('');
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };


  return (
    <div>
      <div className='contactListBody'>
      <div className='contactList'>
        <h1> Your contacts </h1>
    
      {contacts.length === 0 ? (
        <p>No contacts added</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>
              {editContact && editContact._id === contact._id ? (
                <div>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                  <div className='edDel'>
                  <button onClick={handleUpdate}>Update</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className='edDel'>
                  {contact.name} - {contact.email}
                  <button onClick={() => handleEdit(contact)}>Edit</button>
                  <button onClick={() => handleDelete(contact._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
        </div>

      <div className='addCon'>
      <h3>Add Contact</h3>
      </div>
      <div className='addform'>
      <form onSubmit={handleAddContact}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={editedPhone}
            onChange={(e) => setEditedPhone(e.target.value)}
          />
        </div>
        <div className='center2'>
          <div className='csvbtn'>
        <button type="submit"><span>Add Contact</span></button>
        </div>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
};

export default ContactList;
