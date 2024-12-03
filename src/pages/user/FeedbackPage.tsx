const FeedbackPage = () => {
  return (
    <div className="bg-gray-100 h-auto py-8 px-4 rounded-lg">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-white bg-orange-500 p-4 mb-8 rounded-lg">
          Admin Feedback
        </h1>
        <div className="flex justify-between items-start gap-8">
          {/* Image Section */}
          <div className="w-1/4 bg-gray-200 p-4 rounded-lg flex justify-center items-center">
            <span className="text-gray-500">Image Placeholder</span>
          </div>

          {/* Feedback Detail Section */}
          <div className="w-3/4 border border-gray-300 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Feedback Detail
            </h2>
            <div className="border-t border-gray-300 pt-4">
              <h3 className="text-lg font-medium text-gray-700 flex justify-between mb-2">
                Title: <span className="text-gray-500">Ini title</span>
              </h3>
              <p className="text-lg text-gray-700 flex justify-between mb-2">
                Date: <span className="text-gray-500">Ini date</span>
              </p>
              <p className="text-lg text-gray-700">Description: </p>
              <p className="text-gray-500">Ini description</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
