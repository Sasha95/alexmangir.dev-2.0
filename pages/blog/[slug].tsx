import {
  getAllArticles,
  getArticlePage,
  getMoreArticlesToSuggest
} from '@/lib/notion';
import { ButtonType, Language, PageType, SubscribeSize } from '@/lib/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Fragment, useEffect } from 'react';

import { AnchorLink } from '@/components/AnchorLink';
import { ArticleList } from '@/components/ArticleList';
import { Button } from '@/components/Button';
import { Callout } from '@/components/Callout';
import { CodeBlock } from '@/components/Codeblock';
import PageViews from '@/components/PageViews';
import Reactions from '@/components/Reactions';
import { ShareArticle } from '@/components/ShareArticle';
import { Subscribe } from '@/components/Subscribe';
import { YoutubeEmbed } from '@/components/YoutubeEmbed';
import siteMetadata from '@/data/siteMetadata';
import generateSocialImage from '@/lib/generateSocialImage';
import { Text } from '@/lib/renderBlocks';
import { getTwitterProfilePicture } from '@/lib/twitter';
import { Client } from '@notionhq/client';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Container } from 'layouts/Container';
import Image from 'next/image';
import { useRouter } from 'next/router';
import slugify from 'slugify';

// export const Text = ({ text }) => {
//   if (!text) {
//     return null;
//   }
//   return text.map((value, index) => {
//     const {
//       annotations: { bold, code, color, italic, strikethrough, underline },
//       text
//     } = value;
//     return (
//       <span
//         key={index}
//         className={[
//           bold ? 'font-bold' : null,
//           italic ? 'font-fancy text-black dark:text-white' : null,
//           code
//             ? 'bg-indigo-200 dark:bg-indigo-900 dark:bg-opacity-50 text-indigo-500 dark:text-indigo-200 py-0.5 px-2 rounded mx-1 inline-block align-middle tracking-tight text-base font-mono'
//             : null,
//           strikethrough ? 'line-through' : null,
//           underline ? 'underline' : null
//         ].join(' ')}
//         style={color !== 'default' ? { color } : {}}
//       >
//         {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
//       </span>
//     );
//   });
// };

