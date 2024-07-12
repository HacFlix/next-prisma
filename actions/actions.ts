"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPost(formdata: FormData) {
  try {
    await prisma.post.create({
      data: {
        title: formdata.get("title") as string,
        content: formdata.get("content") as string,
        slug: (formdata.get("title") as string)
          .replace(/\s/g, "-")
          .toLowerCase(),
        User: {
          connect: {
            email: "biswa@biswa.com",
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/posts");
}
export async function editPost(formdata: FormData, id: string) {
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      title: formdata.get("title") as string,
      content: formdata.get("content") as string,
      slug: (formdata.get("title") as string).replace(/\s/g, "-").toLowerCase(),
    },
  });

  revalidatePath("/posts");
}

export async function deletePost(id: string) {
  await prisma.post.delete({
    where: {
      id,
    },
  });

  revalidatePath("/posts");
}
