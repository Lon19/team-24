const API_AI_TOKEN = "f12e79a8f95e4deb97bdb804be594c4e";
const apiAiClient = require("apiai")(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = "EAAJZBmXpZBJrUBAIU60ZCWO90tgOfejVXbLREPo97Xm51uTxHxNInbiiryG4QlFD9oeEwN5Aqtu4E9MxiYJstOgBQ27yb0D6pl95VbbVBtQVGVexJlNj9JutmcZCy7dM7vXfBEZCnvyXZAkxZBLXOpu402yowmpXisychYDWn6o7izELJTy4v1F";
const request = require("request");
const sendTextMessage = (senderId, text) => {
 request({
 url: "https://graph.facebook.com/v2.6/me/messages",
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: "POST",
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};
module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: "crowdbotics_bot"});
apiaiSession.on("response", (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on("error", error => console.log(error));
 apiaiSession.end();
};
