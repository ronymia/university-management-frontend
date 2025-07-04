import React from 'react';

interface IUserViewProps {
    userId: string;
}

export default function UserView({ userId }: IUserViewProps) {
    console.log({ userId });
    return <div>UserView</div>;
}
