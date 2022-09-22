import { ArticleCard } from '@/components/ArticleCard';
import { Article } from '@/lib/types';

type Props = {
  articles: Article[];
};

export function ArticleList({ articles }: Props) {
  return (
    <div className="list-none grid grid-cols-1 md:grid-cols-3 gap-8">
      {articles.map((article) => (
        <ArticleCard key={article.title} article={article} />
      ))}
    </div>
  );
}
