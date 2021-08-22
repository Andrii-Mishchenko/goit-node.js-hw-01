const fs = require('fs').promises;
const path = require('path');
const {v4} = require('uuid');

const contactsPath = path.join(__dirname, "./db/contacts.json");
 
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data)
    return contacts;
  }
  catch (error) {
    throw error;
  }
}


const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const selectContact = contacts.find(item => item.id === id);
    if (!selectContact) {
      throw new Error(`Product with id=${id} not found`);
    }
    return selectContact;
  }
  catch (error) {
    throw error;
  }
}


const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
      throw new Error(`Product with id=${id} not found`);
    }
    const newContacts = contacts.filter(item => item.id !== id);
    // const newContacts = splice(idx, 1);

    const contactsString = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, contactsString);
    return contacts[idx];
  }
  catch (error) {
    throw error;
  }
}


const addContact = async (newContactData) => {
  try {    
    const newContact = { ...newContactData, id: v4() };
    const contacts = await listContacts();
    // const newContacts = [...contacts, newContact]
    contacts.push(newContact)

    const contactsString = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, contactsString);
    
    return newContact
  }
  catch (error) {
    throw error
  }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
