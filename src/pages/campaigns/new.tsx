import Header from "@/components/Header";
import React, { useState, FormEvent } from "react";

type Story = {
  text: {
    value: string;
  };
};

const NewCampaign = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stories, setStories] = useState<Story[]>([]);

  function formDataToJson(formData) {
    let object = {};
    for (let [key, value] of formData.entries()) {
      object[key] = value;
    }
    return JSON.stringify(object);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formDataToJson(formData),
      });
      const data = await response.json();
      setStories(data.body);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header title="New Campaign" />
      <div className="container mx-auto mt-1 p-5 bg-white">
        <form onSubmit={onSubmit} className="px-8 pt-6 pb-8 mb-4">
          <fieldset className="border border-solid border-gray-300 p-3 mb-8">
            <p className="block text-gray-700 mb-8">
              Please, describe the main pedagogical and technical elements of
              your campaign.
            </p>

            {/* Target Group */}
            <div className="mb-4">
              <label
                htmlFor="targetGroup"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Target Group
              </label>
              <select
                name="targetGroup"
                id="targetGroup"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>University students</option>
                <option>High school students</option>
                <option>Middle school students</option>
                <option>Out of school youth</option>
                <option>Adult education students</option>
              </select>
            </div>

            {/* Internet access */}
            <div className="mb-4">
              <label
                htmlFor="internetAccess"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Internet Access
              </label>
              <select
                name="internetAccess"
                id="internetAccess"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>No connectivity</option>
                <option>Some connectivity</option>
                <option>Limited connectivity (eg. for secretary only)</option>
                <option>
                  Limited connectivity (eg. secretary and computer labs)
                </option>
                <option>High speed broadband</option>
              </select>
            </div>

            {/* Devices */}
            <div className="mb-4">
              <label
                htmlFor="internetAccess"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Devices that will be used
              </label>
              <select
                name="internetAccess"
                id="internetAccess"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>No access to devices</option>
                <option>Laptops</option>
                <option>Tablets</option>
                <option>Smartphones</option>
                <option>Feature phones</option>
                <option>
                  Mixed devices (laptops, smartphones, tablets etc)
                </option>
              </select>
            </div>

            {/* Duration of campaign */}
            <div className="mb-4">
              <label
                htmlFor="campaignDuration"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Expected duration of the campaign (in weeks)
              </label>
              <input
                type="number"
                name="campaignDuration"
                placeholder="Example: 4"
                id="campaignDuration"
                className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            {/* Frequency of campaign */}
            <div className="mb-4">
              <label
                htmlFor="campaignFrequency"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Expected frequency that you expect youth to participate in this
                campaign (hours/week)
              </label>
              <input
                type="number"
                name="campaignFrequency"
                placeholder="Example: 1"
                id="campaignFrequency"
                className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            {/* Grand Challenge */}
            <div className="mb-4">
              <label
                htmlFor="grandChallenge"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                What Grand Challenge will you address
              </label>
              <select
                name="grandChallenge"
                id="grandChallenge"
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
          </fieldset>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Generate Adventure"}
          </button>
        </form>
      </div>
      <div className="container mx-auto p-5">
        {stories.map((story) => (
          <div>{story.text.value}</div>
        ))}
      </div>
    </>
  );
};

export default NewCampaign;
