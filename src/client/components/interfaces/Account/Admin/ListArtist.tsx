import { Error, Loading } from "@/components/ui";
import useArtists from "@/hooks/useArtists";
import moment from "moment";

export default function ListArtist() {
  const { isLoading, isError, artists } = useArtists();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  console.log(artists);

  return (
    <div className="mt-5 w-full">
      <ul className="space-y-4">
        {artists.map((a: any) => {
          return (
            <li key={a._id} className="rounded bg-neutral p-5 text-white">
              <p>Creator Name : {a.name}</p>
              <p>Creator Email : {a.email}</p>
              <p>Joined us : {moment(a.createdAt).fromNow()}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
