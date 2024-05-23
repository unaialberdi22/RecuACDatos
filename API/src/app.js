import express from "express"
import router from "./routes/index.js";
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-requested-with');
  next();
});
app.use(router)

app.get('/', (req, res) => {
    res.send("Hello from Express!")
  })
  app.listen(4000, () => {
    console.log('Listening on port 4000')
  })
