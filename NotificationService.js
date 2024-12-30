const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();


  try {

    const base64Key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    
    if (!base64Key) {
      throw new Error('Firebase service account key not found in environment variable.');
    }

    

    const serviceAccount = JSON.parse(Buffer.from(base64Key, 'base64').toString('utf-8'));


    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_POJECTID

    });

    console.log('Firebase initialized');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }


  exports.sendNotification = async (fcmToken, title, body) =>{
  
  
  const message = {
    // token: fcmToken,  // The recipient device's FCM token
    topic:'lol',
    notification: {
      title: title,    // Notification title
      body: body,      // Notification body
    },
  };

  try{
    
    const response = await admin.messaging().send(message);
    
    console.log('Successfully sent message:', response);
    } catch (error) {
    console.error('Error sending message:', error);
    }

} 
