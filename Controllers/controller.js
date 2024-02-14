const { pool } = require("../DatabaseConf/mysqlConf");
const bcrypt = require("bcrypt");

//Create Issue
const AddUser = async (req, res) => {
  console.log(req.body);

  const ID = req.body.ID;
  const Name = req.body.Name; //assigned field service engineer
  const Password = req.body.Password;
  const Role = req.body.Role;
  var hashedPassword;
  //
  bcrypt.hash(Password, 10, function (err, hash) {
    // Store hash in your password DB.
    hashedPassword = hash;
  });
  //
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!///
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // var sql =
    //   "INSERT User (User_FirstName, User_LastName, User_Email, User_PhoneNuber) VALUES ('','','','')";
    var CustomSql = `INSERT User (User_I_ID, 	User_Name, User_Password, User_Role ) VALUES ('${ID}','${Name}','${hashedPassword}','${Role}')`;
    // pool
    connection.query(CustomSql, function (error, results, fields) {
      console.log(results);
      res.status(200).json({
        success: true,
        data: results,
        message: "User Added SUCESSFULY",
      });
      //
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.
    });
  });
};

//Get All Users
const getAllUser = async (req, res) => {
  //
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!///
    //
    var CustomSql = `SELECT * FROM User`;
    // pool
    connection.query(CustomSql, function (error, results, fields) {
      console.log(results);
      res.status(200).json(results);
      //
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.
    });
  });
};
//
//Get All Issue
const getAllIssue = async (req, res) => {
  //
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!///
    //
    var CustomSql = `SELECT * FROM Asssignment`;
    // pool
    connection.query(CustomSql, function (error, results, fields) {
      console.log(results);
      res.status(200).json(results);
      //
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.
    });
  });
};
//

//Delete User
const deleteUser = async (req, res) => {
  pool.getConnection(function (err, connection) {
    //if (err) throw err; // not connected!
    if (err) throw new Error("Data base not connected"); // not connected!

    //var CustomSql = `SELECT * FROM Asssignment`;
    //console.log(req.params.id);
    var CustomSql = `DELETE FROM User WHERE User_ID = '${req.params.id}' `;
    // pool
    connection.query(CustomSql, function (error, results, fields) {
      console.log("deleteR", results);
      // When done with the connection, release it.
      res.status(200).json(results);
      //
      connection.release();

      // Handle error after the release.
      if (error) throw error;

      // Don't use the connection here, it has been returned to the pool.
    });
  });
  //
};
//

//Create Issue
const AddIssue = async (req, res) => {
  console.log(req.body);

  const FSE_ID = await req.body.ID;
  const Site_Name = req.body.Site_Name;
  const Product_Name = req.body.Product_Name;
  const Site_Location = req.body.Site_Location;
  const Start_Date = req.body.Start_Date;
  const End_Date = req.body.End_Date;
  const Modality_Type = req.body.Modality_Type;
  const Issue_Type = req.body.Issue_Type;
  const Status = req.body.Status;
  //
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!///
    ///
    var CustomSql = `INSERT Asssignment (Assigned_FSE, Site_Name, Product, Start_Date, End_Date, Site_Location, Modality_Type, Issue_Type, Status) VALUES ('${FSE_ID}','${Site_Name}','${Product_Name}','${Start_Date}','${End_Date}','${Site_Location}','${Modality_Type}','${Issue_Type}','${Status}')`;
    // pool
    connection.query(CustomSql, function (error, results, fields) {
      console.log(results);
      res.status(200).json({
        success: true,
        data: results,
        message: "Issue Added SUCESSFULY",
      });
      //
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.//
    });
  });
};

//Field service engineer authentication
//SignIn
const FSE_SignIn = (req, res) => {
  console.log("debug");
  try {
    if (!req.body.UserName || !req.body.User_Password) {
      const error = new Error("Missing credentials");
      error.status = 400; // Bad Request status code for missing data
      throw error; // Throw the error to jump to the catch block
      //next(error);
    }

    //
    pool.getConnection(function (err, connection) {
      console.log("pool");
      if (err) throw new Error("Data base not connected"); // not connected!
      //
      var CustomSql = `SELECT * From User`;
      //
      connection.query(CustomSql, async function (error, results, fields) {
        var string = JSON.stringify(results);
        var json = JSON.parse(string);
        // var user = json.filter((it) => it.User_Name === req.body.UserName);
        var user = json.find((u) => u.User_Name === req.body.UserName);
        //.find((user) => user.User_Name == req.body.User_Name);
        //console.log(user);
        //console.log(results);
        //console.log("debug");
        if (!user) {
          res.status(500).send({ error: "User not found" });
          console.log("User not found");
        } else {
          //console.log(user.User_Name);
          //res.send("User found");
          // Load hash from your password DB.
          var hash = user.User_Password;
          const match = await bcrypt.compare(req.body.User_Password, hash);

          if (match) {
            //login
            console.log("logedin");
            //res.redirect("/user");
            //return res.send("true");
            return res.status(200).json({
              Success: true,
              UserID: user.User_ID,
              UserName: user.User_Name,
            });
          }
          //console.log("In Correct Password");
          // res.status(500).send({ error: "In Correct Password" });
          //throw new Error("match not found"); // not connected!
          //res.send("false");
          //const error = new AppError("Requested resource not found");
          //next(error);
          //...
        }
        connection.release();

        // Handle error after the release.
        if (error) throw error;
        // res.send("Couldnt Found The User");
        // console.log("Couldnt Found The User");
        // Don't use the connection here, it has been returned to the pool.
      });
    });
  } catch (err) {
    //next(err);
    //res.status(400).send(err.message);
    console.log(err.message);
  }

  //
};
//
//

const getTodayIssues = async (req, res) => {
  //
  const FSE_ID = req.body.ID;
  //
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!///
    //
    var CustomSql = `SELECT * FROM Asssignment WHERE Assigned_FSE = '${FSE_ID}' AND End_Date = CURRENT_DATE() `;
    // pool
    connection.query(CustomSql, function (error, results, fields) {
      console.log(results);
      res.status(200).json(results);
      //
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.
    });
  });
};
//

module.exports = {
  AddUser,
  AddIssue,
  getAllUser,
  getAllIssue,
  deleteUser,
  FSE_SignIn,
  getTodayIssues,
};
