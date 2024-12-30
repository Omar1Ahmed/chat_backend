const Messages = require('../models/messagesModel');
const { sendNotification } = require('../NotificationService'); // Path to your file


exports.getAllmessages = async(req, res)=>{

    const {selected_userId} = req.body;
   try{

    const messages = await Messages.fetchAllmessages(selected_userId, req.user.id);
    
     
    res.status(201).json({
        messagesData : messages,
        Message: 'Messages fetched successfully'
    });

    }catch(error){
    
        res.status(201).json({
            error_code: error.error_code,
            Message: 'Failed fetching messages',
            error: error.Messages        
        });
        
    }
}



exports.sendMessage = async (req, res) => {
    const { chat_id,content } = req.body;
    try {
      
        
        await Messages.insertMessage(chat_id, req.user.id, content);
  
        const fb_token = await Messages.otherUserFBToken(chat_id,req.user.id);
console.log(fb_token);
        await sendNotification(fb_token,'New Message from'+req.user.firs_name,content);

      res.status(201).json({
        Message: 'Message sent successfully',
      });
    } catch (error) {
      res.status(500).json({
        error_code: error.error_code || 500,
        Message: 'Failed to send message',
        error: error.message,
      });
    }
  };