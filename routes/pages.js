const express= require("express");
let mysql = require('mysql');
const router = express.Router();
var app =express();
 
var bodyParser = require('body-parser');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '',
    database: 'kian_task'
  });




  // Get All Employees
  router.get('/employees', (req, res)=> {
    let sql = 'SELECT *  FROM employees ';
    db.query(sql, (err, result)=> {
      if (err) {
        throw err;
      } 
      if (result.length>0){
        res.send({
          message:'All Employees Data',
          data:result
        });
      }else{
        res.send({
            message:'NO Employees Data',
        });
      }
    });
  });
  

  //Get Employee Data
router.get('/employees/:id', (req, res)=> {
    let id =req.params.id;
    let sql = 'SELECT *  FROM employees WHERE id = ?';
  
    db.query(sql,[id], (err, result)=> {
        if (err){
            throw err;
        } 
        if (result.length>0){
            res.send({
                message:'Employee Data',
                data:result
            });
        }
        else {
            res.send({
                message:'NO Employee Data with this ID',
            });
        }
    });
});

   

//Add Employee Data
router.post('/employees',(req, res)=> {
  
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var userName = req.body.userName;
    var isActive = req.body.isActive==true? 1:0;

    var sql = `insert into employees(firstName,lastName,userName,isActive)values('${firstName}','${lastName}','${userName}','${isActive}')`;
    db.query(sql,(err, result)=> {
        if (err){
            throw err; 
        }else{
            res.send({    
                message:'Data Inserted', 
               
            });
        }
      });
    });


// UPdate Employee Data

router.put('/employees/:id', (req, res)=> {
    var id = req.params.id ;

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var userName = req.body.userName;
    var isActive = req.body.isActive==true? 1:0;
    console.log(id);
 
    var sql = `UPDATE employees SET firstName='${firstName}',lastName='${lastName}',userName='${userName}',isActive='${isActive}' WHERE id= ${id} `
      db.query(sql, (err, result) =>{
        if (err) {
          throw err;         
        } else {
            res.send({    
                message:'Data updated', 
                data:result
                
            });
        }
      })
    });


    // Delete Employee Data
    router.delete('/employees/:id', (req, res)=> {

       sql = ` delete FROM employees WHERE ID = '${req.params.id}'`;
        db.query(sql,(err, result) =>{
          
            if (err) {
              throw err;
            } else {
                res.send({    
                    message:'Data Delated', 
                    
                });
        }
        })
      });

      
  module.exports = router;