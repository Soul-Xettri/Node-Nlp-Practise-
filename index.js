const { NlpManager } = require("node-nlp");
const express = require("express");
const trainNlp = require('./train-nlp');
const app = express();

const manager = new NlpManager({ languages: ["en"], forceNER: true });

// Train and save the model.
(async () => {
  try {
    await trainNlp(manager);
    await manager.train();
    await manager.save();

    // Routes
    app.get("/bot", async (req, res) => {
      const response = await manager.process("en", req.query.message);
      res.send(response.answer);
    });

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Error:", error);
  }
})();
