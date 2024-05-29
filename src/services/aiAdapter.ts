import { AiCallParams } from '@/types/types';
import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_ORGANIZATION = process.env.OPENAI_ORGANIZATION;
const OPENAI_PROJECT_ID = process.env.OPENAI_PROJECT_ID;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  organization: OPENAI_ORGANIZATION,
  project: OPENAI_PROJECT_ID
});

export async function callAI(callParams: AiCallParams) {
  try {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [{ role: 'user', content: callParams.content }],
      model: 'gpt-3.5-turbo'
    };

    const completion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);

    return completion.choices[0].message.content;
  } catch (err) {
    return (err as Error).message;
  }
}

export async function identifyCarByImageUrl(imgUrl: string) {
  try {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Describe el modelo y las características generales de este coche'
            },
            {
              type: 'image_url',
              image_url: {
                url: imgUrl
              }
            }
          ]
        }
      ]
    };
    const completion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);

    return completion.choices[0].message.content;
  } catch (err) {
    return (err as Error).message;
  }
}

export async function identifyCharacterByImageUrl(imgUrl: string) {
  try {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Describe personaje famoso que aparece en la foto y algo de su historia'
            },
            {
              type: 'image_url',
              image_url: {
                url: imgUrl
              }
            }
          ]
        }
      ]
    };
    const completion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);

    return completion.choices[0].message.content;
  } catch (err) {
    return (err as Error).message;
  }
}

export async function identifyCarByImageBase64(imgBase64: any) {
  try {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Describe el modelo y las características generales de este coche'
            },
            {
              type: 'image_url',
              image_url: {
                url: imgBase64
              }
            }
          ]
        }
      ]
    };
    const completion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);

    return completion.choices[0].message.content;
  } catch (err) {
    return (err as Error).message;
  }
}
