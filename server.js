require("dotenv").config();
const mysql = require("mysql");
const selectUser = require("./queries/selectUser");
const { toJson, toSafeParse } = require("./utils/helpers");

const connection = mysql.createConnection({
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "white_bear_app",
});

connection.connect();

connection.query(selectUser("kaley@gmail.com", "replace_me"), (err, res) => {
   if (err) {
      console.log(err);
   } else {
      const user = toSafeParse(toJson(res))[0];
      console.log(user);
      // const jsonRes = toJson(res);
      //console.log(jsonRes);
      //const parsedRes = toSafeParse(jsonRes);
      //console.log(pasredRes);
      //const firstObj = parsedRes[0];
      //const user = firstObj;
      //console.log(user)
   }
});

connection.end();
