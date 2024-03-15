// Import necessary types from Next.js for API requests and responses
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

// Import the OpenAI SDK
import OpenAI from "openai";

// Define the structure for the API response data
type Data = {
  body: string | any;
};

// Initialize the OpenAI client with an API key
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to check the status of a thread until it's completed
async function checkThreadStatus(thread, run) {
  const runStatus = await client.beta.threads.runs.retrieve(thread.id, run.id);
  // Recursively checks if the run is completed
  return runStatus.status === "completed"
    ? true
    : checkThreadStatus(thread, run);
}

// Main function to call the assistant and generate content based on the provided form
const callAssistant = async (form, lastStory) => {
  // Retrieve the assistant configuration using the assistant ID
  const assistant = await client.beta.assistants.retrieve(
    process.env.OPENAI_ASSISTANT_ID as any
  );
  // Create a new thread for the conversation
  const thread = await client.beta.threads.create();

  // Construct the prompt with dynamic content based on the input form
  const prompt = `
    Relax, take a deep breathe and let's write a simulation of a few minutes, in 4 paragraphs.
    ${
      lastStory
        ? `Last time, we wrote: ${lastStory}, so continue from here.`
        : "This is the introduction of the simulation, so it needs to be exciting and leave a cliffhanger to the next part."
    }
    The world of the simulation is ${form.storyWorld}. It is a ${
    form.storyGenre
  } story.
    This simulation should revolve around the theme of ${
      form.storyGrandChallenge
    }, always following the 7-part story arch. Also, make sure to include the Hero's Journey as a structure for the story.
    During the development of the simulation, the main character will face the following challenges: ${
      form.storyThreats
    }.
    The simulation should not be super broad, it should focus on a specific topic at a time, displaying a slow pace of development. Also, make sure to describe character's actions and dialogs with detail.
    **Importat: never end the story. Always leave a cliffhanger for the next part.
    **Important: always return content in JSON in a single line following the structure {"title": "The title of the story", "content": "The content of the story in pure text with no line breaks or /n"}.
    **Important: never add any other text to the response or describe your actions.
    `;

  // Send the prompt as a message to the thread with a user role
  const message = await client.beta.threads.messages.create(thread.id, {
    role: "user",
    content: prompt,
  });

  // Create a run with instructions for the assistant's behavior
  const run = await client.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions:
      "You are a storywriter for games that teach skills for solving global grand challenges. You will write an engaging story for a campaign in the ENGLISH language. Do not write about yourself, unless you are writing about the character of the story.",
  });

  // Wait for the thread to complete
  await checkThreadStatus(thread, run);

  // Retrieve the messages from the thread
  const messages: any = await client.beta.threads.messages.list(thread.id);

  // Return the content of the first message
  return messages.body.data[0].content;
};

// API handler function for Next.js
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();

  // Call the assistant with the request body parsed as JSON
  const params = JSON.parse(req.body);
  let lastStory = null;

  const storyParts = await prisma.story.findMany({
    where: {
      campaignId: Number(params.campaignId),
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });

  if (storyParts.length > 0) {
    lastStory = storyParts[0].content;
  }

  const response = await callAssistant(params, lastStory);
  const newStory = JSON.parse(response[0].text.value);

  // Save pedagogical document to database
  const story = await prisma.story.create({
    data: {
      title: newStory.title,
      content: newStory.content,
      campaign: {
        connect: {
          id: Number(params.campaignId),
        },
      },
    },
  });

  // Respond with the generated content
  res.status(200).json({ body: story });
}
