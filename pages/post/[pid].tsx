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

export const getStaticProps = () => ({
  props: {},
});

export const getStaticPaths = () => ({
  paths: [{ params: { pid: 'abc' } }, { params: { pid: 'abcd' } }],
  fallback: false,
});

export default Post;
