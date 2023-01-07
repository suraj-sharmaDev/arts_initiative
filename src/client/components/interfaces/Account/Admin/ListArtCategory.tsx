import { Error, Loading } from "@/components/ui";
import useArtCategory from "@/hooks/useArtCategory";

export default function ListArtCategory() {
  const { isLoading, isError, category } = useArtCategory();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="mt-5 w-full">
      <ul className="flex flex-wrap gap-y-5 md:gap-x-1 lg:gap-x-10">
        {category.map((c: any) => {
          return (
            <li
              key={c._id}
              className="relative w-full rounded bg-neutral p-5 text-white md:w-1/4 lg:w-1/6"
            >
              <p>Name : {c.categoryName}</p>
              <p>Tag : {c.categoryTag}</p>
              <p>Description : {c.categoryDescription}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
