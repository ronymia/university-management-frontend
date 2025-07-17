import Image from 'next/image';
import { useEffect, useState } from 'react';

interface IImageUploadProps {
    type?: 'circular' | 'square';
    imageUrl: string;
    uploadHandler: (payload: File) => void;
    isLoading: boolean;
    size?: number;
    fallBackText?: string;
}

export default function ImageUploader({
    type = 'circular',
    isLoading = false,
    uploadHandler,
    size = 128,
    imageUrl,
    // fallBackText = 'Upload Image',
}: IImageUploadProps) {
    const [image, setImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            // console.log({ file });

            // 1. Update local preview
            setImage(URL.createObjectURL(file));

            // 2. Pass it up
            uploadHandler(file);
        }
    };

    useEffect(() => {
        if (imageUrl) {
            setImage(imageUrl);
        }
    }, [imageUrl]);

    /* ******************************

  ******************************************/

    return (
        <div className={`rounded-full`}>
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
                    htmlFor="file"
                    className={`w-[128px] h-[128px] rounded-full flex flex-col items-center justify-center cursor-pointer border-1 ${
                        image ? 'border-solid' : 'border-dotted'
                    } border-primary rounded-full hover:border-primary transition-colors bg-base-300`}
                >
                    {isLoading ? (
                        'Loading'
                    ) : image ? (
                        <Image
                            src={image ?? ''}
                            alt="Uploaded"
                            className="w-full h-full object-cover rounded-full p-0.5"
                            height={128}
                            width={128}
                        />
                    ) : (
                        <>
                            <span className="text-primary text-2xl">+</span>
                            <span className="text-primary">Upload</span>
                        </>
                    )}
                    <input
                        id="file"
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
