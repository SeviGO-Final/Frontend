import CardFeat from "../elements/cardfeat";
import "boxicons/css/boxicons.min.css";

const FeatureSection = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold py-4">Fitur Utama Kami</h1>
        <hr className="w-2/3 mb-6" />
        <p className="text-lg text-center w-1/2 mb-4">
          Kami menyediakan berbagai fitur yang memudahkan Anda dalam melaporkan
          masalah dan memantau status pengaduan Anda.
        </p>
        <div className="grid grid-cols-2 gap-4 p-4 w-full max-w-4xl">
          <div className="grid grid-rows-2 gap-4">
            <CardFeat
              icon="bx-error"
              title="Pengaduan Cepat dan Mudah"
              paragraph="Proses pengajuan pengaduan hanya dengan beberapa langkah sederhana."
            />
            <CardFeat
              icon="bx-bell"
              title="Notifikasi Otomatis"
              paragraph="Dapatkan pemberitahuan langsung setiap ada pembaruan pada pengaduan Anda."
            />
          </div>
          <div className="grid grid-rows-2 gap-4">
            <CardFeat
              icon="bx-stats"
              title="Pantau Status Pengaduan"
              paragraph="Lacak perkembangan pengaduan Anda secara real-time dari dashboard pengguna."
            />
            <CardFeat
              icon="bx-message-error"
              title="Feedback dari Admin"
              paragraph="Terima tanggapan dan solusi dari admin terkait pengaduan Anda."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureSection;
