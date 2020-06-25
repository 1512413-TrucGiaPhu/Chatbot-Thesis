const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    userId:{ type: String, default: null },
    created: { type: Date, default: Date.now },
    dialog: []
})


module.exports = mongoose.model('Conversation', ConversationSchema);