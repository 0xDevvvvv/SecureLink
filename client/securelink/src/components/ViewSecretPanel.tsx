export default function ViewSecretPanel({
    secretID,
    setSecretID,
    handleViewSecret,
    fetchedSecret,
  }: any) {
    return (
      <div className="rounded p-6 bg-white shadow space-y-4">
        <h2 className="text-xl font-bold mb-4 text-gray-700">View Secret</h2>
        <input
          type="text"
          className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400"
          placeholder="Enter secret ID"
          value={secretID}
          onChange={(e) => setSecretID(e.target.value)}
        />
        <button
          onClick={handleViewSecret}
          className="w-full py-3 bg-red-700 text-white rounded-xl hover:bg-red-800 transition"
        >
          Fetch Secret
        </button>
        {fetchedSecret && (
          <div className="mt-4 p-4 bg-gray-100 rounded-xl border border-gray-300 break-all">
            <strong>Secret:</strong> {fetchedSecret}
          </div>
        )}
      </div>
    );
  }
  