import { Fragment } from 'react';

import { getPageInfo } from '@/lib/notion';
import { renderBlocks } from '@/lib/renderBlocks';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Container } from 'layouts/Container';
import { StickyColumn } from 'layouts/StickyColumn';
import { GetStaticProps } from 'next';

type Props = {
  toolboxContent: BlockObjectResponse[];
};

export default function Toolbox({ toolboxContent }: Props) {
  return (
    <Container>
      <h1>
        <span className="block text-base font-semibold tracking-wide text-center text-teal-500 uppercase dark:text-teal-400">
          Toolbox
        </span>
        <span className="block max-w-2xl mx-auto mt-2 text-4xl font-bold leading-10 text-center sm:text-5xl">
          Here's what I use daily.
        </span>
      </h1>
      <StickyColumn>
        <div className="col-span-8 mt-12">
          <div className="space-y-16">
            {toolboxContent.map((block) => (
              <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
            ))}
          </div>
        </div>
      </StickyColumn>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getPageInfo(process.env.TOOLBOX_PAGE_ID);

  return {
    props: {
      toolboxContent: data
    },
    revalidate: 1800
  };
};
