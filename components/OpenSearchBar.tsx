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
  secType: string
}

export default function OpenSearchBar({ user, trigger, secType }: OpenSearchBarProps) {
  return (
      <Dialog>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{secType=="skill"?"Add a new skill":secType=="education"?"Add Education":secType=="experience"?"Add Experience":"Add a new learning style"}</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
            <Searchbar secType={secType} user={user}/>
        </DialogContent>
      </Dialog>
  );
}