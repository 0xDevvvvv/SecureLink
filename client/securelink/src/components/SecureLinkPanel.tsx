import { useState } from "react";
import TabNavigation from "./TabNavigation";
import CreateSecretForm from "./CreateSecretForm";
import ViewSecretPanel from "./ViewSecretPanel";
import CheckStatusPanel from "./CheckStatusPanel";
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
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} resetStates={() => {
          setFetchedSecret("");
          setStatusResponse(null);
          setGeneratedLink("");
        }} />
  
        {activeTab === "create" && (
          <CreateSecretForm
            secret={secret}
            setSecret={setSecret}
            expiresIn={expiresIn}
            setExpiresIn={setExpiresIn}
            generatedLink={generatedLink}
            loading={loading}
            handleSubmit={handleSubmit}
            handleCopy={handleCopy}
          />
        )}
  
        {activeTab === "view" && (
          <ViewSecretPanel
            secretID={secretID}
            setSecretID={setSecretID}
            handleViewSecret={handleViewSecret}
            fetchedSecret={fetchedSecret}
          />
        )}
  
        {activeTab === "status" && (
          <CheckStatusPanel
            secretID={secretID}
            setSecretID={setSecretID}
            handleStatusCheck={handleStatusCheck}
            statusResponse={statusResponse}
          />
        )}
      </div>
    </div>
  );
}
