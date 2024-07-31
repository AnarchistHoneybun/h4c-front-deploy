import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Searchbar from "./Searchbar";

export default function OpenSearchBar() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>Add a new skill</DialogTitle>
          <DialogDescription>
            <Searchbar/>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
