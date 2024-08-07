import React from "react";
import Addfolder from "../../assets/images/addfolder.png";
import Airplanehelix from "../../assets/images/airplanehelix.png";
import Databasescript from "../../assets/images/databasescript.png";
import Aligncenter from "../../assets/images/aligncenter.png";
import Designnib from "../../assets/images/designnib.png";
import Rocket from "../../assets/images/rocket.png";

export default function Cards() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-y-6 md:px-48 px-14 mt-16">
        <div className="flex justify-center">
          <article className="flex items-start gap-6 w-fit shadow-sm p-4 rounded-md">
            <img src={Addfolder} />
            <div>
              <h2 className="font-semibold">Ask questions</h2>
              <h3 className="w-60 mt-4 text-gray-400">
                Ask the AI anything about the curriculum and get instant answers
              </h3>
            </div>
          </article>
        </div>

        <div className="flex justify-center">
          <article className="flex items-start gap-6 w-fit shadow-sm p-4 rounded-md">
            <img src={Airplanehelix} />
            <div>
              <h2 className="font-semibold">study calendar</h2>
              <h3 className="w-60 mt-4 text-gray-400">
                Personalized plan to ace your exams
              </h3>
            </div>
          </article>
        </div>

        <div className="flex justify-center">
          <article className="flex items-start gap-6 w-fit shadow-sm p-4 rounded-md">
            <img src={Databasescript} />
            <div>
              <h2 className="font-semibold">assessment</h2>
              <h3 className="w-60 mt-4 text-gray-400">
                Comprehensive data by area of knowledge
              </h3>
            </div>
          </article>
        </div>

        <div className="flex justify-center">
          <article className="flex items-start gap-6 w-fit shadow-sm p-4 rounded-md">
            <img src={Aligncenter} />
            <div>
              <h2 className="font-semibold">Exams prep</h2>
              <h3 className="w-60 mt-4 text-gray-400">
                Instant simulations for you to practice whenever you want
              </h3>
            </div>
          </article>
        </div>

        <div className="flex justify-center">
          <article className="flex items-start gap-6 w-fit shadow-sm p-4 rounded-md">
            <img src={Designnib} />
            <div>
              <h2 className="font-semibold">Lesson notes</h2>
              <h3 className="w-60 mt-4 text-gray-400">
                Generate lessons notes in in seconds on a content area
              </h3>
            </div>
          </article>
        </div>

        <div className="flex justify-center">
          <article className="flex items-start gap-6 w-fit shadow-sm p-4 rounded-md">
            <img src={Rocket} />
            <div>
              <h2 className="font-semibold">Summaries</h2>
              <h3 className="w-60 mt-4 text-gray-400">
                Generate summaries in seconds
              </h3>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
