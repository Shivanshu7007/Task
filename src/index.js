const express = require('express')
const bodyParser = require('body-parser');
const ip = require('ip');
const useragent = require('useragent');
const { IpDetails, UserDetails } = require("./data/models");

const dotenv= require ("dotenv");
const connectDB = require ("./data/db")
//it is use to confgure .env files other wise it did not run 
dotenv.config({
    path: './.env'
})

connectDB()
const app = express()
const port = 3000
app.use(bodyParser.json());

app.post('/save-details',async (req, res) => {
console.log(req.body,"ndwklvkklwdnv");

 const userData=req.body
 const user=new UserDetails(userData)
 await user.save()
 return res.send("Details saved successfully");
})
app.get('/',async(req, res)=>{
  const agent = useragent.parse(req.headers['user-agent']);
    const deviceType = agent.isMobile ? 'Mobile' : 'Desktop';

    const userDetails = {
        ip: ip.address(),
        deviceType: deviceType,
        browser: agent.toAgent(),
        userAgent: req.headers['user-agent']
    };
const ipDetails = new IpDetails(userDetails);
await ipDetails.save()

res.sendFile(__dirname + '/index.html');
})
app.get('/test',async (req, res) => {
  const result= await IpDetails.find()
  return res.json(result)
})
app.get('/src/styles.css',(req, res)=>{
  res.sendFile(__dirname + '/styles.css');
})
app.get('/src/script.js',(req, res)=>{
  res.sendFile(__dirname + '/script.js');
})
app.get('/contact.html',(req, res)=>{
  res.sendFile(__dirname + '/contact.html');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
