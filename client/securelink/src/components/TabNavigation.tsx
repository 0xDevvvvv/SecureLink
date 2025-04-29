type Tab = "create" | "view" | "status";

export default function TabNavigation({
  activeTab,
  setActiveTab,
  resetStates,
}: {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  resetStates: () => void;
}) {
  const tabs: Tab[] = ["create", "view", "status"];
  return (
    <div className="flex border-b mb-6 text-gray-600 font-semibold">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            setActiveTab(tab);
            resetStates();
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
  );
}
