import { Button } from "@/components/ui/button";
import { MdCastForEducation, MdSave } from "react-icons/md";

function Frontsetup() {
  return (
    <>
      <h1 className="text-3xl  font-bold text-teal-900">Digitize GES Curiculum?</h1>
      <div className="px-20">
        <Button>Yes</Button>
      </div>
     <p>icons</p>
      <MdCastForEducation />
      <MdSave/>
    </>
  );
}

export default Frontsetup;
