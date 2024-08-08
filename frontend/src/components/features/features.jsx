import Image2 from "../../assets/images/image2.png";
import Image3 from "../../assets/images/image3.png";
import Checks from "../../assets/images/checks.png";
import Talent from "../../assets/images/talent.png";
import Bg from "../../assets/images/bg.png";
import Bg2 from "../../assets/images/bg2.png";

function Features() {
  return (
    <div>
      <div className="flex gap-x-20" style={{ backgroundImage: "url(bg.png)" }}>
        <div className="p-36">
          <h2 className="font-bold text-3xl ">Litmus Test - for students</h2>
          <p className="text-gray-700 w-96 mt-6">
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
        <div>
          <div className="flex space-x-12">
            <img className="p-20 px-2" src={Talent} />
            <img className="p-6 " src={Image3} />
          </div>
          <img src={Checks} />
          <div className="mt-8 flex justify-center">
            <img src={Image2} />
          </div>
        </div>
      </div>

      {/* <div style={{ backgroundImage: "url(bg2.png)" }}>
        <div>
          <div>
            <img src={Talent} />
          </div>

          <h2>Litmus Test - For Teachers</h2>
          <p>
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
      </div> */}
    </div>
  );
}

export default Features;
