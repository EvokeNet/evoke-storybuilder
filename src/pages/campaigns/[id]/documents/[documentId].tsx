import { useRouter } from "next/router";
import { Attributes, ClassAttributes, useEffect, useState } from "react";
import parse, { attributesToProps } from "html-react-parser";

import Header from "@/components/Header";

export default function SingleDocument() {
  const router = useRouter();

  const [document, setDocument] = useState<any>();

  const fetchDocument = async () => {
    const response = await fetch("/api/document?id=" + router.query.documentId);
    const data = await response.json();
    setDocument(data);
  };

  const options = {
    replace(domNode: any) {
      if (domNode.name === "h1") {
        const attribs: Attributes = {
          key: "text-3xl font-bold text-white sm:text-4xl md:text-6xl",
        };
        const props = attributesToProps(attribs);
        return <div {...props} />;
      }
    },
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  if (!document) return <>Loading...</>;

  return (
    <>
      <Header title={document.title} />
      <main>
        <section
          className="mx-auto mt-8 max-w-prose text-base leading-relaxed"
          id="theme"
        >
          {parse(document.content, options)}
        </section>
      </main>
    </>
  );
}
