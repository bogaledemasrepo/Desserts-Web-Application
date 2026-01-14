"use client";
import data from "@/data";
import { ApiContext } from "@/hooks/apiContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const ConfirmButton = () => {
  const { myCart, getPrice, removeItem, paymentStatus } =
    useContext(ApiContext);
  const [showModal, setShaowModal] = useState(false);
  const router = useRouter();
  const handleStartNewOrder = () => {
    // MAKE PAYMENT PROCESS
    console.log(myCart);
    removeItem();
    setShaowModal(!showModal);
  };

  let totalPrice = 0;
  myCart.forEach((Item) => {
    totalPrice = totalPrice + getPrice(Item.name, Item.quantity);
  });
  const confirmOrderHandler = () => {
    router.push("/checkout");
    // if (paymentStatus == "PENDING")
    // if (paymentStatus != "PENDING") setShaowModal(!showModal);
  };
  // useEffect(() => {
  //   if (paymentStatus != "PENDING") setShaowModal(!showModal);
  // }, []);
  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Order Confirmed
              </h2>
              <p className="text-gray-600">We hope you enjoy your food!</p>
            </div>

            <div className="space-y-4 mb-6">
              {myCart.map(({ name, quantity }) => {
                const Item = data.find((Item) => Item.name === name);
                if (Item) {
                  return (
                    <div key={Item.name} className="flex items-center gap-3">
                      <Image
                        src={Item.image.thumbnail || "/placeholder.svg"}
                        alt={Item.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">
                          {Item.name}
                        </h4>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-orange-600">{quantity}x</span>
                          <span className="text-gray-500">
                            @ ${Item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold">
                        ${(Item.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                } else return;
              })}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Total</span>
                <span className="font-bold text-xl">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleStartNewOrder}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3"
            >
              Start New Order
            </button>
          </div>
        </div>
      )}

      <button
        className="bg-myred px-8 p-3  my-2 rounded-full text-white font-semibold flex items-center justify-center cursor-pointer"
        onClick={() => confirmOrderHandler()}
      >
        Confirm order
      </button>
    </div>
  );
};

export default ConfirmButton;
