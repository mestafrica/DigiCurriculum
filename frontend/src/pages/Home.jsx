import Image1 from "../assets/images/image1.png";
import Addfolder from "../assets/images/addfolder.png";
import Airplanehelix from "../assets/images/airplanehelix.png";
import Databasescript from "../assets/images/databasescript.png";
import Aligncenter from "../assets/images/aligncenter.png";
import Designnib from "../assets/images/designnib.png";
import Rocket from "../assets/images/rocket.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Home() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-y-6 md:px-48 px-14">
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

      <h1 className="text-2xl font-bold text-center my-20">
        Frequently Asked Questions (FAQ)
      </h1>
      <div className="rounded-lg md:mx-44  ">
        <Accordion className="space-y-4" type="single" collapsible>
          <AccordionItem value="item-1">
            <div className="bg-yellow-50 rounded-xl mx-10">
              <div className="px-10">
                <AccordionTrigger>
                  1. What is a Monitor? What are the lists of Basic and Advanced
                  monitors?
                </AccordionTrigger>
              </div>
              <AccordionContent className="bg-slate-50  p-10 shadow-none">
                Monitor refers to a resource like a server, website, web
                application instance or URL that is monitored for uptime and
                performance. estac supports many types of monitors, each of
                these have various performance metrics. For example,a server
                monitor has metrics like CPU, memory, disk utilization, network
                usage, eventlogs, and process metrics. Likewise a website
                monitor has performance metrics like first byte time, last byte
                time, DNS time, total response time, and uptime status.
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem value="item-2">
            <div className="bg-yellow-50 rounded-xl mx-10">
              <div className="px-10">
                <AccordionTrigger>
                  2. Can I monitor my website from all Site24x7 locations?
                </AccordionTrigger>
              </div>
              <AccordionContent className="bg-slate-50 p-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
                explicabo? Possimus quod modi cum, inventore reiciendis optio
                deserunt praesentium molestias officiis tempore assumenda iste
                maxime sit eum, fugiat ullam dolorem.
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem value="item-3">
            <div className="bg-yellow-50 rounded-xl mx-10">
              <div className="px-10">
                <AccordionTrigger>
                  3. How is server monitoring licensed?
                </AccordionTrigger>
              </div>
              <AccordionContent className="bg-slate-50 p-10">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatum vel consequuntur fuga. Laboriosam vel, expedita quam
                iure, dicta consequatur pariatur sapiente in voluptates
                voluptatibus dignissimos non, eos assumenda nemo libero.
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem value="item-4">
            <div className="bg-yellow-50 rounded-xl mx-10">
              <div className="px-10">
                <AccordionTrigger>
                  4. Do I have to pay extra to monitor resources on my server?
                </AccordionTrigger>
              </div>
              <AccordionContent className="bg-slate-50 p-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores provident blanditiis, veniam eos sequi natus illum
                harum ex vitae temporibus fuga, modi esse officiis dolorum
                maxime deleniti? Eligendi, error maxime?
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem value="item-5">
            <div className="bg-yellow-50 rounded-xl mx-10">
              <div className="px-10">
                <AccordionTrigger>
                  5. How many plugins can I add per server monitor?
                </AccordionTrigger>
              </div>
              <AccordionContent className="bg-slate-50 p-10">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Deleniti atque consectetur asperiores excepturi eius amet
                maxime, provident labore nobis earum porro veritatis iure
                commodi? Autem ipsa perspiciatis odio delectus sed.
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem value="item-6">
            <div className="bg-yellow-50 rounded-xl mx-10">
              <div className="px-10">
                <AccordionTrigger>
                  6. How are metrics pushed via the StatsD daemon charged?
                </AccordionTrigger>
              </div>
              <AccordionContent className="bg-slate-50 p-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa a
                vel earum harum quod dignissimos voluptatem iste ratione impedit
                saepe, consectetur provident est, similique delectus molestiae
                numquam autem omnis veniam.
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem value="item-7">
            <div className="bg-yellow-50 rounded-xl mx-10">
              <div className="px-10">
                <AccordionTrigger>
                  7. How are Docker and Kubernetes monitoring licensed?
                </AccordionTrigger>
              </div>
              <AccordionContent className="bg-slate-50 p-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                impedit quos suscipit magnam doloremque similique at id
                perferendis hic libero. Voluptas doloribus quidem, quo vitae ab
                inventore a aliquid soluta!
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="bg-slate-50 md:px-48 px-14 space-y-8">
        <div className="md:mt-28 mt-14">
          <img className="w-full" src={Image1} />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start ">
          <div className="flex flex-col md:items-start space-y-5 ">
            <h3 className="text-4xl text-green-600 font-semibold mt-5">
              Ready to level-up?
            </h3>
            <h4 className="text-black my-5 w-96 font-bold">
              Personalized study plans, AI-powered question answers, intelligent
              simulations, and much more.
            </h4>
          </div>
          <button className="bg-blue-200 font-bold px-14 py-1 mt-20 rounded-sm">
            Get started - it's free
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
