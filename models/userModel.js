const db = require('../config/db');

exports.createUser = async (email, password,first_name,last_name, fb_token) => {
    
    try{
          await db.execute('INSERT INTO users (email, password,first_name,last_name,FB_token) VALUES (?, ?,?,?,?)', 
            [email, password,first_name,last_name, fb_token]);
          
            const [rows] = await db.execute(
                'SELECT id FROM users WHERE email = ?',
                [email]
            );
    
            const userId = rows[0].id;
    
            console.log(`User created with ID: ${userId}`);
        return {
            id: userId,
            email:email,
            firstName: first_name,
            lastName: last_name
        };

    }catch(error){
        console.log(error.code);
        if(error.code === 'ER_DUP_ENTRY'){
            error.message = "Email "+email+" is already taken";
        }
        throw error;
    }
};

exports.findByEmail = async (email) => {
    
    const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    
    return user[0];
}; 

exports.updateFBToken = async (fb_token) => {
    const [rows] = await db.execute('update users set FB_token =?', [fb_token]);
    return rows[0];
};
