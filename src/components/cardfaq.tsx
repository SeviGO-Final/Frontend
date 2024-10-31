const cardfaq = () => {
    return (
      <>
        <ul className="list-none w-4/5 flex flex-col p-8 text-left text-md text-xl mb-16">
          <li className="flex items-center bg-orange-500 rounded-xl px-5 py-4">
            Bagaimana cara membuat pengaduan?
          </li>
          <li className="flex items-center bg-slate-200 rounded-xl px-5 py-4 mb-3">
          Anda perlu mendaftar sebagai pengguna, masuk ke dashboard, dan mengisi formulir 
          pengaduan di bagian "Pengaduan Baru".
          </li>
          <li className="flex items-center bg-orange-500 rounded-xl px-5 py-4">
          Apakah saya bisa melacak status pengaduan?
          </li>
          <li className="flex items-center bg-slate-200 rounded-xl px-5 py-4 mb-3">
          Ya, Anda bisa melacak status pengaduan dari dashboard pengguna. Setiap perubahan 
          status akan diberitahukan melalui notifikasi.
          </li>
          <li className="flex items-center bg-orange-500 rounded-xl px-5 py-4">
            Berapa lama waktu respon dari admin?
          </li>
          <li className="flex items-center bg-slate-200 rounded-xl px-5 py-4 mb-3">
          Admin akan memberikan respon awal dalam waktu maksimal 2 hari setelah pengaduan 
          diajukan.
          </li>
          <li className="flex items-center bg-orange-500 rounded-xl px-5 py-4">
            Apakah pengaduan saya bersifat rahasia?
          </li>
          <li className="flex items-center bg-slate-200 rounded-xl px-5 py-4">
          Ya, semua pengaduan yang diajukan bersifat rahasia dan hanya dapat diakses oleh 
          pihak terkait.
          </li>
        </ul>
      </>
    );
  };
  
  export default cardfaq;
  