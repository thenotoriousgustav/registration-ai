import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import ClipLoader from "react-spinners/ClipLoader";

export function Spinner() {
  return (
    <Dialog open={true}>
      <DialogContent className="w-64  flex flex-col justify-center items-center">
        <ClipLoader
          color="black"
          size={70}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {/* <DialogHeader className="ml-1">loading...</DialogHeader> */}
      </DialogContent>
    </Dialog>
  );
}
