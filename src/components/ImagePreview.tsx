import axios from "axios";
import React, { useEffect } from "react";

interface ImagePreviewProps {
    alt: string;
    image: string;
}

const ImagePreviewFromAPI: React.FC<ImagePreviewProps> = ({ image, alt }) => {
    // if(!file) return null;
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/${image}`, {
                    responseType: 'blob',
                });

                const url = URL.createObjectURL(response.data);
                setImageUrl(url);                
            } catch(err) {
                console.error('Error fetching the image:', err);
            }
        }

        fetchImage();
    }, [image]);

    // Get type image (avatar or complaint)
    const imageFor = image.split("/")[1];

    return (
        imageFor === 'avatar' 
        ? (
            <div>
                <img src={imageUrl ?? ''} alt={alt} className="w-64 h-64 rounded-full object-cover aspect-auto box-border md:h-56 md:w-56 lg:w-64 lg:h-64" />
            </div>
        ) : (
            <div>
                <img src={imageUrl ?? ''} alt={alt} className="w-full h-[18vh] rounded-sm object-cover aspect-auto box-border" />
            </div>
        )
    )
}

export default ImagePreviewFromAPI;