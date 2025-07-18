import Image from 'next/image';
import { CustomDropdown } from '../Dropdown/CustomDropdown';
import { getUserInfo } from '@/services/auth.service';
import { useAppSelector } from '@/redux/hooks';
import { getFullName } from '@/utils/getFullName';
import { motion } from 'motion/react';
import { USER_ROLE } from '@/enums/global';
import { superAdminInfo } from '@/constants/superAdmin';
import { fromSnakeCase } from '@/utils/textFormatter.utils';

export default function CustomProfileAvatar({
    name = 'User',
    avatarUrl,
    dropdownItems = [],
}: {
    name?: string;
    avatarUrl?: string;
    dropdownItems?: {
        Icon: React.ElementType;
        label: string;
        onClick: () => void;
    }[];
    size?: string;
}) {
    const { user }: { user: any } = useAppSelector((state) => state.auth);
    const userDetails = getUserInfo() as any;
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    const trigger = (
        <div
            role="button"
            className={`flex items-center gap-3 rounded-full border border-gray-300 p-1 w-fit cursor-pointer pl-5`}
        >
            <div className="flex flex-col text-right">
                <strong className="text-sm">
                    {userDetails?.role === USER_ROLE.SUPER_ADMIN
                        ? getFullName(superAdminInfo.name)
                        : getFullName(user?.name)}
                </strong>
                <small className="text-xs font-semibold text-gray-500 uppercase">
                    {fromSnakeCase(userDetails?.role || '')}
                </small>
            </div>
            <button
                type="button"
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
        </div>
    );

    return (
        <CustomDropdown trigger={trigger} align="right">
            <motion.ul
                className={`absolute top-full mt-1.5 z-50 w-full bg-base-300 shadow-lg drop-shadow-2xs rounded-md border border-primary/20`}
                role="listbox"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
            >
                {dropdownItems.map((item, idx) => (
                    <li
                        key={idx}
                        onClick={item.onClick}
                        className={`cursor-pointer px-3 py-2 m-2  hover:bg-primary rounded-md hover:text-base-300 drop-shadow-lg flex gap-3 items-start justify-start last:m-0 last:bg-error last:rounded-none last:text-base-300
          `}
                        role="option"
                        aria-selected="false"
                    >
                        {item.Icon && <item.Icon size={24} className={``} />} {item.label}
                    </li>
                ))}
            </motion.ul>
        </CustomDropdown>
    );
}
