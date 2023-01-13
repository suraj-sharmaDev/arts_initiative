import { TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function CartItems({
  items,
  onClickRemoveCartItem,
}: {
  items: any;
  onClickRemoveCartItem: any;
}) {
  return (
    <div className="w-full">
      {items.map((cart: any) => {
        return (
          <div key={cart._id} className="flex items-center gap-5 bg-white p-4">
            <Image
              src={"/api/getfile/" + cart.artwork.artworkImage}
              width={100}
              height={100}
              alt={cart.artwork.artworkName}
              className="h-[5rem]"
            />
            <div>
              <p className="text-md font-bold capitalize">
                {cart.artwork.artworkName}
              </p>
              <p className="text-xl text-primary">
                Rs. {cart.artwork.artworkPrice}
              </p>
              <button
                className="flex items-center bg-error px-4 py-2 text-white"
                onClick={() => onClickRemoveCartItem(cart._id)}
              >
                <TrashIcon className="mr-1 h-4 w-4" />
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
