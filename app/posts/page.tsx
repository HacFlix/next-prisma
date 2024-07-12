import { createPost } from "@/actions/actions";
import prisma from "@/lib/db";

export default async function PostPage() {
  const posts = await prisma.post.findMany({
    where: {
      title: {
        endsWith: "post",
      },
      User: {
        email: {
          equals: "biswa@biswa.com",
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
    },
    // take: 10,
    // skip: 10,
  });
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-xl font-semibold">All Posts ({posts.length})</h1>
      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between">
            <a href={`/posts/${post.slug}`} className="text-blue-600">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
      <form action={createPost} className="flex flex-col gap-y-2 w-[300px">
        <input
          type="text"
          name="title"
          placeholder="title"
          className="px-2 py-1 rounded-sm"
        />
        <textarea
          rows={5}
          name="content"
          placeholder="content"
          className="px-2 py-1 rounded-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 py-2 text-white rounded-sm"
        >
          create post
        </button>
      </form>
    </main>
  );
}
