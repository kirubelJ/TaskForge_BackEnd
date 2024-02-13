const { pool } = require("../DatabaseConf/mysqlConf");



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

module.exports = {
  AddIssue,
  getAllUser,
};
