const { pool } = require("../DatabaseConf/mysqlConf");

//Create Issue
const AddUser = async (req, res) => {
  console.log(req.body);

  const ID = req.body.ID;
  const Name = req.body.Name; //assigned field service engineer
  const Role = req.body.Role;
  //
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!///
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // var sql =
    //   "INSERT User (User_FirstName, User_LastName, User_Email, User_PhoneNuber) VALUES ('','','','')";
    var CustomSql = `INSERT User (User_I_ID, 	User_Name, User_Role ) VALUES ('${ID}','${Name}','${Role}')`;
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

module.exports = {
  AddUser,
  AddIssue,
  getAllUser,
  getAllIssue,
  deleteUser,
};
