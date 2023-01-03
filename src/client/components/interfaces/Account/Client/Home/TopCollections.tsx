import { MultiCarousel } from "@/components/ui";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Stack } from "react-daisyui";

const TopCollections = () => {
  return (
    <div className="space-y-3 rounded bg-primary p-3 text-white">
      <div className="flex items-center">
        <HeartIcon className="mr-3 h-6 w-6" />
        <h1>Top Collections</h1>
      </div>
      <div className="px-3">
        <MultiCarousel>
          {[1, 2, 3, 4, 5, 6].map((d, idx) => (
            <Stack></Stack>
          ))}
        </MultiCarousel>
      </div>
    </div>
  );
};

export default TopCollections;