export function renderBlocks(block: BlockObjectResponse) {
  const { type, id } = block;

  switch (type) {
    case 'paragraph':
      return (
        <p>
          {block.paragraph.rich_text.map(
            (richText, index) =>
              richText.type === 'text' && Text(richText, index)
          )}
        </p>
      );
    case 'heading_1':
      return (
        <h1>
          <AnchorLink richTextBlock={block.heading_1.rich_text}>
            <>
              {block.heading_1.rich_text.map(
                (richText, index) =>
                  richText.type === 'text' && Text(richText, index)
              )}
            </>
          </AnchorLink>
        </h1>
      );
    case 'heading_2':
      return (
        <h2>
          <AnchorLink richTextBlock={block.heading_2.rich_text}>
            <>
              {block.heading_2.rich_text.map(
                (richText, index) =>
                  richText.type === 'text' && Text(richText, index)
              )}
            </>
          </AnchorLink>
        </h2>
      );
    case 'heading_3':
      return (
        <h3>
          <AnchorLink richTextBlock={block.heading_3.rich_text}>
            <>
              {block.heading_3.rich_text.map(
                (richText, index) =>
                  richText.type === 'text' && Text(richText, index)
              )}
            </>
          </AnchorLink>
        </h3>
      );
    case 'bulleted_list_item':
      return (
        <li>
          {block.bulleted_list_item.rich_text.map(
            (richText, index) =>
              richText.type === 'text' && Text(richText, index)
          )}
        </li>
      );
    case 'numbered_list_item':
      return (
        <li>
          {block.numbered_list_item.rich_text.map(
            (richText, index) =>
              richText.type === 'text' && Text(richText, index)
          )}
        </li>
      );
    case 'to_do':
      return (
        <div>
          <label
            htmlFor={id}
            className="flex items-center justify-start space-x-3"
          >
            <input
              id={id}
              // aria-describedby={value.text}
              name={id}
              type="checkbox"
              className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
            />
            {block.to_do.rich_text.map(
              (richText, index) =>
                richText.type === 'text' && Text(richText, index)
            )}
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            {block.toggle.rich_text.map(
              (richText, index) =>
                richText.type === 'text' && Text(richText, index)
            )}
          </summary>
          {/* {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
          ))} */}
        </details>
      );
    case 'child_page':
      return <p>{block.child_page.title}</p>;
    case 'image':
      const src =
        block.image.type === 'external'
          ? block.image.external.url
          : block.image.file.url;
      const caption =
        block.image.caption.length >= 1
          ? block.image.caption[0].plain_text
          : '';
      return (
        <figure className="mt-0">
          <Image
            className="rounded-xl"
            objectFit="fill"
            width={1200}
            height={684}
            alt={
              caption
                ? caption
                : 'A visual depiction of what is being written about'
            }
            src={src}
          />
          {caption && (
            <figcaption className="text-center">{caption}</figcaption>
          )}
        </figure>
      );
    case 'code':
      return (
        <CodeBlock
          language={block.code.language as Language}
          code={
            block.code.rich_text[0].type === 'text' &&
            block.code.rich_text[0].text.content
          }
        />
      );
    case 'callout':
      return (
        <Callout>
          {block.callout.icon && (
            <span>
              {block.callout.icon.type === 'emoji' && block.callout.icon.emoji}
            </span>
          )}
          <div>
            {block.callout.rich_text.map(
              (richText, index) =>
                richText.type === 'text' && Text(richText, index)
            )}
          </div>
        </Callout>
      );
    case 'embed':
      const codePenEmbedKey = block.embed.url.slice(
        block.embed.url.lastIndexOf('/') + 1
      );
      return (
        <div>
          <iframe
            height="600"
            className="w-full"
            scrolling="no"
            title="Postage from Bag End"
            src={`https://codepen.io/alexmangir/embed/preview/${codePenEmbedKey}?default-tab=result`}
            frameBorder="no"
            loading="lazy"
            allowFullScreen={true}
          >
            See the Pen <a href={block.embed.url}>Postage from Bag End</a> by
            Alexandr Coyer (
            <a href="https://codepen.io/alexmangir">@alexmangir</a>) on{' '}
            <a href="https://codepen.io">CodePen</a>.
          </iframe>
        </div>
      );
    case 'table_of_contents':
      return <div>TOC</div>;
    case 'video':
      return (
        <YoutubeEmbed
          url={block.video.type === 'external' && block.video.external.url}
        />
      );
    case 'quote':
      return (
        <blockquote className="p-4 rounded-r-lg">
          {block.quote.rich_text.map(
            (richText, index) =>
              richText.type === 'text' && Text(richText, index)
          )}
        </blockquote>
      );
    case 'divider':
      return (
        <hr className="my-16 w-full border-none text-center h-10 before:content-['∿∿∿'] before:text-[#D1D5DB] before:text-2xl"></hr>
      );
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
}

const ArticlePage = ({
  content,
  title,
  coverImage,
  slug,
  publishedDate,
  lastEditedAt,
  sponsoredArticleUrl,
  summary,
  moreArticles
}) => {
  const { push } = useRouter();
  const publishedOn = new Date(publishedDate).toLocaleDateString(
    siteMetadata.locale,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  const modifiedDate = new Date(lastEditedAt).toLocaleDateString(
    siteMetadata.locale,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  const socialImageConf = generateSocialImage({
    title,
    underlayImage: coverImage.slice(coverImage.lastIndexOf('/') + 1),
    cloudName: 'alexmangir',
    imagePublicID: 'og_social_large.png'
  });

  useEffect(() => {
    fetch(`/api/views/${slug}`, {
      method: 'POST'
    });
  }, [slug]);

  return (
    <Container
      title={`${title} - Alexandr Mangir`}
      description={summary}
      imageUrl={socialImageConf}
      date={new Date(publishedDate).toISOString()}
      type={PageType.ARTICLE}
      sponsoredArticle={sponsoredArticleUrl !== null}
      sponsoredUrl={sponsoredArticleUrl}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
        <article className="col-span-9 mt-12">
          <div className="space-y-12">
            <div>
              <h1 className="text-3xl text-center font-headings md:text-5xl">
                {title}
              </h1>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2 space-x-2 text-lg">
                  <p className="m-0 text-lg md:text-xl">{publishedOn}</p>
                  <p className="m-0">•</p>
                  <PageViews slug={slug} />
                </div>
                {publishedOn !== modifiedDate && (
                  <p className="mt-0 text-sm text-slate-500 md:text-base dark:text-slate-500">
                    (Updated on {modifiedDate})
                  </p>
                )}
              </div>
            </div>
            <div className="my-12">
              <Image
                className="rounded-xl"
                objectFit="fill"
                src={coverImage}
                width={1200}
                height={684}
                alt={'article cover'}
                priority
              />
            </div>
            {content.map((block) => (
              <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
            ))}
            <div className="md:hidden">
              <Reactions slug={slug} />
            </div>
            <Subscribe size={SubscribeSize.LARGE} />
            {/* Link to sponsor if applicable */}
            {sponsoredArticleUrl && (
              <Callout>
                <span>📣</span>
                <div>
                  <span>
                    This article was originally published{' '}
                    <a
                      target="_blank"
                      href={sponsoredArticleUrl}
                      rel="noreferrer"
                    >
                      here
                    </a>
                    .
                  </span>
                </div>
              </Callout>
            )}
            <div className="flex items-center justify-between space-x-4">
              <Button
                buttonType={ButtonType.PRIMARY}
                onButtonClick={() => push('/blog')}
              >
                Back to the blog
              </Button>
              <div className="md:hidden">
                <ShareArticle title={title} slug={slug} />
              </div>
            </div>

            <div>
              <hr />
              <h3>More articles</h3>
              <p className="mb-12">
                If you enjoyed this article, you'll find these insightful too!
              </p>
              <ArticleList articles={moreArticles} />
            </div>
          </div>
        </article>
        <aside className="hidden w-full lg:inline-block md:sticky md:top-[175px] md:self-start col-span-3 space-y-8">
          <h3 className="m-0 text-sm font-semibold tracking-wider text-center uppercase">
            Article Reactions
          </h3>
          <Reactions slug={slug} />
          <h3 className="m-0 text-sm font-semibold tracking-wider text-center uppercase">
            Share Article
          </h3>
          <ShareArticle title={title} slug={slug} />
        </aside>
      </div>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID);

  data.forEach((result) => {
    if (result.object === 'page') {
      paths.push({
        params: {
          slug: slugify(
            result.properties.Name.title[0].plain_text
          ).toLowerCase()
        }
      });
    }
  });

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  let content = [];
  let articleTitle = '';
  let publishedDate = null;
  let lastEditedAt = null;
  let coverImage = null;
  let sponsoredArticleUrl = null;
  let summary = null;

  const profilePicture = await getTwitterProfilePicture();

  const notion = new Client({
    auth: process.env.NOTION_SECRET
  });

  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID);

  const page: any = getArticlePage(data, slug);

  articleTitle = page.properties.Name.title[0].plain_text;
  publishedDate = page.properties.Published.date.start;
  lastEditedAt = page.properties.LastEdited.last_edited_time;
  sponsoredArticleUrl = page.properties.canonicalUrl?.url;
  summary = page.properties.Summary?.rich_text[0]?.plain_text;
  coverImage =
    page.properties?.coverImage?.files[0]?.file?.url ||
    page.properties.coverImage?.files[0]?.external?.url ||
    'https://via.placeholder.com/600x400.png';

  const moreArticles: any = await getMoreArticlesToSuggest(
    process.env.BLOG_DATABASE_ID,
    articleTitle
  );

  let blocks = await notion.blocks.children.list({
    block_id: page.id
  });

  content = [...blocks.results];

  while (blocks.has_more) {
    blocks = await notion.blocks.children.list({
      block_id: page.id,
      start_cursor: blocks.next_cursor
    });

    content = [...content, ...blocks.results];
  }

  return {
    props: {
      content,
      title: articleTitle,
      publishedDate,
      lastEditedAt,
      slug,
      profilePicture,
      coverImage,
      summary,
      moreArticles,
      sponsoredArticleUrl
    },
    revalidate: 30
  };
};

export default ArticlePage;
