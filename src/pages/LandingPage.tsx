import Navbar from "../layout/Navbar";
import FeatureSection from "../layout/FeatSect";
import InfoSection from "../layout/InfoSect";
import FAQSection from "../layout/FAQSect.tsx";
import AmountSection from "../layout/AmountSection.tsx";
import backgroundImage from "../assets/image/section1-bg.jpg";

const LandingPage = () => {
  return (
    <>
      <div className="absolute inset-0 bg-black opacity-50" />
      <div
        className="flex items-center justify-center h-screen bg-cover bg-center "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="relative flex flex-col items-center text-center text-white">
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
      <FAQSection />
    </>
  );
};

export default LandingPage;
