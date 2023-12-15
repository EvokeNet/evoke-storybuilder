import React, { useState, FormEvent } from 'react'

const StepOne = ({ onNext }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData(event.currentTarget)
            const response = await fetch('/api/submit', {
                method: 'POST',
                body: formData,
            })
            const data = response.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className="container mx-auto p-5 bg-white shadow-md rounded ">
                <form onSubmit={onSubmit} className="px-8 pt-6 pb-8 mb-4">
                    <fieldset className="border border-solid border-gray-300 p-3 mb-8">
                        <legend className="text-xl font-bold mb-4">Part I: Context</legend>

                        <p className="block text-gray-700 mb-8">Please, describe the main pedagogical and technical elements of your campaign.</p>

                        {/* Target Group */}
                        <div className="mb-4">
                            <label htmlFor="targetGroup" className="block text-gray-700 text-sm font-bold mb-2">
                                Target Group
                            </label>
                            <select name="targetGroup" id="targetGroup" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option>University students</option>
                                <option>High school students</option>
                                <option>Middle school students</option>
                                <option>Out of school youth</option>
                                <option>Adult education students</option>
                            </select>
                        </div>

                    {/* Internet access */}
                    <div className="mb-4">
                        <label htmlFor="internetAccess" className="block text-gray-700 text-sm font-bold mb-2">
                            Internet Access
                        </label>
                        <select name="internetAccess" id="internetAccess" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option>No connectivity</option>
                            <option>Some connectivity</option>
                            <option>Limited connectivity (eg. for secretary only)</option>
                            <option>Limited connectivity (eg. secretary and computer labs)</option>
                            <option>High speed broadband</option>
                        </select>
                    </div>

                    {/* Devices */}
                    <div className="mb-4">
                        <label htmlFor="internetAccess" className="block text-gray-700 text-sm font-bold mb-2">
                            Devices that will be used
                        </label>
                        <select name="internetAccess" id="internetAccess" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option>No access to devices</option>
                            <option>Laptops</option>
                            <option>Tablets</option>
                            <option>Smartphones</option>
                            <option>Feature phones</option>
                            <option>Mixed devices (laptops, smartphones, tablets etc)</option>
                        </select>
                    </div>

                    {/* Duration of campaign */}
                    <div className="mb-4">
                        <label htmlFor="internetAccess" className="block text-gray-700 text-sm font-bold mb-2">
                            Expected duration of the campaign (in weeks)
                        </label>
                        <input type="number" name="campaignDuration" placeholder="Example: 4" id="campaignDuration" className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>

                    {/* Frequency of campaign */}
                    <div className="mb-4">
                        <label htmlFor="internetAccess" className="block text-gray-700 text-sm font-bold mb-2">
                            Expected frequency that you expect youth to participate in this campaign (hours/week)
                        </label>
                        <input type="number" name="campaignFrequency" placeholder="Example: 1" id="campaignFrequency" className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>

                    {/* Grand Challenge */}
                    <div className="mb-4">
                        <label htmlFor="grandChallenge" className="block text-gray-700 text-sm font-bold mb-2">
                            What Grand Challenge will you address
                        </label>
                        <select name="grandChallenge" id="grandChallenge" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option>Quality Education – Leaders for Literacy</option>
                            <option>Reduced Inequalities – Migration</option>
                            <option>Sustainable Cities</option>
                            <option>Responsible Consumption and Production</option>
                            <option>Climate Action – Climate Change</option>
                            <option>Peace, Justice and Strong Institutions</option>
                        </select>
                    </div>


                    </fieldset>

                    <fieldset className="border border-solid border-gray-300 p-3 mb-8">
                        <legend className="text-xl font-bold mb-4">Part II: Campaign</legend>
                        <p className="block text-gray-700 mb-2">The Evoke campaign generator will create an Evoke campaign (curriculum) for integration with creative content and chosen delivery platform.</p> 
                        <p className="block text-gray-700 mb-2">The campaign creator will generate a campaign including the following components:</p>
                        <ul className="block text-gray-700 list-disc ml-8 mb-8">
                            <li>Evoke 4-chapter project-based curriculum structure: Explore, Imagine, Act, Communicate.</li>
                            <li>Customized competency-based learning framework with at least 4 key competencies recognized as “super-powers".</li>
                            <li>Skills identified under each competency and recognized as “powers” in Evoke.</li>
                            <li>Missions/Activities related to each “power” and “super power”.</li>
                            <li>Agent tools to support the development of each “power”.</li>
                            <li>Rubric for assessing student progress.</li>
                            <li>Project outline recognized as the final “Evokation” in Evoke.</li>
                        </ul>

                    {/* Components of Final Project */}
                    <div className="mb-4">
                        <label htmlFor="grandChallenge" className="block text-gray-700 text-sm font-bold mb-2">
                            What are the main components of the final project – the <u>Evokation</u> - that you would like Youth to complete?
                        </label>
                        <div className="mt-4 ml-4">
                            {/* Team */}
                            <div className="relative flex gap-x-3 mb-2">
                                <div className="flex h-6 items-center">
                                    <input id="team" name="team" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="team" className="font-medium text-gray-900">Team</label>
                                    <p className="text-gray-500">Clear role of team members including areas of expertise.</p>
                                </div>
                            </div>

                            {/* Community Needs */}
                            <div className="relative flex gap-x-3 mb-2">
                                <div className="flex h-6 items-center">
                                    <input id="communityNeeds" name="communityNeeds" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="communityNeeds" className="font-medium text-gray-900">Community Needs</label>
                                    <p className="text-gray-500">A community profile of challenges and opportunities.</p>
                                </div>
                            </div>

                            {/* Problem Statement */}
                            <div className="relative flex gap-x-3 mb-2">
                                <div className="flex h-6 items-center">
                                    <input id="problemStatement" name="problemStatement" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="problemStatement" className="font-medium text-gray-900">Problem Statement</label>
                                    <p className="text-gray-500">A clear statement of the problem that the Evokation will address.</p>
                                </div>
                            </div>

                            {/* Vision Statement */}
                            <div className="relative flex gap-x-3 mb-2">
                                <div className="flex h-6 items-center">
                                    <input id="visionStatement" name="visionStatement" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="visionStatement" className="font-medium text-gray-900">Vision Statement</label>
                                    <p className="text-gray-500">A short statement on the vision for the Evokation.</p>
                                </div>
                            </div>

                            {/* World Changing Idea */}
                            <div className="relative flex gap-x-3 mb-2">
                                <div className="flex h-6 items-center">
                                    <input id="worldChangingIdea" name="worldChangingIdea" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="worldChangingIdea" className="font-medium text-gray-900">World Changing Idea</label>
                                    <p className="text-gray-500">Information on how the solution will address that problem identified.</p>
                                </div>
                            </div>

                            {/* Prototype */}
                            <div className="relative flex gap-x-3 mb-2">
                                <div className="flex h-6 items-center">
                                    <input id="prototype" name="prototype" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="prototype" className="font-medium text-gray-900">Prototype</label>
                                    <p className="text-gray-500">A minimally viable product on how the solution will work.</p>
                                </div>
                            </div>

                            {/* Resources */}
                            <div className="relative flex gap-x-3 mb-2">
                                <div className="flex h-6 items-center">
                                    <input id="resources" name="resources" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="resources" className="font-medium text-gray-900">Resources</label>
                                    <p className="text-gray-500">Budget, People – financial and human resources required to execute the Evokation.</p>
                                </div>
                            </div>

                            {/* Metrics */}
                            <div className="relative flex gap-x-3 mb-2">
                                <div className="flex h-6 items-center">
                                    <input id="metrics" name="metrics" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="metrics" className="font-medium text-gray-900">Metrics</label>
                                    <p className="text-gray-500">How will success be measured – a clear definition of your longer term goal.</p>
                                </div>
                            </div>

                            {/* Elevator Pitch */}
                            <div className="relative flex gap-x-3 mb-2">
                                <div className="flex h-6 items-center">
                                    <input id="elevatorPitch" name="elevatorPitch" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="elevatorPitch" className="font-medium text-gray-900">Elevator Pitch</label>
                                    <p className="text-gray-500">A summary text communicating your Evokation.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    </fieldset>



                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Generate Adventure'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StepOne;