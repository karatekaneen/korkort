const fs = require('fs');

exports.updatePerson = async () => {
   console.log(__dirname)
   let output = {}
   await fs.readFile(`${__dirname}/Personer.json`, 'utf8', function readFileCallback(err, data) {
      if (err) {
         console.log(err);
      } else {
         obj = JSON.parse(data); //now it an object
         this.output = data
         console.log('inne')
         // obj.table.push({ id: 2, square: 3 }); //add some data
         // json = JSON.stringify(obj); //convert it back to json
         // fs.writeFile('myjsonfile.json', json,  'utf8', callback); // write it back 
      }
   })
   console.log('ute')
   return output


}

