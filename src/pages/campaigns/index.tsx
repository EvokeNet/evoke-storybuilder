import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";

import Header from "@/components/Header";
import Campaign from "@/components/Campaign";
import Link from "next/link";

import campaignData from "@/data/CampaignsData";
import knowledgeAreasData from "@/data/KnowlegeAreasData";
import competenceAreasData from "@/data/CompetenceAreasData";

const prisma = new PrismaClient();

const CAMPAIGNS_PER_PAGE = 8;

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    filter: "",
    knowledgeArea: undefined as number | undefined,
    competenceArea: undefined as number | undefined,
  });

  const [competenceOptions, setCompetenceOptions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const pageCount = 0;

  const fetchCampaigns = async () => {
    const response = await fetch("/api/campaigns");
    const data = await response.json();
    setCampaigns(data);
  };

  useEffect(() => {
    const indexOfLastCampaign = currentPage * CAMPAIGNS_PER_PAGE;
    const indexOfFirstCampaign = indexOfLastCampaign - CAMPAIGNS_PER_PAGE;

    fetchCampaigns();

    const campaignsFiltered = campaigns.filter(
      (campaign) =>
        (campaign.title.toLowerCase().includes(filters.filter.toLowerCase()) ||
          campaign.tags.some((tag) =>
            tag.toLowerCase().includes(filters.filter.toLowerCase())
          )) &&
        (filters.knowledgeArea
          ? filters.knowledgeArea === campaign.knowledgeArea
          : true) &&
        (filters.competenceArea
          ? filters.competenceArea === campaign.competenceArea
          : true)
    );

    setCampaigns(
      campaignsFiltered.slice(indexOfFirstCampaign, indexOfLastCampaign)
    );
  }, [filters, currentPage]);

  useEffect(() => {
    setFilters((e) => ({ ...e, competenceArea: undefined }));
    const options = competenceAreasData
      .filter((competence) => competence.area_id === filters.knowledgeArea)
      .map((competence) => competence.competences)[0];
    setCompetenceOptions(options || []);
  }, [filters.knowledgeArea]);

  return (
    <>
      <Header title="Campaigns" />
      <main>
        {/* Actions bar */}
        <div className="mx-auto mb-4 flex max-w-screen-xl flex-row place-items-stretch items-start items-center gap-8 px-4 sm:px-6 lg:px-8">
          {/* Search by Knowlege Area */}
          <div className="py-6">
            <select
              className="focus:shadow-outline rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              value={filters.knowledgeArea}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  knowledgeArea:
                    e.target.value !== ""
                      ? parseInt(e.target.value)
                      : undefined,
                });
              }}
            >
              <option value={""}>Grand Challenge</option>
              {knowledgeAreasData.map((area, index) => (
                <option key={index} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search by Area Competence */}
          <div className="flex-0 py-6 sm:px-6 lg:px-8">
            <select
              className="focus:shadow-outline rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              value={filters.competenceArea}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  competenceArea:
                    e.target.value !== ""
                      ? parseInt(e.target.value)
                      : undefined,
                })
              }
              disabled={filters.knowledgeArea === undefined}
            >
              <option value={""}>Skills</option>
              {competenceOptions.map((competence, index) => (
                <option key={index} value={competence.id}>
                  {competence.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search by keyword or tag */}
          <div className="flex-0 flex-1 py-6 sm:px-6 lg:px-8">
            <input
              type="text"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              placeholder="Search campaigns by title or tags"
              onChange={(e) =>
                setFilters({ ...filters, filter: e.target.value })
              }
            />
          </div>

          {/* Create new Lesson Plan */}
          <div className="self-end py-6 sm:px-6 lg:px-8">
            <Link
              className="block rounded-md bg-buttons px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
              href="/campaigns/create"
            >
              New Campaign
            </Link>
          </div>
        </div>

        {/* Lesson plans */}
        {campaigns.length >= 1 ? (
          <>
            <div className="container mx-auto grid grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {campaigns.map((campaign, index) => (
                <Campaign
                  key={index}
                  id={campaign.id}
                  competenceArea={{}}
                  title={campaign.title}
                  description={campaign.excerpt}
                  tags={campaign.tags}
                  image={campaign.image}
                  knowledgeArea={campaign.knowledgeArea}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`mx-1 rounded px-4 py-2 ${
                      currentPage === number
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            There are no campaigns available.
          </div>
        )}
      </main>
    </>
  );
}
