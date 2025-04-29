export default function CheckStatusPanel({
    secretID,
    setSecretID,
    handleStatusCheck,
    statusResponse,
  }: any) {
    return (
      <div className="rounded p-6 bg-white shadow space-y-4">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Check Secret Status</h2>
        <input
          type="text"
          className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400"
          placeholder="Enter secret ID"
          value={secretID}
          onChange={(e) => setSecretID(e.target.value)}
        />
        <button
          onClick={handleStatusCheck}
          className="w-full py-3 bg-red-700 text-white rounded-xl hover:bg-red-800 transition"
        >
          Check Status
        </button>
        {statusResponse && (
          <div className="mt-4 p-4 bg-gray-100 rounded-xl border border-gray-300 space-y-2 text-sm text-gray-800">
            <p><span className="font-semibold">ID:</span> {statusResponse.id}</p>
            <p><span className="font-semibold">Created At:</span> {new Date(statusResponse.created_at).toLocaleString()}</p>
            <p><span className="font-semibold">Expires At:</span> {new Date(statusResponse.expires_at).toLocaleString()}</p>
            <p><span className="font-semibold">One-Time View:</span> {statusResponse.one_time ? "Yes" : "No"}</p>
            <p><span className="font-semibold">Viewed:</span> {statusResponse.viewed ? "Yes" : "No"}</p>
          </div>
        )}
      </div>
    );
  }
  