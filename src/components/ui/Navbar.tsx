"use client";

import { getUserInfo } from "@/services/auth.service";
import CustomProfileAvatar from "../Avatar/CustomProfileAvatar";
import { MdOutlineMenuOpen } from "react-icons/md";
import { useAppDispatch } from "@/redux/hooks";
import { toggleSidebar } from "@/redux/slice/globalState";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const userDetails = getUserInfo();
  console.log({ userDetails });
  return (
    <nav
      className={`h-18 px-3 flex items-center justify-between rounded-2xl bg-base-300 shadow relative`}
    >
      <button
        type="button"
        onClick={() => appDispatch(toggleSidebar())}
        className={`absolute -left-3 top-1/2 -translate-y-1/2 translate-x-1/2`}
      >
        <MdOutlineMenuOpen size={30} />
      </button>
      {/* LEFT SIDE */}
      <div className="pl-10">
        <input
          type="search"
          name=""
          id=""
          placeholder="Search"
          className={`h-9 border border-gray-300 rounded-full px-3`}
        />
      </div>

      {/* RIGHT SIDE */}
      <CustomProfileAvatar
        name="Jane Doe"
        dropdownItems={[
          {
            label: "Settings",
            onClick: () => console.log("Settings clicked"),
          },
          {
            label: "Logout",
            onClick: () => {
              window.localStorage.clear();
              router.push("/auth/login");
              console.log("Logging out");
            },
          },
        ]}
      />
    </nav>
  );
}
