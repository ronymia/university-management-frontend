import Image from "next/image";
import { CustomDropdown } from "../Dropdown/CustomDropdown";
import { getUserInfo } from "@/services/auth.service";
import { useAppSelector } from "@/redux/hooks";
import { USER_ROLE } from "@/constants/role";
import { getFullName } from "@/utils/getFullName";

export default function CustomProfileAvatar({
  name = "User",
  avatarUrl,
  dropdownItems = [],
}: {
  name?: string;
  avatarUrl?: string;
  dropdownItems?: { label: string; onClick: () => void }[];
  size?: string;
}) {
  const { user } = useAppSelector((state) => state.auth);
  const userDetails = getUserInfo() as any;
  console.log({ user });
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const trigger = (
    <div
      role="button"
      className={`flex items-center gap-3 rounded-full border border-gray-300 p-1 w-fit pr-6 cursor-pointer`}
    >
      <button
        className={`w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition`}
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-sm font-semibold">{initials}</span>
        )}
      </button>
      <div className="flex flex-col">
        <span className="text-sm font-bold">
          {userDetails?.role === USER_ROLE.SUPER_ADMIN
            ? "MD ROny Mia"
            : getFullName(user?.name)}
        </span>
        <small className="text-xs font-semibold text-gray-500">
          {userDetails?.role || ""}
        </small>
      </div>
    </div>
  );

  return (
    <CustomDropdown trigger={trigger} align="right">
      <ul className="py-2 text-sm text-gray-700">
        {dropdownItems.map((item, idx) => (
          <li
            key={idx}
            onClick={item.onClick}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {item.label}
          </li>
        ))}
      </ul>
    </CustomDropdown>
  );
}
