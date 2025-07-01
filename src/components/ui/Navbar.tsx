'use client';

import CustomProfileAvatar from '../Avatar/CustomProfileAvatar';
import { MdOutlineLogout, MdOutlineMenuOpen } from 'react-icons/md';
import { useAppDispatch } from '@/redux/hooks';
import { toggleSidebar } from '@/redux/slice/globalState';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { GrUserSettings } from 'react-icons/gr';
import { TbUserEdit } from 'react-icons/tb';
import { useUserLogoutMutation } from '@/redux/api/authApi';
import { FaSync } from 'react-icons/fa';

export default function Navbar() {
    const router = useRouter();
    const appDispatch = useAppDispatch();
    const [logout, logoutResult] = useUserLogoutMutation();

    // const lastScrollTopRef = useRef(0);

    // useEffect(() => {
    //   const handleScroll = () => {
    //     const scrollTop =
    //       window.pageYOffset || document.documentElement.scrollTop;

    //     if (scrollTop < lastScrollTopRef.current) {
    //       appDispatch(toggleStickyNavbar(true));
    //     } else {
    //       appDispatch(toggleStickyNavbar(false));
    //     }

    //     lastScrollTopRef.current = scrollTop <= 0 ? 0 : scrollTop;
    //     appDispatch(setLastScrollTopNavbar(lastScrollTopRef.current));
    //   };

    //   window.addEventListener("scroll", handleScroll);
    //   return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    return (
        <AnimatePresence mode="wait">
            {
                <motion.nav
                    key="sticky-navbar"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`h-18 z-40 relative px-3 flex items-center justify-end md:justify-between rounded-2xl bg-base-300 shadow`}
                >
                    <button
                        type="button"
                        onClick={() => appDispatch(toggleSidebar())}
                        className={`absolute -left-3 top-1/2 -translate-y-1/2 translate-x-1/2`}
                    >
                        <MdOutlineMenuOpen size={30} />
                    </button>

                    {/* LEFT SIDE */}
                    <div className="pl-10 hidden md:block">
                        <input
                            type="search"
                            placeholder="Search"
                            className={`h-9 border border-gray-300 rounded-full px-3`}
                        />
                    </div>

                    {/* RIGHT SIDE */}
                    <CustomProfileAvatar
                        name="Jane Doe"
                        dropdownItems={[
                            {
                                Icon: TbUserEdit,
                                label: 'Profile',
                                onClick: () => console.log('Settings clicked'),
                            },
                            {
                                label: 'Settings',
                                Icon: GrUserSettings,
                                onClick: () => console.log('Settings clicked'),
                            },
                            {
                                Icon: logoutResult.isLoading ? FaSync : MdOutlineLogout,
                                label: 'Logout',
                                onClick: async () => {
                                    await logout(undefined)
                                        .unwrap()
                                        .then(() => {
                                            window.localStorage.clear();
                                            router.push('/auth/login');
                                            console.log('Logging out');
                                        });
                                },
                            },
                        ]}
                    />
                </motion.nav>
            }
        </AnimatePresence>
    );
}
