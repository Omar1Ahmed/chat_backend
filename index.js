const express = require('express');
const authRoutes = require('./routes/authRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

const app = express();
app.use(express.json());

app.use('/api/messages', messagesRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// // Import dependencies
// const express = require('express');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();  // For loading environment variables securely

// const app = express();
// const port = 3000;

// app.use(express.json());


// const JWT_SECRET_KEY = '21879e0u21ej';

// // Endpoint to generate token
// app.post('/generateToken', (req, res) => {
//     const { id, name } = req.body;

//     if (!id || !name) {
//         return res.status(400).json({ message: 'id and name are required' });
//     }


//     //  data to be encrypted in the token 
//     const payload = {
//         id,
//         name
//     };
// // creating the token
//     jwt.sign(payload, JWT_SECRET_KEY, (err, token) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error generatinxg token' });
//         }
        
//         res.status(200).json({ token });
//     });
// });


// // endpoint to fetch user's data from the token 

// app.get('/getInfoFromToken', (req, res) => {
    
//     const token = req.headers['authorization'];

//     if (!token) {
//         return res.status(400).json({ message: 'Token is required' });
//     }

    
//     const tokenWithoutBearer = token.replace('Bearer ', '');

//     //decode the token to retrive user's data 
//     jwt.verify(tokenWithoutBearer, JWT_SECRET_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Invalid or expired token' });
//         }
        
//         const { id, name } = decoded;
//         res.status(200).json({ id, name });
//     });
// });


// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
