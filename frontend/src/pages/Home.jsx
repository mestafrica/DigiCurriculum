import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-14">
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
    </div>
  );
}

export default Home;
