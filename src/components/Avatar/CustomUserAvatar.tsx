import Image from "next/image";

export default function UserAvatar({
  name = "User",
  avatarUrl,
  size = "12",
}: {
  name?: string;
  avatarUrl?: string;
  size?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`w-${size} h-${size} rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition`}
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
    </div>
  );
}
