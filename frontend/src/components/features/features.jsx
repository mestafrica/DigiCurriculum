import Image2 from "../../assets/images/image2.png";
import Image3 from "../../assets/images/image3.png";
import Image4 from "../../assets/images/image4.png";
import Image5 from "../../assets/images/image5.png";
import Checks from "../../assets/images/checks.png";
import Talent from "../../assets/images/talent.png";
import Bg from "../../assets/images/bg.png";

function Features() {
  return (
    <div>
      <div
        className="p-8"
        style={{ backgroundImage: `url(${Bg})`, backgroundSize: "cover" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-20 px-4 md:px-10 lg:px-16">
          <div className="p-6 md:p-8 lg:p-10">
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">
              Litmus Test - for students
            </h2>
            <p className="text-gray-700 mt-4 md:mt-6">
              Litmus Test tailors educational content to suit each student’s
              unique learning style and requirements, ensuring that vital
              concepts are presented in a manner that resonates best with them.
              This customization encompasses individualized curriculum
              materials, course programs, and assessment questions, pinpointing
              specific areas where a student requires additional support and
              guidance to teachers.
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4 md:mt-6">
              
              <li>Interactive Learning: Dynamic textbooks, audiobooks, and courses.</li>
              
              <li>Personalized Learning: AI-supported tutor for self-paced learning.</li>
               
              <li>Embrace Mistakes: Viewing mistakes as part of the learning journey.</li>
            
              <li>Motivation: Keep students motivated for continuous improvement.</li>
             
              <li>Community: Foster collaboration providing support and rewards.</li>
            </ul>
            
          </div>

          <div className="p-6 md:p-8 lg:p-10 md:content-center">
            <div className="md:flex md:space-x-6 lg:space-x-12">
              <img
                className="size-full md:w-1/2 p-4 md:p-2"
                src={Talent}
                alt="Talent"
              />
              <img className="size-full md:w-1/2 " src={Image3} alt="Image 3" />
            </div>
            <div className=" mt-0 md:mt-8">
              <img className="w-full md:w-1/2" src={Checks} alt="Checks" />
            </div>
            <div className="mt-8 md:mt-12 flex justify-center">
              <img className="" src={Image2} alt="Image 2" />
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div class="p-10 ml-10">
            <h2 className="font-bold text-4xl">Litmus Test - for students</h2>
            <p className="text-gray-700 mt-6">
              Litmus Test tailors educational content to suit each student’s
              unique learning style and requirements, ensuring that vital
              concepts are presented in a manner that resonates best with them.
              This customization encompasses individualized curriculum
              materials, course programs, and assessment questions, pinpointing
              specific areas where a student requires additional support and
              guidance to teachers.
            </p>
            <ul className="list-disc text-gray-700 mt-6">
              Interactive Learning: 
              <li>Dynamic textbooks, audiobooks, and courses.</li>
              Personalized Learning: 
              <li>AI-supported tutor for self-paced learning.</li>
              Embrace Mistakes: 
              <li>Viewing mistakes as part of the learning journey.</li>
              Motivation: 
              <li>Keep students motivated for continuous improvement.</li>
              Community: 
              <li>Foster collaboration providing support and rewards.</li>
            </ul>
          </div>
          <div className="p-4">
            <div className="md:flex space-x-12">
              <img className="p-20 md:px-2" src={Talent} />
              <img className="p-6 " src={Image3} />
            </div>
            <img src={Checks} />
            <div className="mt-8 flex justify-center">
              <img src={Image2} />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Features;
