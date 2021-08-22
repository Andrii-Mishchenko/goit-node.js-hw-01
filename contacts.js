const fs = require('fs').promises;
const path = require('path');
const {v4} = require('uuid');

const contactsPath = path.join(__dirname, "./db/contacts.json");
 
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data)
    // console.log(contacts)
    return contacts;
  }
  catch (error) {
    throw error;
  }
}


const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const selectContact = contacts.find(item => String(item.id) === String(id));
    if (!selectContact) {
      throw new Error(`Product with id=${id} not found`);
    }
    console.log(selectContact)
    return selectContact;
  }
  catch (error) {
    throw error;
  }
}


const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => String(item.id) === String(id));
    if (idx === -1) {
      throw new Error(`Product with id=${id} not found`);
    }
    const newContacts = contacts.filter(item => String(item.id) !== String(id));

    const contactsString = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, contactsString);

    console.log(contacts[idx])
    return contacts[idx];
  }
  catch (error) {
    throw error;
  }
}


const addContact = async (newContactData) => {
  try {
    const contacts = await listContacts();
    const newContact = { ...newContactData, id: v4() };
  
    // const newContacts = [...contacts, newContact]
    contacts.push(newContact)

    const contactsString = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, contactsString);
    
    console.log(newContact)
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
