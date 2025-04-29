export default function CreateSecretForm({
    secret,
    setSecret,
    expiresIn,
    setExpiresIn,
    generatedLink,
    loading,
    handleSubmit,
    handleCopy,
  }: any) {
    return (
      <div className="rounded p-6 bg-white shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Create a Secure Link</h2>
        {!generatedLink ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="w-full h-32 p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Type your secret message..."
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
            />
            <div>
              <label className="block text-gray-600 mb-1">Expire After (minutes)</label>
              <input
                type="number"
                className="w-full p-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400"
                value={expiresIn}
                onChange={(e) => setExpiresIn(parseInt(e.target.value))}
                min={1}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-700 text-white rounded-xl hover:bg-red-800 transition"
            >
              {loading ? "Generating..." : "Generate Link"}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-green-600 font-semibold">Your Secure Link is ready!</p>
            <div className="p-3 bg-gray-100 rounded-xl border border-gray-300 break-all">
              {generatedLink}
            </div>
            <button
              onClick={handleCopy}
              className="py-2 px-4 bg-red-700 text-white rounded-xl hover:bg-red-800 transition"
            >
              Copy Link
            </button>
          </div>
        )}
      </div>
    );
  }
  