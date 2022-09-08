const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const { default: axios } = require("axios");
const router = require("./routes/auth");
const redisPort = 6379;
// const client = 
dotenv.config();
const redis = require("redis");
const client = redis.createClient();
client.connect().then(() => {
  console.log("redis is connect");
});
const DEFAULT_EXPIRATION = 3600;

app.use(express.json()); // allow data is format json.
app.use("/images", express.static(path.join(__dirname, "/images")));


app.use("/photos", async (req, res) => {
  console.log("ugo to hher");
  const albumId = req.query.id;
  // res.status(200).json("create data redis");
      
  

  // const {data} = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
  // client.get("photos",  (err, data_photo) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(200).json("erre");
  //   }
  //   if (data_photo != null) {
  //     res.status(200).json("use exit data redis");
  //     console.log("use exit data redis");
  //     return res.json(JSON.parse(data_photo));

  //   } else {
  //     res.status(200).json("create data redis");
  //     console.log("create data redis");
  //       const { data } =  await  axios.get(`https://jsonplaceholder.typicode.com/photos`, { params: { albumId } });
  //       client.setEx("photos", DEFAULT_EXPIRATION, JSON.stringify(data));
  //       res.status(200).json(data);
  //   }
  // })
  
  client.get("photos", async function(err, data) {
    // data is null if the key doesn't exist
    if(err || data != null) {
        return res.status(200).json(data);
    } else {
        console.log("create data redis");
        const { data } =  await  axios.get(`https://jsonplaceholder.typicode.com/photos`, { params: { albumId } });
        client.setEx("photos", DEFAULT_EXPIRATION, JSON.stringify(data));
        return res.status(200).json(data);
      }
});
  
  
});


app.get("/", (req, res) => {
    res.jsonp("index.html")
})
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("3001", () => {
  console.log("Backend is runninsdsg.");
});

  