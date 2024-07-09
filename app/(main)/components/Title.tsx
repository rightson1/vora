import Head from "next/head";

function Title({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      {/* description */}
      {description && <meta name="description" content={description} />}
    </Head>
  );
}

export default Title;
