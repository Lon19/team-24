const API_AI_TOKEN = "c0899603910b44bdaa5a55d70ef4758c";
const apiAiClient = require("apiai")(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = "EAAJRmWXsZA1gBAJk6sZCpZAwJdeBMJxWKfVmjxZBxewCKxNzkOMCiQcQZCW5s2KnAKout6MmPlx5ppGh6hZBuZBRfZBZBiImB8jC1LAZAlNYZBP1ZBXJe4aJatEFQmyqpj23WcBRwSyMv2ZAOGmTt8r79Ye5YEqans4jrNHx7jzo081h5838wdrfJN4gZB";
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
