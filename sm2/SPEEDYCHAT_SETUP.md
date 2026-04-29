# SpeedyChat Setup Guide

SpeedyChat is a witty AI chatbot powered by OpenAI's GPT-4o Mini, featuring Speedy the bird mascot.

## Setup Instructions

### 1. Get an OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in to your OpenAI account
3. Create a new API key
4. Copy the key

### 2. Set Environment Variable

Create a `.env.local` file in the project root:

```bash
OPENAI_API_KEY=sk_your_api_key_here
```

Or set it in your deployment platform (Vercel, etc.)

### 3. Access SpeedyChat

- **Local**: http://localhost:3000/chat
- **Navigation**: Click "SpeedyChat" in the navbar on any page

## Features

✨ **Speedy's Personality**
- Absurdly funny with bird-related puns
- Obsessed with keeping things CLEAN
- Refuses to engage in crude language
- Always helpful about SpeedyMat services

🐦 **Full-Featured Chatbot**
- Multiple chat sessions with history
- Rename and delete conversations
- Settings panel
- Real-time message streaming
- LocalStorage persistence

🤖 **AI Model**
- GPT-4o Mini (fast & efficient)
- Temperature: 0.9 (very creative)
- Max tokens: 500 per response

## Speedy's Humor Style

Speedy makes jokes like:
- "I'm not just any bird, I'm a SPEEDY bird. My feathers are so clean they could reflect a mirror's reflection!"
- "Dirty laundry? More like DIRTY-LAUNDRY-THAT-WILL-BE-CLEAN-IN-24-HOURS!"
- "I've got a bird's eye view of your laundry situation, and let me tell you, it's looking TWEET!"

## Troubleshooting

**"OpenAI API key not configured"**
- Make sure `OPENAI_API_KEY` is set in `.env.local`
- Restart the dev server after setting the env var

**Chat not responding**
- Check that your OpenAI API key is valid
- Verify you have API credits in your OpenAI account
- Check browser console for errors

## Customization

Edit `app/api/chat/route.ts` to modify:
- `SPEEDY_SYSTEM_PROMPT` - Speedy's personality
- `temperature` - Creativity level (0-2)
- `max_tokens` - Response length
- `model` - AI model used

Enjoy chatting with Speedy! 🐦
