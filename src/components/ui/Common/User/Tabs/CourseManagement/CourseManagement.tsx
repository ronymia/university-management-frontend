import useUserProfile from '@/hooks/useUserProfile';

export default function CourseManagement() {
    const { userInfo } = useUserProfile();
    console.log({ userInfo });

    return (
        <section
            className={`rounded-md p-3 border border-[#eee] shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5`}
        >
            coming soon
        </section>
    );
}
