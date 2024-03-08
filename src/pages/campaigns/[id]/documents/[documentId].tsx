import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "@/components/Header";

export default function SingleDocument() {
  const router = useRouter();

  const [document, setDocument] = useState<any>();

  const fetchDocument = async () => {
    const response = await fetch("/api/document?id=" + router.query.documentId);
    const data = await response.json();
    setDocument(data);
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
          {document.content}
        </section>
      </main>
    </>
  );
}
