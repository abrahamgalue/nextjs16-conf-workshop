import Link from "next/link";
import {clsx} from "clsx";

import type {Category} from "@/api";

const styles = {
  defaultButtonClass: "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
  activeButtonClass: "bg-primary text-primary-foreground",
};

export default async function CategoryFilter({
  categories,
  searchParams,
}: {
  categories: Category[];
  searchParams: Promise<{category?: string}>;
}) {
  const {category: categoryFilter} = await searchParams;

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        className={clsx(
          styles.defaultButtonClass,
          categoryFilter === undefined && styles.activeButtonClass,
        )}
        href="/blog"
      >
        All Posts ({categories.reduce((sum, cat) => sum + cat.postCount, 0)})
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          className={clsx(
            styles.defaultButtonClass,
            categoryFilter === category.slug && styles.activeButtonClass,
          )}
          href={`/blog?category=${category.slug}`}
        >
          {category.name} ({category.postCount})
        </Link>
      ))}
    </div>
  );
}

export function CategoryFilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="bg-muted h-8 w-24 animate-pulse rounded-md" />
      <div className="bg-muted h-8 w-24 animate-pulse rounded-md" />
      <div className="bg-muted h-8 w-24 animate-pulse rounded-md" />
      <div className="bg-muted h-8 w-24 animate-pulse rounded-md" />
      <div className="bg-muted h-8 w-24 animate-pulse rounded-md" />
      <div className="bg-muted h-8 w-24 animate-pulse rounded-md" />
    </div>
  );
}
