import React from "react";
import Addfolder from "../../assets/images/addfolder.png";
import Airplanehelix from "../../assets/images/airplanehelix.png";
import Databasescript from "../../assets/images/databasescript.png";
import Aligncenter from "../../assets/images/aligncenter.png";
import Designnib from "../../assets/images/designnib.png";
import Rocket from "../../assets/images/rocket.png";

export default function Cards() {
  return (
    <div className="px-6 md:px-16 lg:px-24 mt-16">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="flex justify-center">
      <article className="flex items-start gap-4 sm:gap-6 w-full max-w-md shadow-sm p-4 rounded-md">
        <img src={Addfolder} alt="Ask questions" />
        <div>
          <h2 className="font-semibold text-lg">Ask questions</h2>
          <h3 className="mt-2 text-gray-400">
            Ask the AI anything about the curriculum and get instant answers
          </h3>
        </div>
      </article>
    </div>

    <div className="flex justify-center">
      <article className="flex items-start gap-4 sm:gap-6 w-full max-w-md shadow-sm p-4 rounded-md">
        <img src={Airplanehelix} alt="Study calendar" />
        <div>
          <h2 className="font-semibold text-lg">Study calendar</h2>
          <h3 className="mt-2 text-gray-400">
            Personalized plan to ace your exams
          </h3>
        </div>
      </article>
    </div>

    <div className="flex justify-center">
      <article className="flex items-start gap-4 sm:gap-6 w-full max-w-md shadow-sm p-4 rounded-md">
        <img src={Databasescript} alt="Assessment" />
        <div>
          <h2 className="font-semibold text-lg">Assessment</h2>
          <h3 className="mt-2 text-gray-400">
            Comprehensive data by area of knowledge
          </h3>
        </div>
      </article>
    </div>

    <div className="flex justify-center">
      <article className="flex items-start gap-4 sm:gap-6 w-full max-w-md shadow-sm p-4 rounded-md">
        <img src={Aligncenter} alt="Exams prep" />
        <div>
          <h2 className="font-semibold text-lg">Exams prep</h2>
          <h3 className="mt-2 text-gray-400">
            Instant simulations for you to practice whenever you want
          </h3>
        </div>
      </article>
    </div>

    <div className="flex justify-center">
      <article className="flex items-start gap-4 sm:gap-6 w-full max-w-md shadow-sm p-4 rounded-md">
        <img src={Designnib} alt="Lesson notes" />
        <div>
          <h2 className="font-semibold text-lg">Lesson notes</h2>
          <h3 className="mt-2 text-gray-400">
            Generate lesson notes in seconds on a content area
          </h3>
        </div>
      </article>
    </div>

    <div className="flex justify-center">
      <article className="flex items-start gap-4 sm:gap-6 w-full max-w-md shadow-sm p-4 rounded-md">
        <img src={Rocket} alt="Summaries" />
        <div>
          <h2 className="font-semibold text-lg">Summaries</h2>
          <h3 className="mt-2 text-gray-400">
            Generate summaries in seconds
          </h3>
        </div>
      </article>
    </div>
  </div>
</div>

  );
}
