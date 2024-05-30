const dotenv = require('dotenv');
dotenv.config();

import { Input, Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import {
  identifyCarByImageUrl,
  identifyCharacterByImageUrl
} from './services/aiAdapter';

const TELEGRAM_API_KEY =
  process.env.TELEGRAM_API_KEY || 'Your telegram bot api key';

const bot = new Telegraf(TELEGRAM_API_KEY);

bot.start((chat) => {
  chat.reply(
    '¡Un placer conocerte! 🖐🏻, Puedes mandarme fotos de coches y trataré de identificar el modelo y algunas de sus características.\n Tengo que comentarte también que solo soy un prototipo y puedo dejar de prestar servicio o estar caído, para más información contactame en: https://mzrdeveloper.com/.'
  );
});

bot.command('quit', async (ctx) => {
  // Using context shortcut
  await ctx.leaveChat();
});

bot.on(message('text'), async (ctx) => {
  console.log(ctx.message.text);
  if (ctx.message.text && ctx.message.text.toLowerCase().includes('hola')) {
    ctx.reply(
      '¡Hola!, Puedes mandarme fotos de coches y trataré de identificar el modelo y algunas de sus características.\n Tengo que comentarte también que solo soy un prototipo y puedo dejar de prestar servicio o estar caído, para más información contactame en: https://mzrdeveloper.com/.'
    );
  } else {
    ctx.reply(
      '😣 Lo siento no estoy programado para leer texto aun, mándame una foto y trataré de identificar el modelo de coche.'
    );
  }
});

bot.on(message('photo'), async (ctx) => {
  console.log(ctx.message.photo);
  if (ctx.message.photo && ctx.message.photo.length > 0) {
    const imageId = ctx.message.photo.pop()!.file_id;
    const imageLink = await ctx.telegram.getFileLink(imageId);
    if (imageLink) {
      ctx.reply('Déjame  ver...');
      let response = await identifyCarByImageUrl(imageLink.toString(), true);
      if (Buffer.isBuffer(response)) {
        await ctx.replyWithVoice(Input.fromBuffer(response));
      } else if (typeof response === 'string') {
        ctx.reply(
          response || 'No he podido identificar nada 😣, ¡mándame otra foto!'
        );
      } else {
        ctx.reply('No he podido identificar nada 😣, ¡mándame otra foto!');
      }
    }
  }
});

bot.launch();
console.log('¡QueCocheEs está en marcha!');
