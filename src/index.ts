const dotenv = require('dotenv');
dotenv.config();

import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { identifyCharacterByImageUrl } from './services/aiAdapter';

const TELEGRAM_API_KEY =
  process.env.TELEGRAM_API_KEY || 'Your telegram bot api key';

const bot = new Telegraf(TELEGRAM_API_KEY);

bot.start((chat) => {
  chat.reply(
    'Buenas!, Puedes mandarme fotos de personajes famosos y tratare de identificarlos!'
  );
});

bot.command('quit', async (ctx) => {
  // Using context shortcut
  await ctx.leaveChat();
});

bot.on(message('photo'), async (ctx) => {
  console.log(ctx.message.photo);
  if (ctx.message.photo && ctx.message.photo.length > 0) {
    const imageId = ctx.message.photo.pop()!.file_id;
    const imageLink = await ctx.telegram.getFileLink(imageId);
    if (imageLink) {
      ctx.reply('Dejame ver...');
      let response = await identifyCharacterByImageUrl(imageLink.toString());
      ctx.reply(
        response || 'No he podido identificar nada 😣, mandame otra foto!'
      );
    }
  }
});

bot.launch();
console.log('QuienEraEseBot esta en marcha!');
