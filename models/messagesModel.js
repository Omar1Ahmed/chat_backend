const db = require('../config/db');

exports.fetchAllmessages = async (user_one, user_two) =>{
    
    const chat_id = await fetchChatId(user_one, user_two);
    
        const [messages] = await db.execute('select * from messages where chat_id = ? order by created_at',[chat_id]);
    
    console.log(messages);
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