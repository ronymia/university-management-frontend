'use client';

export default function Contents({ children }: { children: React.ReactNode }) {
    return <div className={`flex-1 p-3 rounded-2xl bg-base-300 shadow`}>{children}</div>;
}
