// Import necessary types from Next.js for API requests and responses
import type { NextApiRequest, NextApiResponse } from "next";
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
const callAssistant = async (form) => {
  // Retrieve the assistant configuration using the assistant ID
  const assistant = await client.beta.assistants.retrieve(
    process.env.OPENAI_ASSISTANT_ID as any
  );
    // Create a new thread for the conversation
    const thread = await client.beta.threads.create();

  // Construct the prompt with dynamic content based on the input form
  const prompt = `
    Relax, take a breathe and let's create a beautiful story.
    Make sure it has our pedagogical model and skills framework as a base structure. 
    Make it engaging, follow the 7-point story principle and the Hero's Journey formula. Present the story week-by-week not by each 7-point step. Be verbose with at least a paragraph per point.
    This story must be divided in ${form.campaignDuration} weeks, each part of the story comprising a whole week of work. We call the weeks "missions".
    While writing it, please add "Mission X - NAME OF MISSION" as a header for each story part, changing "X" for the week's number and "name of mission" for an adequate title.
    It will be for ${form.targetGroup}, so the language ant themes should reflect it. Also, please make sure the weekly missions should consider ${form.campaignFrequency} hours of dedication per week.
    The theme for this story will be ${form.grandChallenge} and everything mus be aligned to this theme. Output in markdown. Do not write about yourself or use the first person voice.
    `;

   // Send the prompt as a message to the thread with a user role
  const message = await client.beta.threads.messages.create(thread.id, {
    role: "user",
    content: prompt,
  });

  // Create a run with instructions for the assistant's behavior
  const run = await client.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions: "You are a storywriter for games that teach skills for solving global grand challenges. You will write a detailed script for a graphic novel in the ENGLISH language. You will employ a seven-point storytelling technique and will clearly label element/each step in my response. I will also return a summary list of the characters in the story and their descriptions.",
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
  // Call the assistant with the request body parsed as JSON
  const response = await callAssistant(JSON.parse(req.body));
  // Respond with the generated content
  res.status(200).json({ body: response });
}