import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  title?: string;
  description?: string;
  socialImage?: string;
}

export default function SocialMeta({
  title = "Prints from Sam King Studio",
  description = "High quality archival Giclée prints for holders of Roots NFTs.",
  socialImage = "/og-image.png",
}: Props) {
  const router = useRouter();
  const baseUrl = "https://prints.samking.studio";
  const url = `${baseUrl}/${router.asPath}`;
  const ogImage = `${baseUrl}${socialImage}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon-64.png" />
      <link rel="icon" sizes="192x192" href="/icon-192.png" />
      <link rel="apple-touch-icon" href="/icon-152.png" />
      <meta name="msapplication-square310x310logo" content="/icon-310.png" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@samkingco" />
    </Head>
  );
}
