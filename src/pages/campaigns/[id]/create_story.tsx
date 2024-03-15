import Header from "@/components/Header";
import { useRouter } from "next/router";
import React, { useState } from "react";

const NewStory = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function formDataToJson(formData) {
    let object = {};
    let lastKey = "";
    for (let [key, value] of formData.entries()) {
      if (lastKey == key) {
        object[key] += ", " + value;
      } else {
        object[key] = value;
      }
      lastKey = key;
    }
    return JSON.stringify(object);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/create_story", {
        method: "POST",
        body: formDataToJson(formData),
      });
      const data = await response.json();
      router.push(`/campaigns/${router.query.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header title="New story part" />
      <div className="container mx-auto mt-1 p-5 bg-white">
        <form onSubmit={onSubmit} className="px-8 pt-6 pb-8 mb-4">
          <input type="hidden" name="campaignId" value={router.query.id} />
          <fieldset className="border border-solid border-gray-300 p-3 mb-8">
            <p className="block text-gray-700 mb-8">
              We are going to create your story! We'll need you to provide as
              many details as possible, without giving too much. Our story
              generator will fill in the gaps for you.
            </p>

            {/* World */}
            <div className="mb-4">
              <label
                htmlFor="storyWorld"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Describe the world in which the game takes place. Be as
                descriptive as you can!
              </label>
              <textarea
                name="storyWorld"
                placeholder="Eg. Bogotá in the near future, during a major food shortage caused by regional drought"
                id="storyWorld"
                className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            {/* Genre */}
            <div className="mb-4">
              <label
                htmlFor="storyGenre"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                What is the genre of the story you are aiming for?
              </label>
              <select
                name="storyGenre"
                id="storyGenre"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Postapocaliptic futuristic sci-fi</option>
                <option>Futuristic thriller</option>
                <option>Present day realistic tale</option>
                <option>Present day drama</option>
                <option>Medieval high fantasy</option>
                <option>Children's tale</option>
              </select>
            </div>

            {/* Grand Challenge */}
            <div className="mb-4">
              <label
                htmlFor="storyGrandChallenge"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                What Grand Challenge will you address
              </label>
              <select
                name="storyGrandChallenge"
                id="storyGrandChallenge"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Quality Education – Leaders for Literacy</option>
                <option>Reduced Inequalities – Migration</option>
                <option>Sustainable Cities</option>
                <option>Responsible Consumption and Production</option>
                <option>Climate Action – Climate Change</option>
                <option>Peace, Justice and Strong Institutions</option>
              </select>
            </div>

            {/* Badges */}
            <div className="mb-4">
              <label
                htmlFor="storyBadges"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Number of badges that can be awarded in the campaign
              </label>
              <input
                type="number"
                name="storyBadges"
                placeholder="Example: 1"
                defaultValue={4}
                id="storyBadges"
                className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            {/* Threats */}
            <div className="mb-4">
              <label
                htmlFor="storyThreats"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                What threats do you want to include in the story? Imagine they
                will be the challenges that the players will face.
              </label>
              <select
                name="storyThreats"
                id="storyThreats"
                multiple
                size={13}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <optgroup className="font-bold" label="Environmental">
                  <option>Heavy rains that flood the region</option>
                  <option>Scorching hot sun that dries the land</option>
                  <option>Freezing winter like never seen before</option>
                  <option>Earthquakes that shatter whole cities</option>
                </optgroup>
                <optgroup className="font-bold" label="Enemies">
                  <option>
                    A rogue agent called Cypher hacks the Evoke Network
                  </option>
                  <option>
                    An old nemesis called Br0k3n steals important info
                  </option>
                  <option>
                    The malicious Phantom Network appears to destroy the day
                  </option>
                </optgroup>
                <optgroup className="font-bold" label="Resources">
                  <option>Agents' car break on the street</option>
                  <option>
                    Equipment is lost in the middle of the mission
                  </option>
                  <option>
                    Agents run out of money and need to be resourceful
                  </option>
                </optgroup>
              </select>
            </div>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Generate story part"}
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default NewStory;
