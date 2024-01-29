const User = require('./User');
const Chat = require('./Chat');

// Create relations between user and chat
// Make sure that user chat is connected to user by user_id and if user gets deleted, chats get deleted as well
User.hasMany(Chat, {
    foreignKey: 'user_id',
    onDelete: 'Cascade'
});

// use foreign key from the user to get chat and user connected
Chat.belongsTo(User, {
    foreignKey: 'user_id'
});

