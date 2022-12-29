import FeaturedItem from "./FeaturedItem";

const data = [
  {
    artistName: "John Doe",
    pictureName: "Morning rise",
    artistImage: "string",
    pictureDiscription: "string",
    artistLink: "string",
    pictureLink: "string",
  },
];
export default function Features() {
  return (
    <div
      className="w-full rounded border-[0.1rem] border-primary py-4 px-6"
      id="features"
    >
      <h1 className="text-2xl font-bold">Features</h1>
      <div className="flex flex-row gap-3">
        {data.map((d, idx) => (
          <FeaturedItem item={d} key={idx} />
        ))}
      </div>
    </div>
  );
}
