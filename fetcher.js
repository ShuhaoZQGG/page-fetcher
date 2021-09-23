const request = require('request');
const fs = require('fs');
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let fileName = './index.html';
request('http://www.example.edu/', (error, response, body) => {
  if (error) {
    console.log(error);
  } else {
    fs.access(fileName, fs.constants.F_OK, (err) => {
      if (!err) {
        rl.question('Do you want to overWrite the file? ', (answer) => {
          // TODO: Log the answer in a database
          if (answer !== 'y' && 'Y') {
            console.log(`User doesn't want to overwrite the file`);
          } else {
            fs.writeFile(fileName, body, err => {
              if (err) {
                console.log('error', err);
                console.log('error', error);
                return;
              }
              console.log(`Downloaded and save ${body.length} bytes to ${fileName}`);
            });
          }
        
          rl.close();
        });
      }
    

    });
  }
});