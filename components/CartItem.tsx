import RemoveFromCart from "./RemoveFromCart";

const CartItem = ({
  name,
  price,
  quantity,
}: {
  name: string;
  price: number;
  quantity: number;
}) => {
  return (
    <div className="w-full flex items-center justify-between my-4">
      <div className="">
        <h2 className="text-sm font-bold">{name}</h2>
        <p className="space-x-2 leading-8 text-sm font-semibold">
          <span className="text-myred">{quantity}x</span>
          <span className="text-slate-400">@{price.toFixed(2)}</span>
          <span className="text-slate-500">
            {(quantity * price).toFixed(2)}
          </span>
        </p>
      </div>
      <RemoveFromCart name={name} />
    </div>
  );
};

export default CartItem;
