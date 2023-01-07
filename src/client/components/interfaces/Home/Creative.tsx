import { MultiCarousel } from "@/components/ui";
import { FireIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const data = {
  artistName: "John Doe",
  pictureName: "Morning rise",
  artistImage: "string",
  pictureDiscription: "string",
  artistLink: "string",
  pictureLink: "string",
};

interface Props {
  onClickCartBtn: () => void;
}

export default function Creative({ onClickCartBtn }: Props) {
  return (
    <div className="w-full rounded p-6 pb-10 text-primary" id="creative">
      <div className="mb-5 flex items-center">
        <FireIcon className="h-8 w-8" />
        <h1 className="text-2xl font-semibold">Creative</h1>
      </div>
      <p className="mb-4 font-medium">
        Selected list of popular creative artworks
      </p>
      <MultiCarousel>
        {[1, 2, 3, 4, 5, 6].map((d, idx) => (
          <div
            className="w-full place-content-center space-y-2 rounded rounded border-[0.1rem] border-primary p-3 text-right md:w-5/6"
            key={idx}
          >
            <div className="flex w-full place-content-center rounded-full">
              <UserCircleIcon className="h-12 w-12" />
            </div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
              className="h-[12rem] w-full rounded lg:h-60"
            />
            <div className="flex items-center justify-between">
              <button
                className="rounded border border-primary px-4 py-1 hover:bg-primary hover:text-white"
                onClick={onClickCartBtn}
              >
                Add Cart
              </button>
              <span className="text-sm"> - Artist Name</span>
            </div>
          </div>
        ))}
      </MultiCarousel>
    </div>
  );
}
