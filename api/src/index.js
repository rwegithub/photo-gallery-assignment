const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const { findOneAndRemove } = require('./model/Pictures');
const app = express();
const pictureModel =  require('./model/Pictures');

//will accept json format from client
app.use(express.json());
app.use(cors())

//data base connection
mongoose.connect("mongodb://localhost:27017/assignment_db", {useNewUrlParser: true})
.then(() => console.log("Connected"))
.catch(err => console.log(err));
// var connection = mongoose.connect("mongodb://localhost:27017/assignment_db", {
//     useNewUrlParser:true
// });

//photo slection save
//Input: List of photoes : pictureScema objects
app.post("/updateSelectedPhotoes", async (req, res)=>{
   const photoList = req.body;
   console.log("photo list from request");
   console.log(photoList);
   try {
       //first delete existing data
      await pictureModel.deleteMany({}, function(){
        var pictureData = [];
        //save new list
        for(var i=0;i<photoList.length;i++){
            try {
                let photomodel = new pictureModel(photoList[i]);
                photomodel.save();                
            }
            catch(error){
                console.log(error);
            }
        }
        //return updated list
        res.send(photoList);
      })
   }
   catch(error){
        console.log(error);
        res.send(error);
   }
});

//get saved photo list
app.get("/getSelectedPhotoes", async (req, res)=>{
    try {
       const all = await pictureModel.find({});
       res.send(all);
    }
    catch(error){
         console.log(error);
         res.send(error);
    }
 });

app.listen(3001, () => {
    console.log("Server running on port 3001...");
});