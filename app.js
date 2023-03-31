
const express = require('express')
const bodyParser = require('body-parser')
const path =require('path')
const sequelize = require('./util/database')
const cors = require('cors')

const app = express()
app.set('views','views')
app.use(cors())
const displayRoutes = require('./routes/index')
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'public')))
app.use(displayRoutes)  
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

sequelize
// .sync({foce:true})
.sync()
.then(()=>{
    console.log("DB Connected")
    app.listen(3000,()=>{
        console.log('server started at port 3000')
    })
}).catch(err=> console.log(err))