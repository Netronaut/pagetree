import { promises as fs } from 'fs';
import path from 'path';
import DefaultErrorPage from 'next/error';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

const components = {};

export default function DocBook({ source, error }) {
  if (error) {
    return <DefaultErrorPage statusCode={error.statusCode} />;
  }
  return (
    <div className="docbook">
      {source && <MDXRemote {...source} components={components} />}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { docbook = ['index'] } = params;

  try {
    const source = await fs.readFile(
      `${path.join(process.cwd(), 'docbook', ...docbook)}.mdx`,
      'utf8'
    );
    const mdxSource = await serialize(source);
    return { props: { source: mdxSource } };
  } catch (e) {
    return { props: { error: { statusCode: 404 } } };
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { docbook: false } }],
    fallback: false,
  };
}
