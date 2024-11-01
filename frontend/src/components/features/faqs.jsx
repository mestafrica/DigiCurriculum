import React from "react";
import Image1 from "../../assets/images/image1.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

export default function FAQS() {
  return (
    <div>
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
                Yes, you can monitor your website from all Site24x7 locations.
                Site24x7 allows you to monitor your website's performance and
                availability from various global locations. This feature helps
                you understand how your website is performing for users in
                different geographical regions, ensuring that your website is
                accessible and functioning properly worldwide. You can select
                specific locations from which to monitor your site, or choose to
                monitor from all available locations.
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
                Server monitoring with Site24x7 is licensed based on the number
                of servers you monitor. Typically, each server you monitor
                requires a license, and you can choose from different plans
                based on your needs. The licensing can vary depending on the
                features included, such as the number of monitors, the frequency
                of monitoring, and additional services like application
                performance monitoring or log management. Some plans might offer
                tiered pricing where you pay for a specific number of servers
                and can add more as needed, while others may offer a
                pay-as-you-go model. It's important to review the specific
                licensing terms provided by Site24x7 to determine the best
                option for your server monitoring needs.
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
                Whether you need to pay extra to monitor resources on your
                server with Site24x7 depends on the specific plan you have
                chosen. Generally, Site24x7 offers different levels of
                monitoring, and some advanced features or additional resources
                might require an upgrade or an additional cost. For example,
                basic server monitoring might be included in your plan, covering
                essential metrics like CPU, memory, disk usage, etc. However,
                monitoring more specialized resources or services (like
                databases, applications, or custom metrics) could come with
                extra charges depending on your plan's limitations. To get a
                precise answer, you would need to review the details of your
                specific Site24x7 plan or contact their support to clarify what
                is included and what might incur additional costs.
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
                With Site24x7, you can typically add up to 50 plugins per server
                monitor. This allows you to extend the monitoring capabilities
                by adding custom or pre-built plugins to monitor various
                applications, services, or specific metrics that are not covered
                by default server monitoring. If you need to monitor more than
                50 plugins, it may require additional configuration or possibly
                upgrading your plan, depending on the specific requirements and
                limitations of your Site24x7 subscription.
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
                Metrics pushed via the StatsD daemon in Site24x7 are generally
                charged based on the number of unique metrics that are collected
                and stored. Site24x7 typically counts each unique metric as a
                data point, and your plan may include a certain number of
                metrics that can be monitored without additional charges. If the
                number of metrics pushed via the StatsD daemon exceeds the quota
                included in your plan, you may incur extra charges. These
                charges could be based on the number of additional metrics or on
                the amount of data ingested. It's important to review the
                specific details of your Site24x7 plan to understand how these
                metrics are counted and charged, and to ensure that you stay
                within your desired budget.
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
                Docker and Kubernetes monitoring in Site24x7 are typically
                licensed based on the number of containers and Kubernetes nodes
                being monitored. Here's how it usually works: Docker Monitoring:
                Licensing for Docker monitoring is often based on the number of
                Docker containers. You might have a specific allowance for the
                number of containers included in your plan, and monitoring
                additional containers beyond this limit may incur extra charges.
                Kubernetes Monitoring: Kubernetes monitoring is generally
                licensed based on the number of Kubernetes nodes. A node can be
                either a physical or virtual machine that is part of the
                Kubernetes cluster. Similar to Docker, your plan may include a
                certain number of nodes, with additional charges applied if you
                monitor more nodes than your plan covers. In both cases, the
                cost may vary depending on the specific features you need, such
                as advanced performance metrics, custom dashboards, or log
                management. It's essential to review your Site24x7 plan's terms
                to understand the exact licensing model and any potential
                additional costs for monitoring Docker containers and Kubernetes
                nodes.
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
            <h4 className="text-black my-5 w-96 font-bold pb-20">
              Personalized study plans, AI-powered question answers, intelligent
              simulations, and much more.
            </h4>
          </div>
          <Link to="/signup"> <button className="bg-blue-200 font-bold px-14 md: py-1 mt-20 rounded-sm">
            Get started - it's free
          </button></Link>
        </div>
      </div>
    </div>
  );
}
