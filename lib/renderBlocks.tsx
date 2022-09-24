import { AnchorLink } from '@/components/AnchorLink';
import {
  BlockObjectResponse,
  TextRichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints';
import Image from 'next/image';
import { Language } from 'prism-react-renderer';
import { Callout } from '../components/Callout';
import { CodeBlock } from '../components/Codeblock';
import { YoutubeEmbed } from '../components/YoutubeEmbed';

export const Text = (value: TextRichTextItemResponse, index: number) => {
  const {
    annotations: { bold, code, color, italic, strikethrough, underline }
  } = value;
  return (
    <span
      key={index}
      className={[
        bold ? 'font-bold' : null,
        italic ? 'italic' : null,
        code
          ? 'bg-indigo-200 dark:bg-indigo-900 dark:bg-opacity-50 text-indigo-500 dark:text-indigo-200 py-0.5 px-2 rounded mx-1 inline-block align-middle tracking-tight text-base'
          : null,
        strikethrough ? 'line-through' : null,
        underline ? 'underline' : null
      ].join(' ')}
      style={color !== 'default' ? { color } : {}}
    >
      {value.type === 'text' ? (
        value.text.link ? (
          <a href={value.text.link.url}>{value.text.content}</a>
        ) : (
          value.text.content
        )
      ) : (
        <></>
      )}
    </span>
  );
};

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
          <>
            {block.bulleted_list_item.rich_text.map(
              (richText, index) =>
                richText.type === 'text' && Text(richText, index)
            )}
          </>
        </li>
      );
    case 'numbered_list_item':
      return (
        <li>
          <>
            {block.numbered_list_item.rich_text.map(
              (richText, index) =>
                richText.type === 'text' && Text(richText, index)
            )}
          </>
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
              // aria-describedby={block.to_do.rich_text[0].plain_text}
              name={id}
              type="checkbox"
              checked={block.to_do?.checked}
              readOnly
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
        <div>
          <CodeBlock
            language={block.code.language as Language}
            code={
              block.code.rich_text[0].type === 'text' &&
              block.code.rich_text[0].text.content
            }
          />
        </div>
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
            Alexandr Mangir (
            <a href="https://codepen.io/alexmangir">@alexmangir</a>) on
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
