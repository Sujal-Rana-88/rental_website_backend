const mysql = require("mysql2")
const config = require("./config")


const connectDB = async () => {
    try {
        const pool = mysql.createPool(config);
        pool.getConnection((err, connection) => { 
            if (err) { 
                console.error('Database connection error:', err); 
                return;  
            }
            console.log("Connected to MySQL Database");
            connection.release();
        });
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};


module.exports = connectDB;