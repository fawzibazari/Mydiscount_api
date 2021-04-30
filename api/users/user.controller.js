const { create, getUserByUserId, getUsers, updateUser, deleteUser, getUserByUserEmail } = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt")
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req,res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "probléme de connection a la bdd"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    massage: "pas trouver"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        })
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            success: 1,
            data: results
          });
        });
      },
      updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            success: 1,
            message: "mise a jour compléte"
          });
        });
      },
      deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "Record Not Found"
            });
          }
          return res.json({
            success: 1,
            message: "utlilisateur supprimer"
          });
        });
      },
      login: (req,res) => {
          const body = req.body;
          getUserByUserEmail(body.email, (err,results) => {
              if (err) {
                  console.log(err);
              }
              if (!results) {
                  return res.json ({
                      success: 0,
                      data: "email ou mdp corompue"
                  });
              }
              const result = compareSync(body.password, results.password);
              if (result) {
                  results.password = undefined;
                  const jsonwebtoken = sign({ result: results }, "qwe1234", {
                      expiresIn: "1h"
                  });
                  return res.json({
                      success: 1,
                      message: "vous etes connectez",
                      token: jsonwebtoken
                  });
              } else {
                  return res.json({
                      success: 0,
                      data: "email ou mdp corompue"
                  });
              }
          });
      }
}