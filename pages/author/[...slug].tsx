import Link from "next/link";
import { useRouter } from "next/router";

const Comment = () => {
  const router = useRouter();
  const slug = (router.query.slug as string[]) || [];

  return (
    <div>
      <Link href="/">Go to home</Link>
      <h1>Slug: {slug.join("/")}</h1>
    </div>
  );
};

export default Comment;
