/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
module.exports = function (controller) {
  // use a function to match a condition in the message
  const randomPick = (options)=>{
    var index = Math.floor(Math.random() * options.length);
  return options[index];
  }
  controller.hears(
    async (message) => message.text && message.text.toLowerCase().includes("buồn"),
    ["message"],
    async (bot, message) => {
      await bot.reply(message, randomPick(['Có chuyện gì làm bạn buồn vậy',"Bạn có tâm sự gì ư","Tại sao vậy"]));
    }
  );

  // use a regular expression to match the text of the message
  controller.hears(
    async (message) => message.text && message.text.toLowerCase().includes("vui"),
    ["message", "direct_message"],
    async function (bot, message) {
      await bot.reply(message, {
        text: randomPick(["Hôm nay bạn có chuyện vui gì thế ","chuyện gì vui ấy kể mình xem nào","kể mình nghe với"]),
      });
    }
  );

  // match any one of set of mixed patterns like a string, a regular expression
  controller.hears(
    async (message) => message.text && message.text.toLowerCase().includes("chán"),
    ["message", "direct_message"],
    async function (bot, message) {
      await bot.reply(message, { text: randomPick(["bạn đã thử đi gặp bạn bè chưa?","chơi thể thao sẽ làm bạn bớt chán đó","đi tập thể thao đi, bạn sẽ thấy vui hơn"]) });
    }
  );

  controller.hears(
    async (message) => message.text && message.text.toLowerCase().includes("bye"),
    ["message", "direct_message"],
    async function (bot, message) {
      await bot.reply(message, { text: randomPick(["Bye!!","Chào bạn","Hôm sau mình nói chuyện tiếp nhé"]) });
    }
  );

};
