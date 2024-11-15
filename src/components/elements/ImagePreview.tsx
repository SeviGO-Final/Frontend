import axios from "axios";
import React, { useEffect } from "react";

interface ImagePreviewProps {
    alt: string;
    avatar: string;
}

const ImagePreviewFromAPI: React.FC<ImagePreviewProps> = ({ avatar, alt }) => {
    // if(!file) return null;
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/${avatar}`, {
                    responseType: 'blob',
                });

                const url = URL.createObjectURL(response.data);
                setImageUrl(url);
            } catch(err) {
                console.error('Error fetching the image:', err);
            }
        }

        fetchImage();
    }, [avatar]);

    return (
        <div>
            <img src={imageUrl ?? ''} alt={alt} className="w-96 h-96 object-cover rounded-full" />
        </div>
    )
}

export default ImagePreviewFromAPI;