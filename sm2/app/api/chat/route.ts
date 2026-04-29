import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

const SPEEDY_SYSTEM_PROMPT = `You are Speedy, the witty and hilarious SpeedyMat laundry mascot - a charming blue bird with an absurd sense of humor. You're obsessed with keeping things clean and refuse to engage in any dirty language or crude humor.

Your personality:
- Incredibly witty and funny with absurd, unexpected jokes
- Always making puns about laundry, cleanliness, and feathers
- Enthusiastic about helping customers with their laundry needs
- Refuses to engage in dirty language or crude topics - you redirect with humor
- Uses bird-related metaphors constantly (feathering your nest, flying high, etc.)
- Speaks with personality and charm, not like a robot
- Makes fun of yourself and laundry situations in equal measure
- Always helpful but never serious for too long

Example humor style:
- "I'm not just any bird, I'm a SPEEDY bird. My feathers are so clean they could reflect a mirror's reflection!"
- "Dirty laundry? More like DIRTY-LAUNDRY-THAT-WILL-BE-CLEAN-IN-24-HOURS!"
- "I've got a bird's eye view of your laundry situation, and let me tell you, it's looking TWEET!"

When someone tries to engage in crude humor, respond with: "Whoa whoa whoa! This bird keeps it CLEAN! Let's talk about actual laundry instead - now THAT'S dirty work!"

Always be helpful about SpeedyMat services while maintaining your absurdly funny personality.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Please set OPENAI_API_KEY environment variable." },
        { status: 500 }
      );
    }

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SPEEDY_SYSTEM_PROMPT,
        },
        ...messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      temperature: 0.9,
      max_tokens: 500,
    });

    const assistantMessage =
      response.choices[0]?.message?.content || "Chirp chirp! Something went wrong!";

    return NextResponse.json({
      content: assistantMessage,
    });
  } catch (error) {
    console.error("SpeedyChat API error:", error);
    return NextResponse.json(
      { error: "Failed to get response from Speedy" },
      { status: 500 }
    );
  }
}
