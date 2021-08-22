const { Command } = require('commander');
const contactsOperations = require('./contacts');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contactsOperations.listContacts();
      break;

    case 'get':
      if (argv.id) {
        contactsOperations.getContactById(id);
      } else console.log(`id ${id} is not defined`);
      break;

    case 'add':
      if ((argv.name, argv.email, argv.phone)) {
        contactsOperations.addContact(name, email, phone);
      } else console.log("name, email or phone is not correct");
      break;

    case 'remove':
      if (argv.id) {
        contactsOperations.removeContact(id);
      } else console.log(`id ${id} is not defined`);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);




// (async () => {
//     try {
//         // get all contacts:
//         const contacts = await contactsOperations.listContacts();
//         console.log(contacts);


//         // // get contact by Id:
//         // const contactById = await contactsOperations.getContactById(11);
//         // console.log(contactById);


//         // // delete contact:
//         // const removeContact = await contactsOperations.removeContact(3);
//         // console.log(removeContact);


//         // // add contact:
//         // const newContactData = {
//         //     name: 'Donald Trump',
//         //     email: 'Donald.Trump@retired.net',
//         //     phone: '(555) 666-7777'
//         // }
//         // const addContact = await contactsOperations.addContact(newContactData)
//         // console.log(addContact);

//     } catch (error) {
//         console.log(error.message);
//     }
// })();