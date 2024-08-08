import Image2 from "../../assets/images/image2.png";
import Image3 from "../../assets/images/image3.png";
import Image4 from "../../assets/images/image4.png";
import Image5 from "../../assets/images/image5.png";
import Checks from "../../assets/images/checks.png";
import Talent from "../../assets/images/talent.png";
import Request from "../../assets/images/request.png";
import Check from "../../assets/images/check.png";

function Features() {
  return (
    <div className="p-4">
      <div
        className="flex md:flex-row flex-col gap-x-20 mt-10"
        style={{ backgroundImage: "url(bg.png)", backgroundSize: "cover" }}
      >
        <div className="md:p-24 p-10 md:w-1/2 w-96">
          <h2 className="font-bold text-3xl">Litmus Test - for students</h2>
          <p className="text-gray-700 mt-6">
            Litmus Test tailors educational content to suit each student’s
            unique learning style and requirements, ensuring that vital concepts
            are presented in a manner that resonates best with them. This
            customization encompasses individualized curriculum materials,
            course programs, and assessment questions, pinpointing specific
            areas where a student requires additional support and guidance to
            teachers.
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

        <div className="md:w-1/2">
          <div className="md:flex space-x-12">
            <img className="p-20 md:px-2" src={Talent} />
            <img className="p-6 " src={Image3} />
          </div>
          <img src={Checks} />
          <div className="mt-8 flex justify-center">
            <img src={Image2} />
          </div>
        </div>
      </div>

      <div
        className="flex md:flex-row flex-col md:p-36 "
        style={{ backgroundImage: "url(bg2.png)", backgroundSize: "cover" }}
      >
        <div>
          <div className="space-y-5 md:w-1/2">
            <div className="flex items-center gap-10">
              <img className="w-40" src={Talent} />
              <img src={Image4} />
            </div>
            <div className="flex justify-center">
              <img src={Check} />
            </div>
            <div className="flex items-center space-x-12">
              <img src={Image5} />
              <img className="w-40" src={Request} />
            </div>
          </div>
        </div>

        <div className="md:px-24 p-10 md:w-1/2 w-96">
          <h2 className="font-bold text-3xl ">Litmus Test - For Teachers</h2>
          <p className="text-gray-700 mt-6">
            Litmus Test streamlines classroom administration and enhances the
            teaching experience by providing more time for what truly matters –
            teaching and dedicated student support. The result is an empowered
            and more efficient teaching workforce.
          </p>
          <ul className="list-disc text-gray-700 mt-6">
            Classroom Administration:
            <li>No paperwork, just simple clicks.</li>  Lesson Planning: 
            <li>Your personalized engaging lesson plans quickly.</li>
            Professional Development: 
            <li>Access updated training resources.</li> Student Tracking: 
            <li>The most reliable and accurate record-keeping.</li>
            Collaborative Community: 
            <li>Join a supportive community of educators</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Features;
