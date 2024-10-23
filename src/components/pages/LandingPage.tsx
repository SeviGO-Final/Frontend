import backgroundImage from "../../assets/image/section1-bg.jpg";
import Navbar from "../layout/Navbar";
import FeatureSection from "../layout/FeatSect";
import InfoSection from "../layout/InfoSect";
import AmountSection from "../layout/AmountSection.tsx";

const LandingPage = () => {
  return (
    <>
      <div
        className="flex items-center justify-center h-screen bg-cover bg-center "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white font-Poopins">
          <h1 className="text-5xl font-bold mb-4">SeviGo</h1>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Kami hadir untuk memudahkan masyarakat dalam menyampaikan keluhan
            dan pengaduan terkait pelayanan publik. Bersama kita wujudkan
            pelayanan yang lebih baik.
          </p>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>
      <Navbar />
      <AmountSection />
      <FeatureSection />
      <InfoSection />
    </>
  );
};

export default LandingPage;
