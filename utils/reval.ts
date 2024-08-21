"use server"

import { revalidatePath } from "next/cache"

export default async function reval_profile(path: string) {
    revalidatePath(path);
}