const db = require('../config/db');

exports.fetchAllmessages = async (user_one, user_two) =>{
    
    const chat_id = await fetchChatId(user_one, user_two);
    
        const [messages] = await db.execute('select * from messages where chat_id = ? order by created_at',[chat_id]);
    
        
    return messages;
   
}


fetchChatId = async (user_one, user_two) => {

    try{
        const [rows] = await db.execute('SELECT chat_id FROM chats WHERE (user_one = ? AND user_two = ?) OR (user_one = ? AND user_two = ?)',
                [user_one, user_two, user_two, user_one]);
    
                if (rows.length > 0) {
                    
                    return rows[0].chat_id; 
                } else {
                    await db.execute('insert into chats (user_one, user_two) values (?,?)',[user_one, user_two]);
                    
            const [rows] = await db.execute('SELECT chat_id FROM chats WHERE (user_one = ? AND user_two = ?)',
                [user_one, user_two]);
    
                return rows[0].chat_id;
                }
            } catch (error) {
                console.error(error);
                throw new Error("Error fetching chat ID");
            }
}



exports.insertMessage = async (chat_id,sender_id, content) => {
    try {


       await db.execute(
        'INSERT INTO messages (chat_id, sender_id, content) VALUES (?, ?, ?)',
        [chat_id, sender_id, content]
      );
  
      return { success: true, message: "Message inserted successfully" };

    } catch (error) {
      console.error(error);
      throw new Error("Error inserting message");
    }
  };



exports.otherUserFBToken = async (chat_id,sender_id) => {
    try {


       const [res] =await db.execute(
        'select user_one,user_two from chats where chat_id = ?',
        [chat_id]
      );

       var  reciever_id = '';
      
      if(res[0].user_one === sender_id){
        reciever_id= res[0].user_two;
        
      }else{
        reciever_id= res[0].user_one;
      }

      const [fb_token] = await db.execute(
        'select FB_token from users where id = ?',
        [reciever_id]
      );

      
      return fb_token[0].FB_token;

    } catch (error) {
      console.error(error);
      throw new Error("Error inserting message");
    }
  };


  