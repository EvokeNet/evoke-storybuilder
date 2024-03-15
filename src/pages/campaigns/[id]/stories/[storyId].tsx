import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "@/components/Header";

export default function SingleDocument() {
  const router = useRouter();

  const [story, setStory] = useState<any>();

  const fetchStory = async () => {
    const response = await fetch("/api/story?id=" + router.query.storyId);
    const data = await response.json();
    setStory(data);
  };

  useEffect(() => {
    fetchStory();
  }, []);

  if (!story) return <>Loading...</>;

  return (
    <>
      <Header title={story.title} alignment="mx-auto" />
      <main>
        <section
          className="mx-auto mt-8 max-w-prose text-base leading-relaxed"
          id="theme"
        >
          {story.content}
        </section>
      </main>
    </>
  );
}
