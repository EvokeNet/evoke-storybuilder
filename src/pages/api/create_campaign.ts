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
const callAssistant = async (form) => {
  // Retrieve the assistant configuration using the assistant ID
  const assistant = await client.beta.assistants.retrieve(
    process.env.OPENAI_ASSISTANT_ID as any
  );
  // Create a new thread for the conversation
  const thread = await client.beta.threads.create();

  // Construct the prompt with dynamic content based on the input form
  const prompt = `
    Relax, take a breathe and let's create a very clear pedagogical plan to implement a campaign, which is an implementation of Evoke at a specific location, for a defined target group with some environment limitations.
    Make sure it has our pedagogical model and skills framework as a base structure. 
    Make it engaging, add important information for educators that will implement it. Be verbose with at least a paragraph per point.
    The content structure for this plan is always as follows, which you will use as a header for each section: skills included, weeks, environment limitations, devices, and activities. As the activities, you must provide ideas on how facilitators can implement the campaign in their scenario, including the use of technology, how to measure the outputs and outcomes of each activity, roles involved and courses of action. While writing the main content, please add "Mission X - NAME OF MISSION" as a header for each part, changing "X" for the week's number and "name of mission" for an adequate title.
    This plan must contain ${form.campaignDuration} weeks, each week incorporating guides and ideas on how to implement the campaign. We call the weeks "missions".
    It will be for ${form.targetGroup}, so the language and themes should reflect it.
    Also, please make sure the weekly missions should consider ${form.campaignFrequency} hours of dedication per week.
    The theme for this campaign will be ${form.grandChallenge} and everything must be aligned to this theme. 
    Please, make sure to consider the environment where this campaign will run will be of ${form.internetAccess}, so your suggestions on how to implement activities must have that as a baseline. Also, please consider that participants will mainly use ${form.deviceAccess} to access the campaign.
    Consider that, during the execution of this campaign, the main skills to be worked with are: ${form.skills}. It is important to highlight them across the content in each week.
    **Important: always return content in JSON in a single line following the structure {"title": "The title of the campaign","excerpt": "The short description of the campaign","content": "The content of the campaign formatted in HTML with no line breaks or /n"}.
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
      "You are a pedagogical expert creating a detailed pedagogical plan for a campaign that teaches skills for solving global grand challenges. You will write a detailed plan for a campaign in the ENGLISH language. You will be very direct and use somewhat formal language. Do not write about yourself or use the first person voice.",
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
  const response = await callAssistant(JSON.parse(req.body));
  const campaign = JSON.parse(response[0].text.value);

  // Save campaign to the Database
  const newCampaign = await prisma.campaign.create({
    data: {
      title: campaign.title,
      excerpt: campaign.excerpt,
      isPublished: true,
    },
  });

  // Save pedagogical document to database
  const document = await prisma.document.create({
    data: {
      title: "Pedagogical Plan",
      content: campaign.content,
      campaign: {
        connect: {
          id: newCampaign.id,
        },
      },
    },
  });

  // Respond with the generated content
  res.status(200).json({ body: newCampaign });
}
