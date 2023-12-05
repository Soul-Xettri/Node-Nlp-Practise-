const { NlpManager } = require("node-nlp");
const express  = require("express");
const trainNlp = require('./train-nlp')
const app = express();

const manager = new NlpManager({ languages: ["en"], forceNER: true });

// Train and save the model.
(async () => {
  await trainNlp(manager);
  await manager.train();
  await manager.save();
  //routes
  app.get("/bot", async (req, res) => {
    await manager.process("en", req.query.message);
  });
  app.listen(3000);
})();
