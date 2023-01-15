import Card from "../Card";

export default function OrderSummary({
  totalItems,
  totalPrice,
  onPlaceOrder,
}: {
  totalItems: string | number | undefined;
  totalPrice: string | number | undefined;
  onPlaceOrder: () => void;
}) {
  return (
    <div className="static w-full md:fixed md:top-28 md:right-6 md:w-4/12">
      <Card heading="Product Details">
        <Card.Body className="grid grid-cols-2 px-3 py-4">
          <div className="">
            <p>Price ({totalItems} items)</p>
          </div>
          <div className="text-right">Rs. {totalPrice}</div>
        </Card.Body>
        <Card.Footer className="bg-gray-500 text-white">
          <div className="grid grid-cols-2">
            <p>Total</p>
            <p className="text-right">Rs. {totalPrice}</p>
          </div>
        </Card.Footer>
      </Card>
      <div className="fixed bottom-4 left-0 mt-3 grid w-full grid-cols-3 justify-between rounded bg-white px-5 py-2 md:static md:p-2">
        <div className="col-span-2 flex items-center">Rs. {totalPrice}</div>
        <button className="btn-primary btn rounded-none" onClick={onPlaceOrder}>
          <span>Place Order</span>
        </button>
      </div>
    </div>
  );
}
