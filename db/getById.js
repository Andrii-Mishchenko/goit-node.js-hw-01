const listContacts = require('./getAll');

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const selectContact = contacts.find(item => String(item.id) === String(contactId));
    
    if (!selectContact) {
      throw new Error(`Product with id=${contactId} not found`);
    }
    // console.log(selectContact)
    return selectContact;
  }
  catch (error) {
    throw error;
  }
}

module.exports = getContactById