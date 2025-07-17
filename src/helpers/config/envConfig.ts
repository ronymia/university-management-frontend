export const getBaseUrl = (): string => {
    return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3030';
};

export const getImageFullLink = (path: string): string => {
    return `${getBaseUrl()}/${path}`;
};
