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
                  1. What is Litmus Test and how does it work?
                </AccordionTrigger>
              </div>
              <AccordionContent className="bg-slate-50  p-10 shadow-none">
                Litmus Test is an educational platform that tailors content to suit each students unique learning style and requirements. It uses AI to customize curriculum materials, course programs, and assessment questions. For students, this means a more resonant learning experience. For teachers, it streamlines classroom administration and provides targeted insights for student support.
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem value="item-2">
            <div className="bg-yellow-50 rounded-xl mx-10">
              <div className="px-10">
                <AccordionTrigger>
                  2. How does Litmus Test personalize learning for students?
                </AccordionTrigger>
              </div>
              <AccordionContent className="bg-slate-50 p-10">
                Personalized Learning is achieved through an AI-supported tutor that facilitates self-paced learning. The platform pinpoints specific concepts where a student requires additional support, ensuring vital concepts are presented in a manner that resonates best with them, using dynamic textbooks, audiobooks, and courses.
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem value="item-3">
            <div className="bg-yellow-50 rounded-xl mx-10">
              <div className="px-10">
                <AccordionTrigger>
                  3. What features does Litmus Test offer to streamline a teacher's work
                </AccordionTrigger>
              </div>
              <AccordionContent className="bg-slate-50 p-10">
                Litmus Test empowers teachers by streamlining tasks like Classroom Administration  (no paperwork, simple clicks) and Lesson Planning (quickly generating engaging, personalized plans). This provides more time for dedicated student support and enhances the overall teaching experience.
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem value="item-4">
            <div className="bg-yellow-50 rounded-xl mx-10">
              <div className="px-10">
                <AccordionTrigger>
                  4. What is Litmus Test's approach to mistakes and student motivation?
                </AccordionTrigger>
              </div>
              <AccordionContent className="bg-slate-50 p-10">
                Litmus Test encourages students to Embrace Mistakes, viewing them as a crucial part of the learning journey. The platform is designed to **Motivate** students for continuous improvement by fostering collaboration, providing support, and offering rewards within its community.
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem value="item-5">
            <div className="bg-yellow-50 rounded-xl mx-10">
              <div className="px-10">
                <AccordionTrigger>
                  5. Does Litmus Test include features for teacher professional development and collaboration?
                </AccordionTrigger>
              </div>
              <AccordionContent className="bg-slate-50 p-10">
                Yes. Teachers have access to updated Professional Development training resources. They can also join a **Collaborative Community** of educators to share insights and provide mutual support. The platform also offers the most reliable and accurate **Student Tracking** record-keeping.
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem value="item-6">
            <div className="bg-yellow-50 rounded-xl mx-10">
              <div className="px-10">
                <AccordionTrigger>
                  6. What kind of interactive content is available for students on Litmus Test?
                </AccordionTrigger>
              </div>
              <AccordionContent className="bg-slate-50 p-10">
                Students can engage with Interactive Learning resources, which include dynamic textbooks, audiobooks, and courses. These materials are part of the customized curriculum designed to align with the student's learning style.
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem value="item-7">
            <div className="bg-yellow-50 rounded-xl mx-10">
              <div className="px-10">
                <AccordionTrigger>
                  7. How does Litmus Test handle assessments and provide guidance?
                </AccordionTrigger>
              </div>
              <AccordionContent className="bg-slate-50 p-10">
                The application customizes assessment questions to pinpoint specific knowledge gaps. It ensures that students receive targeted educational content, and it provides this crucial, individualized guidance data to teachers to help them focus their instruction effectively.
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
          <Link to="/signup">
            <button className="bg-[#A9DEF9] text-secondary-foreground font-bold px-4 py-2 rounded-lg mx-4">
              Get Started - It's Free &gt;
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
