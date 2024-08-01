'use client';

import React from 'react';
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

interface OpenSearchBarProps {
  user: UserMetadata;
  trigger: React.ReactNode;
}

export default function OpenSearchBar({ user, trigger }: OpenSearchBarProps) {
  return (
      <Dialog>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new skill</DialogTitle>
            <DialogDescription>
              <Searchbar user={user}/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
  );
}