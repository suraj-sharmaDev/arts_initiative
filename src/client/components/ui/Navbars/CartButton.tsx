"use client";

import useUserCart from "@/hooks/useUserCart";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function CartButton() {
  const { isLoading, isError, userCart } = useUserCart();

  if (isLoading) return null;
  if (isError) return null;
  const totalItems = userCart.length;

  return (
    <Link href="/cart" className="flex">
      <div className="relative">
        {totalItems > 0 && (
          <span className="absolute -top-2 right-0 h-4 w-4 rounded-full bg-white text-center text-xs text-primary">
            {totalItems}
          </span>
        )}
        <ShoppingCartIcon className="mr-2 h-6 w-6" />
      </div>
      <span className="block md:hidden">Cart</span>
    </Link>
  );
}
