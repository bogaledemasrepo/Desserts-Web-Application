import { ApiContext } from "@/hooks/apiContext";
import { ReactNode, useContext } from "react";

const Cartwrapper = ({ children }: { children: ReactNode }) => {
  const { myCart } = useContext(ApiContext);

  return (
    <div className="w-[300px] h-fit py-8 px-2 rounded-md flex flex-col">
      <h2 className="text-2xl text-myred font-bold">
        Your Cart({myCart.length})
      </h2>
      {children}
    </div>
  );
};

export default Cartwrapper;
