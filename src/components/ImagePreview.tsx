import axios from "axios";
import React, { useEffect } from "react";

interface ImagePreviewProps {
  alt: string;
}

const ImagePreviewFromAPI: React.FC<ImagePreviewProps> = ({ alt }) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [image, setImage] = React.useState<string | null>(null); // Simpan avatar di sini

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user-profile");
        const avatarUrl = response.data.data.avatar;
        setImage(avatarUrl); // Set image di sini
        setImageUrl(`http://localhost:3000/${avatarUrl}`); // Tambahkan URL base jika perlu
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  // Tambahkan pengecekan sebelum memanggil .split()
  const imageFor = image ? image.split("/")[1] : null;

  return imageFor === "avatar" ? (
    <div>
      <img
        src={imageUrl ?? ""}
        alt={alt}
        className="w-[16rem] h-[16rem] rounded-full object-cover aspect-auto box-border "
      />
    </div>
  ) : (
    <div>
      <img
        src={imageUrl ?? ""}
        alt={alt}
        className="w-full h-[18vh] rounded-sm object-cover aspect-auto box-border"
      />
    </div>
  );
};

export default ImagePreviewFromAPI;
