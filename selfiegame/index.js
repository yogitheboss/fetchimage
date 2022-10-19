const express = require("express");
const app = express();
const path = require("path");
const bodyParser=require('body-parser')
const fs=require('fs')


fs.writeFile('locations.csv', 'location_index,latitude,longitude', function (err) {
  if (err) throw err;
  console.log('Saved!');
}); 


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let index=1;
app.post('/api',(req,res)=>{
    console.log(req.body);
    const data=req.body;
    res.json({
      "status":"success",
      "latitude":data.latitude,
      "longitude":data.longitude
    })
    const content=`\n${index++},${data.latitude},${data.longitude}`
    fs.appendFile('locations.csv',content,(err)=>{
      if (err) throw err;
      console.log('appended');
    }) 
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log("The app is listening");
});
