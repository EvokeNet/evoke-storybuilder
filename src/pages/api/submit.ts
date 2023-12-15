import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from "openai"

type Data = {
  body: string | any
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const callAssistant = async form => {
  const assistant = await client.beta.assistants.retrieve(process.env.OPENAI_ASSISTANT_ID as any)
  const thread = await client.beta.threads.create()

  const prompt = 
    `
    Relax, take a breathe and let's create a story.
    `

  const message = await client.beta.threads.messages.create(
    thread.id,
    {
      role: "user",
      content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
    }
  );
  
  const run = await client.beta.threads.runs.create(
    thread.id,
    { 
      assistant_id: assistant.id,
      instructions: "Please address the user as Jane Doe. The user has a premium account."
    }
  );

  const messages = await client.beta.threads.messages.list(
    thread.id
  );

  return prompt
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const response = callAssistant(req.body)
    res.status(200).json({ body: response })
}
