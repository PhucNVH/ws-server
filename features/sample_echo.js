/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function (controller) {
  const axios = require("axios");
  const server = process.env.SERVER_URI;

  const saveMessage = async (message) => {
    return await axios
      .post(`${server}/save-message`, {
        text: message.text,
        username: message.user,
        message_type: message.type,
        conversation_id: message.conversation
          ? message.conversation.id
          : message.reference.conversation.id,
      })
      .catch((e) => console.log(e));
  };

  controller.middleware.receive.use(async (bot, message, next) => {
    if (message.type === "message") {
      await saveMessage(message);
    }
    message.logged = true;
    next();
  });

  controller.middleware.send.use(async (bot, message, next) => {
    if (message.type === "message") {
      message.user = "bot";
      saveMessage(message);
    }
    message.logged = true;
    next();
  });

  controller.on("load_message", async (bot, message) => {
    const val = await axios.post(`${server}/load-conversation`, {
      conversation_id: message.user,
    });
    if (val.data.messages) {
      await bot.reply(message, {
        messages: val.data.messages,
        type: "load_message",
      });
    }
  });

  controller.on("feedback", async (bot, message) => {
    await axios.post(`${server}/add-feedback`, {
      conversation_id: message.reference.conversation.id,
      feedback: message.text,
      index: message.index,
    });
  });

  controller.on("message,direct_message", async (bot, message) => {
    console.log(message);
    const resp = await axios
      .post(`${server}/get-response`, {
        conversation_id: message.reference.conversation.id,
        message: message.text,
      })
      .then((res) => res.data)
      .catch((e) => console.log(e));
    if (resp) {
      console.log(resp);
      bot.reply(message, { text: resp.response });
    }
  });
};
