const Messages = require('../models/messagesModel');


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