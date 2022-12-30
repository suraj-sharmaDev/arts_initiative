import { FireIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Carousel } from "react-daisyui";

const data = {
  artistName: "John Doe",
  pictureName: "Morning rise",
  artistImage: "string",
  pictureDiscription: "string",
  artistLink: "string",
  pictureLink: "string",
};

export default function Features() {
  return (
    <div
      className="w-full rounded border border-primary bg-primary p-6 pb-10 text-white"
      id="features"
    >
      <div className="mb-5 flex items-center">
        <FireIcon className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Featured</h1>
      </div>
      <p className="mb-4 font-bold">Weekly featured arts</p>
      <Carousel className="gap-6 px-5">
        {[1, 2, 3, 4, 5, 6].map((d, idx) => (
          <Carousel.Item key={idx}>
            <div className="place-content-center rounded border-[0.1rem] border-white p-3 text-right">
              <div className="flex w-full place-content-center rounded-full">
                <UserCircleIcon className="h-12 w-12" />
              </div>
              <div className="mb-3 w-full">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
                  className="h-48 w-[14rem]"
                />
              </div>
              <span className="font-bold"> - Artist Name</span>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
