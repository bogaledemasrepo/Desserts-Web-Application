// "use client";
// import { SignOutButton, useUser } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";

// function Header() {
//   const { isSignedIn, user } = useUser();
//   const [signoutbtnvissible, setSignoutbtnvissible] = useState(false);
//   return (
//     <header className="fixed top-0 w-[85vw] mx-auto z-50 h-[80px] shadow-sm bg-myred mb-4 px-4 flex items-center justify-between">
//       <h1 className="text-4xl font-bold py-4">Desserts</h1>
//       {isSignedIn && user?.imageUrl ? (
//         <Image
//           onClick={() => setSignoutbtnvissible(!signoutbtnvissible)}
//           className="w-[60px] h-[60px] rounded-full bg-gray-300 cursor-pointer"
//           width={200}
//           height={200}
//           src={user?.imageUrl}
//           alt=""
//         />
//       ) : (
//         <Link href={"/sign-in"}>
//           <div className="py-2 px-4 rounded-md bg-blue-300">
//             <p className="font-semibold">Sign In</p>
//           </div>
//         </Link>
//       )}
//       {isSignedIn && signoutbtnvissible && (
//         <div className="absolute right-0 top-[80px]">
//           <SignOutButton>
//             <div className="py-2 px-4 rounded-md bg-blue-300 cursor-pointer">
//               <p className="font-semibold">Sign out</p>
//             </div>
//           </SignOutButton>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;
