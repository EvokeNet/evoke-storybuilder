/** Comment from John:

I suggest using the 'system' and 'agent' capabilities of the OpenAI API before passing on the 'user' text.

So, for the 'system,' I would set the role and personality/tone the AI will generate.

For 'agent,' I have it repeat back a promise in the form of "I will do X ..." -- this seems to generate better responses for me.

And then for 'user,' you can include rest of the text in the prompt.

I also suggest adding a temperature slider in the form to provide more experimental wriggle room for the AI to express "creative" ideas.

*/


import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from "openai"

type Data = {
  body: string | any
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function checkThreadStatus(thread, run) {
  const runStatus = await client.beta.threads.runs.retrieve(
    thread.id,
    run.id
  );
  return runStatus.status === 'completed' ? true : checkThreadStatus(thread, run)
}

const callAssistant = async form => {
  const assistant = await client.beta.assistants.retrieve(process.env.OPENAI_ASSISTANT_ID as any)
  const thread = await client.beta.threads.create()

  const prompt =
    `
    Relax, take a breathe and let's create a beautiful story.
    
    Make sure it has our pedagogical model and skills framework as a base structure.

    Please, make it engaging, follow the 7-point story principle and the Hero's Journey formula. Paragraphs should be as concise as possible, but beware not to lose context or meaning while trimming them down.

    This story must be divided in ${form.campaignDuration} weeks, each part of the story comprising a whole week of work. We call the weeks "missions".

    While writing it, please add "Week X - name of mission" as a header for each story part, changing "X" for the week's number and "name of mission" for an adequate title.

    It will be for ${form.targetGroup}, so the language ant themes should reflect it. Also, please make sure the weekly missions should consider ${form.campaignFrequency} hours of dedication per week.

    The theme for this story will be ${form.grandChallenge} and everything mus be aligned to it.

    `

    const message = await client.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: prompt
      }
    );

    const run = await client.beta.threads.runs.create(
      thread.id,
      { 
        assistant_id: assistant.id,
        instructions: "Please address the user as a partner, with respect, cordiality and good humor."
      }
    );

    await checkThreadStatus(thread, run)

    const messages : any = await client.beta.threads.messages.list(
      thread.id
    );

    return messages.body.data[0].content

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const response = await callAssistant(JSON.parse(req.body))
    res.status(200).json({ body: response })
}
