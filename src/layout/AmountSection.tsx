const AmountSection = () => {

  return (
    <div className="flex flex-col justify-center items-center pt-8">
      <h1 className="text-4xl font-bold text-center mb-4">
        Total Tindakan Pengaduan
      </h1>
      <hr className="w-2/3 mb-6" />
      <div className="grid grid-cols-2 gap-4 p-4 w-full max-w-4xl">
        <div className="grid grid-rows-2 gap-4">
          <div className="bg-slate-100 flex flex-col justify-center items-center p-4 rounded-lg">
            <h1 className="text-xl font-semibold">Total Pengaduan</h1>
            <p className="text-2xl">600</p>
          </div>
          <div className="bg-slate-100 flex flex-col justify-center items-center p-4 rounded-lg">
            <h1 className="text-xl font-semibold">Pengaduan dalam proses</h1>
            <p className="text-2xl">600</p>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-4">
          <div className="bg-slate-100 flex flex-col justify-center items-center p-4 rounded-lg">
            <h1 className="text-xl font-semibold">Pengaduan diselesaikan</h1>
            <p className="text-2xl">600</p>
          </div>
          <div className="bg-slate-100 flex flex-col justify-center items-center p-4 rounded-lg">
            <h1 className="text-xl font-semibold">Tanggapan diberikan</h1>
            <p className="text-2xl">600</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmountSection;
