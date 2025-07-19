export default function CustomLoading({
    height = 'h-40',
    className,
}: {
    height?: string;
    className?: string;
}) {
    return (
        <div
            className={`flex items-center justify-center w-full ${height} ${className ? className : ''}`}
        >
            <span className="loader"></span>
        </div>
    );
}
