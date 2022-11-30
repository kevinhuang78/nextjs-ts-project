import Link from "next/link";
import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { pid, foo } = router.query;

  return (
    <div>
      <Link href='/'>Go to home</Link>
      <p>Post: {pid}</p>
      {foo && (
        <p>Foo: {foo}</p>
      )}
    </div>
  );
};

export default Post;
