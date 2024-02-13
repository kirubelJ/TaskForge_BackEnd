const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
//
const { connection } = require("./DatabaseConf/mysqlConf");
const router = require("./Routers/router");
//
//midelewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cors({ origin: "*" }));
app.use("/api", router);
//
//my sql connection
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("MYSQL connected as id " + connection.threadId);
  
});

connection.end();
//

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
