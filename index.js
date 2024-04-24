
const express = require('express'); 
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyparser.json());

//connection mysql database
const db= mysql.createConnection({
    host:'localhost', //running xaamp in localhost
    user:'root', //to run as an administrator
    password:'',
    database:'EcoCarApp', //name of the database
    port:3306 //port number from Xamp
});

//check if database connection is successfull
db.connect(err => {
    if(err){console.log('err')}
    else{
    console.log('Eco Car App Database Connected Successfully!!!');
    }
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
  
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error during signup' });
      }
      res.json({ message: 'Signup successful' });
    });
  });
  
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error during login' });
      }
  
      if (results.length > 0) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials or username does not exist' });
      }
    });
  });

  app.get('/getAllUsernames',(req,res) => {

    const query = `SELECT username FROM users`;
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const columnValues = results.map(result => result.username);
        res.json({ columnValues });
      }
    });
    
    
    });

    app.post('/booking', (req,res)=>{
      const { username, datetime,car, amount,trans_date } = req.body;
      const insertQuery = `INSERT INTO bookings (username, userId, datetime,car, amount,trans_date)
      SELECT u.username, u.userId, ?, ?,?,?
      FROM users u
      WHERE u.username = username;
      `;
    
            db.query(insertQuery, [datetime,car, amount,trans_date], (insertErr, insertResults) => {
              if (insertErr) {
                console.error('Error inserting booking details:', insertErr);
                res.status(500).json({ message: 'Booking failed' });
              } else {
                console.log('Booking successful');
                res.status(200).json({ message: 'Booking successful' });
              }
            });
          }
        
    );

    app.put('/changePass', (req, res) => {
      const username = req.body.username;
      const newPassword = req.body.newPassword;
    
      db.query(`UPDATE users SET password=? WHERE username = ?`, [newPassword, username], (err, results) => {
        if (err) {
          console.error('Error updating password:', err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }
    
        if (results.affectedRows > 0) {
          console.log('Password updated successfully');
          res.status(200).json({ success: true, message: 'Successfully updated password' });
        } else {
          console.error('No rows affected. Password not updated.');
          res.status(400).json({ success: false, message: 'Failed to update password' });
        }
      });
    });

//running the server in the port 3000 because usually backende is run on this port
//mysql port 3306
//backend server port 3000 - fetching the data from sql and displays the data to the fron end
//fronend(Angular) port 4200

app.listen(3000, ()=> {
    console.log("server is running on 3000 PORT", );
});