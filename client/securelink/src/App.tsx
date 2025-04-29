import { useState } from "react";

export default function SecureLinkPanel() {
  const [activeTab, setActiveTab] = useState<"create" | "view" | "status">("create");

  const [secret, setSecret] = useState("");
  const [expiresIn, setExpiresIn] = useState<number>(60);
  const [generatedLink, setGeneratedLink] = useState("");
  const [loading, setLoading] = useState(false);

  const [secretID, setSecretID] = useState("");
  const [fetchedSecret, setFetchedSecret] = useState("");

  const [statusResponse, setStatusResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret.trim()) {
      alert("Please enter a secret.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/generate", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, expires_in: expiresIn }),
      });
      const data = await response.json();
      if (data.status === "Success") {
        // setGeneratedLink(window.location.origin + "/s" + data.link);
        setGeneratedLink(data.link);
      } else {
        alert(data.details || "Something went wrong.");
      }
    } catch (error) {
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (generatedLink) {
      await navigator.clipboard.writeText(generatedLink);
      alert("Link copied to clipboard!");
    }
  };

  const handleViewSecret = async () => {
    if (!secretID.trim()) {
      alert("Please enter an ID.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:8080/s/${secretID}`, {
        method: "GET",
        mode: "cors",
      });
      const data = await res.json();
      if (data.status === "Success")
        setFetchedSecret(JSON.stringify(data.secret) || "Secret not found or already viewed.");
    } catch (err) {
      alert("Error fetching secret.");
    }
  };

  const handleStatusCheck = async () => {
    if (!secretID.trim()) {
      alert("Please enter an ID.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:8080/status/${secretID}`, {
        method: "GET",
        mode: "cors",
      });
      const data = await res.json();
      if (data.status === "Success") {
        setStatusResponse(data.secret);
      } else {
        alert("Secret not found or some error occurred.");
      }
    } catch (err) {
      alert("Error checking status.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 p-6 font-mono">
      <div className="w-full max-w-2xl">
        {/* Tabs */}
        <div className="flex border-b mb-6 text-gray-600 font-semibold">
          {["create", "view", "status"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab as any);
                setFetchedSecret("");
                setStatusResponse(null);
                setGeneratedLink("");
              }}
              className={`py-2 px-4 border-b-2 ${
                activeTab === tab
                  ? "border-red-700 text-red-700"
                  : "border-transparent hover:border-gray-300"
              } transition`}
            >
              {tab === "create" && "Create"}
              {tab === "view" && "View Secret"}
              {tab === "status" && "Check Status"}
            </button>
          ))}
        </div>

        {/* Create Panel */}
        {activeTab === "create" && (
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
        )}

        {/* View Panel */}
        {activeTab === "view" && (
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
        )}

        {/* Status Panel */}
        {activeTab === "status" && (
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
                <p>
                  <span className="font-semibold">One-Time View:</span>{" "}
                  {statusResponse.one_time ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-semibold">Viewed:</span>{" "}
                  {statusResponse.viewed ? (
                    <span className="text-red-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-green-600 font-medium">No</span>
                  )}
                </p>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
