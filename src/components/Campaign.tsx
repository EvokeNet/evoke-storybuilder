import Link from "next/link";
import KnowlegeAreasData from "@/data/KnowlegeAreasData";

const Campaign = ({
  id,
  title,
  description,
  tags,
  image,
  knowledgeArea,
  competenceArea,
}) => {
  return (
    <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100 mx-2 my-1">
      <img
        alt="Home"
        src={image}
        className="h-56 w-full rounded-md object-cover"
      />

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">{KnowlegeAreasData[knowledgeArea].name}</dt>
            <dd className="text-sm text-gray-500">
              {KnowlegeAreasData[knowledgeArea].name}
            </dd>
          </div>

          <div>
            <dt className="sr-only">{title}</dt>
            <dd className="font-medium">{title}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700 mr-1"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-2 border-t">
        <Link
          href={`/campaigns/${id}?title=${title}&description=${description}&image=${encodeURIComponent(
            image
          )}`}
          as={`/campaigns/${id}`}
        >
          <button className="block rounded-md bg-buttons px-2 py-2 mt-2 text-sm font-medium text-white transition hover:bg-teal-700">
            Open campaign
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Campaign;
