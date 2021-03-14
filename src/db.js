import util from 'util'
import fs, { existsSync } from 'fs'
import path from 'path'

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile)

const userPath = path.resolve('data/users.json');
const entryPath = path.resolve('data/entries.json')

let fileContent = []

const createUserFile = (userPath, fileContent) => {
    fs.writeFileSync(userPath, fileContent, (error) => {
        if (error) {
            console.error('An error has occurred: ', error);
        } else {
            console.log('Your file is made!')
        }
    });
}

if(!fs.existsSync('data/users.json')) {
    createUserFile('data/users.json', JSON.stringify(fileContent))
}

const createEntryFile = (entryPath, fileContent) => {
    fs.writeFileSync(entryPath, fileContent, (error) => {
        if (error) {
            console.error('An error has occurred: ', error);
        } else {
            console.log('Your file is made!')
        }
    });
}

if(!fs.existsSync('data/entries.json')) {
    createEntryFile('data/entries.json', JSON.stringify(fileContent))
}


async function readUsers() {
  const json = await readFile(userPath);
  return JSON.parse(json);
}

async function readEntries() {
    const json = await readFile(entryPath);
    return JSON.parse(json)
}


async function writeUsers(users) {
  const json = JSON.stringify(users, null, 2);
  return writeFile(userPath, json);
}

async function writeEntries(entries) {
    const json = JSON.stringify(entries, null, 2);
    return writeFile(entryPath, json);
  }


async function getUserById(id) {
  const users = await readUsers(); 
  let matchedUser;
  users.forEach((user) => {
    if (user.id === id) {
      matchedUser = user;
    }
  });

  if (matchedUser) {
    return matchedUser;
  }
  return null;
}


async function getEntryById(id) {
    const entries = await readEntry();
    let matchedEntry;
    entries.forEach((entry) => {
      if (entry.id === id) {
        matchedEntry = entry;
      }
    });
  
    if (matchedEntry) {
      return matchedEntry;
    }
    return null;
  }


async function createUser(newUser) {
  const users = await readUsers();
  users.push(newUser); 
  return writeUsers(users);
}


async function createEntry(newEntry) {
const entries = await readEntries();
 entries.push(newEntry); 
 return writeEntries(entries);
}


async function updateUser(updatedUser) {
  const users = await readUsers();
  users.forEach((user, i) => {
    if (user.id === updatedUser.id) {
      users[i] = updatedUser;
    }
  });


  return writeUsers(users);
}

async function updateEntry(updatedEntry) {
    const entries = await readEntries();
    entries.forEach((entry, i) => {
      if (entry.id === updatedEntry.id) {
        entries[i] = updatedEntry;
      }
    });

    return writeEntries(entries);
  }


async function removeUser(id) {
  const users = await readUsers(); 

  let remainingUsers;
  users.forEach((user) => {
    if (user.id !== id) {
      remainingUsers.push(user);
    }
  });

  return writeUsers(remainingUsers);
}

async function removeEntry(id) {
    const entries = await readEntries(); 

    let remainingEntries;
    entries.forEach((entry) => {
      if (entry.id !== id) {
        remainingEntries.push(entry);
      }
    });

    return writeEntries(remainingEntries);
  }



export {
  getUserById,
  getEntryById,
  createUser,
  createEntry,
  updateUser,
  updateEntry,
  removeUser,
  removeEntry,
  writeUsers,
  writeEntries,
  
  readUsers as getAllUsers,
  readEntries as getAllEntries
};



// dataHandler.js



// import { promises as fs } from 'fs'
// import path from 'path'
// import { isArray } from 'util'

// const file = path.resolve('data/entries.json')

// // private function for the module
// const write = async (data) => {
//     await fs.writeFile(file, JSON.stringify(data))
// }

// const add = async (data) => {
//     try {
//         let content = await getAll()
//         content.push(data)
//         write(content)
//         console.log("file written")
//     } catch (err) {
//         console.error(err)
//         throw err
//     }

// }

// const getAll = async () => {
//     try {
//         let content = await fs.readFile(file)
//         return JSON.parse(content)
//     } catch (err) {
//         console.error(err)
//         throw err
//     }
// }

// const update = async (id, data) => {
//     let content = await getAll()
//     if (!isArray(content)) {
//         throw new Error("No data found")
//     }

//     const itemLocation = content.findIndex(item => item.id=== id)
//     console.log(id)
//     if (itemLocation != -1) {
//         content[itemLocation] = data
//     } else {
//         throw new Error(`ID: ${id} not found`)
//     }

//     // let's write it back to the file now
//     write(content)
// }

// export {
//     add,
//     getAll,
//     update
// }
