import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = 80;
// Define the endpoint handler
app.get('/', (req, res) => {
  res.send(`<h1>This is server ${process.env.SERVER_NUMBER}</h1>`);
});

app.listen(port, () => {
  console.log(`Server ${process.env.SERVER_NAME} is ready on port ${port}!`);
});
