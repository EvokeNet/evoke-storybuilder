import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Document from "@/components/Document";
import documentsData from "@/data/DocumentsData";
import Link from "next/link";

export default function SingleCampaign() {
  const router = useRouter();

  const [campaign, setCampaign] = useState<any>();

  const fetchCampaign = async () => {
    const response = await fetch("/api/campaign?id=" + router.query.id);
    const data = await response.json();
    setCampaign(data);
  };

  useEffect(() => {
    fetchCampaign();
  });

  return (
    <>
      <main>
        <section
          className={`overflow-hidden bg-[image:url(https://source.unsplash.com/1600x900/?nature&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-top bg-no-repeat`}
        >
          <div className="bg-black/25 p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
                {campaign.title}
              </h2>

              <p className="mx-auto hidden max-w-lg text-center text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
                {campaign.excerpt}
              </p>

              <div className="mt-4 sm:mt-8">
                <Link
                  href="#"
                  className="inline-block rounded-full bg-buttons px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none"
                >
                  Editar
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-gray-800 sm:text-3xl md:text3xl py-8">
              Pedagogical documents
            </h2>
            <hr noshade />
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {documentsData.map((document, index) => (
                <Document
                  key={index}
                  title={document.title}
                  tags={document.tags}
                  image={document.image}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-gray-800 sm:text-3xl md:text3xl py-8">
              Story
            </h2>
            <hr noshade />
            <div className="mt-4 text-center">There's nothing here yet.</div>
          </div>
        </section>
      </main>
    </>
  );
}
