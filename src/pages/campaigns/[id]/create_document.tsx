import Header from "@/components/Header";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";

const NewDocument = () => {
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
      const response = await fetch("/api/create_document", {
        method: "POST",
        body: formDataToJson(formData),
      });
      const data = await response.json();
      router.push(`/campaigns/`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header title="New Document" />
      <div className="container mx-auto mt-1 p-5 bg-white">
        <form onSubmit={onSubmit} className="px-8 pt-6 pb-8 mb-4">
          <fieldset className="border border-solid border-gray-300 p-3 mb-8">
            <p className="block text-gray-700 mb-8">
              Please, describe what document do you want to generate.
            </p>

            {/* Duration of campaign */}
            <div className="mb-4">
              <label
                htmlFor="documentType"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Short description of the document you need
              </label>
              <textarea
                name="documentType"
                placeholder="Example: Please generate an implementation plan for a rural area"
                id="documentType"
                className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </fieldset>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Generate document"}
          </button>
        </form>
      </div>
    </>
  );
};

export default NewDocument;
