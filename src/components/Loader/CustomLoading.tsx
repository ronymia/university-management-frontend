import React from 'react';

export default function CustomLoading({ height = 'h-40' }: { height?: string }) {
    return (
        <div className={`flex items-center justify-center w-full ${height}`}>
            <span className="loader"></span>
        </div>
    );
}
