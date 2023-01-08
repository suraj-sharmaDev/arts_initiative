"use client";

import useUserCart from "@/hooks/useUserCart";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function CartButton() {
  const { isLoading, isError, userCart } = useUserCart();

  if (isLoading) return null;
  if (isError) return null;

  return (
    <>
      <ShoppingCartIcon className="mr-2 h-6 w-6" />
      <span className="block md:hidden">Cart</span>
    </>
  );
}
