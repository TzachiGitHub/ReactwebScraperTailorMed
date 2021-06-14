const mongoose = require('mongoose');
const express = require('express')
const app = express()
const Programs = require('./ProgramsSchema');
// const path = require('path')
const {addProgramsInfo} = require('./populateDB.js')
const {updatePrograms} = require('./updateFlow.js')

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

app.set('view engine','ejs')
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

mongoose.connect('mongodb://localhost:27017/healthWebScraper', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Connection Open!")
    })
    .catch(err=>{
        console.log("Connection failed to open.")
        console.log(err)
    })
const ObjectId = mongoose.Types.ObjectId;

ObjectId.prototype.valueOf = function () {
    return this.toString();
};


app.get('/', (req,res)=>{
    Programs.find({}, (err, response)=>{
        if(err){
            console.log(err)
            res.send("encountered error in route '/'");
        }else{
            // console.log(response)
            res.send(response);
        }
    })
})



app.get('/pupulateDB', (req,res)=> {
    console.log("/popluateDB api request reached")
    addProgramsInfo().then(()=>{
        console.log("populated database!")
        res.send("success!")
    })
        .catch(()=>{
            console.log(err)
            res.send(err)
        })
})


app.get('/update', (req, res)=>{
    updatePrograms().then(value => {
        res.send(value)
    })
        .catch(err=>{
            console.log(err)
            res.send(err)
        })
})


app.listen('3001', ()=> {
    console.log("listening on port 3001!")
})


// var connectDB = (req, res, next)=>{
//     console.log('LOGGED')
//     next()
// }
// app.use(connectDB)
// let getNamesFromData = require('./updateFlow.js');
// app.engine('html', require('ejs').renderFile);
// app.set('views', path.join(__dirname, '/views'));

