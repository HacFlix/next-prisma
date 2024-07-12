import prisma from "@/lib/db";

export default async function SinglePostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
  });
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-xl font-semibold">{post?.title}</h1>
      <p className="text-slate-700 tracking-tighter"> {post?.content}</p>
    </main>
  );
}
