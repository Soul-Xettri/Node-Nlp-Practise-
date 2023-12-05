const { NlpManager } = require("node-nlp");
const express  = require("express");
const manager = new NlpManager({ languages: ["en"], forceNER: true });
const app = express();

// Adds the utterances and intents for the NLP
manager.addDocument("en", "goodbye for now", "greetings.bye");
manager.addDocument("en", "bye bye take care", "greetings.bye");
manager.addDocument("en", "okay see you later", "greetings.bye");
manager.addDocument("en", "bye for now", "greetings.bye");
manager.addDocument("en", "i must go", "greetings.bye");
manager.addDocument("en", "hello", "greetings.hello");
manager.addDocument("en", "hi", "greetings.hello");
manager.addDocument("en", "howdy", "greetings.hello");

// Add Answer
manager.addAnswer("en", "greetings.bye", "Till next time");
manager.addAnswer("en", "greetings.bye", "see you soon!");
manager.addAnswer("en", "greetings.hello", "Hey there!");
manager.addAnswer("en", "greetings.hello", "Greetings!");

// Train and save the model.
(async () => {
  await manager.train();
  manager.save();
  //routes
  app.get("/bot", async (req, res) => {
    const response = await manager.process("en", req.query.message);
    res.send(response.answer || 'Please rephrase your message');
  });
  app.listen(3000);
})();
