import Image from 'next/image';
import { useState } from 'react';

interface IImageUploadProps {
    type?: 'circular' | 'square';
    imageUrl: string;
    handleGetImage: (payload: File) => void;
    isLoading: boolean;
    size?: string;
    name?: string;
}

export default function ImageUploader({
    type = 'circular',
    isLoading = false,
    handleGetImage,
    size = '32',
}: IImageUploadProps) {
    const [image, setImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log({ file });

            // 1. Update local preview
            setImage(URL.createObjectURL(file));

            // 2. Pass it up
            handleGetImage(file);
        }
    };

    /* ******************************

  ******************************************/

    return (
        <div className={`flex gap-4 w-${size} h-${size}`}>
            {/* Square Upload Box */}
            {type === 'square' && (
                <label
                    className={`flex flex-col items-center justify-center w-${size} h-${size} cursor-pointer border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors`}
                >
                    {image ? (
                        <Image
                            src={image ?? ''}
                            alt="Uploaded"
                            className="w-full h-full object-cover rounded-full p-0.5"
                            height={128}
                            width={128}
                        />
                    ) : (
                        <>
                            <span className="text-gray-500 text-2xl">+</span>
                            <span className="text-gray-500">Upload</span>
                        </>
                    )}
                    <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>
            )}

            {/* Circular Upload Box */}
            {type === 'circular' && (
                <label
                    className={`flex flex-col items-center justify-center w-${size} h-${size} cursor-pointer border-1 ${
                        image ? 'border-solid' : 'border-dotted'
                    } border-primary rounded-full hover:border-primary transition-colors bg-gray-500`}
                >
                    {isLoading ? (
                        'Loading'
                    ) : (
                        <Image
                            src={image ?? ''}
                            alt="Uploaded"
                            className="w-full h-full object-cover rounded-full p-0.5"
                            height={128}
                            width={128}
                        />
                    )}
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                </label>
            )}
        </div>
    );
}
