import { UserIcon } from "@heroicons/react/24/solid";

type Props = {
  item: {
    artistName: string;
    pictureName: string;
    artistImage: string;
    pictureDiscription: string;
    artistLink: string;
    pictureLink: string;
  };
};

export default function ({ item }: Props) {
  return (
    <div className="border-1 bg-white">
      <UserIcon />
    </div>
  );
}
