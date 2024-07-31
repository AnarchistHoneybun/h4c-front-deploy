import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Searchbar from "./Searchbar";
import { UserMetadata } from "@supabase/supabase-js";

export default function OpenSearchBar({user}:{user:UserMetadata}) {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>Add a new skill</DialogTitle>
          <DialogDescription>
            <Searchbar user={user}/>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
