import Link from "next/link";
import React from "react";

const Document = ({ documentId, campaignId, title, image }) => {
  return (
    <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100 mx-2 my-1">
      <img
        src={image}
        alt="Card Image"
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <div className="mt-2">
        <dl>
          <dt className="sr-only">{title}</dt>
          <dd className="font-medium">{title}</dd>
        </dl>
      </div>

      <div className="mt-2">
        {/* {tags.map((tag, index) => (
          <span
            key={index}
            className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700 mr-1"
          >
            {tag}
          </span>
        ))} */}
      </div>

      <div className="mt-4 border-t">
        <Link href={`/campaigns/${campaignId}/documents/${documentId}`}>
          <button className="block rounded-md bg-buttons px-2 py-2 mt-2 text-sm font-medium text-white transition hover:bg-teal-700">
            Open document
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Document;
