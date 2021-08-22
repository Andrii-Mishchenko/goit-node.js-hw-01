# goit-node.js-hw-01

// fs - file system

// Вариант 1 через колбек:
// const fs = require('fs');

// fs.readFile('./db/contacts.json', 'utf-8', (error, data) => {
// if (error) {
// console.log(error.message)
// return;
// }

// console.log(data)

// // вывести данные в формате строки, либо добавить аргумент 'utf-8',
// // либо метод toString():

// // const contacts = data.toString();
// // console.log(contacts)
// })

// // Вариант 2 с промисами:
// const fs = require('fs').promises;

// fs.readFile('./db/contacts.json', 'utf-8')
// .then(data => console.log(data))
// .catch(error => console.log(error));

// // Вариант 3 через async await РЕКОМЕНДОВАНО:
// const fs = require('fs').promises;

// (async () => {
// try {
// const data = await fs.readFile('./db/contacts.json', 'utf-8');
// console.log(data);
// }
// catch(error) {
// console.log(error.message);
// }
// })();

// или

// const readFile = async(filePath) => {
// try {
// const data = await fs.readFile(filePath, 'utf-8');
// console.log(data);
// }
// catch(error) {
// console.log(error.message);
// }
// };

// readFile('./db/contacts.json');

<!-- Наиболее используемые функции, для основных операций над файлами, следующие: -->

// (async () => {
// try {
// // // чтение файла
// // const data = await fs.readFile('./db/contacts.json', 'utf-8');
// // console.log(data);

// // // дописывание файла в конце:
// // await fs.appendFile('read.txt', '\nНовая запись в файле');

// // // полностью перезаписывание файла:
// // await fs.writeFile('read.txt', 'Абсолютно Новая запись в файле');
// }
// catch(error) {
// console.log(error.message);
// }
// })();

<!-- для обновления контакта: -->

        // в index js:
        const updateContact = await contactsOperations.updateContact(11, {email: 'nulla.ante@gmail.com'})
        console.log(updateContact);

        // в contacts.js:

        const updateContact = async (id, updateInfo) => {
            try {
                const contacts = await listContacts();
                const idx = contacts.findIndex(item => item.id === id);
                if (idx === -1) {
                throw new Error(`Product with id=${id} not found`);
                }
                contacts[idx] = { ...contacts[idx], ...updateInfo };

                const contactsString = JSON.stringify(contacts);
                await fs.writeFile(contactsPath, contactsString);
                return contacts[idx]
            }
            catch (error) {
                throw error;
            }
        }
