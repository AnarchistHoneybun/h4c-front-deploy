type SidebarProps = {
    activeTab: string;
    setActiveTab: (tab: string) => void;
  };
  
  export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
    const tabs = ['My Profile', 'Security', 'My Journey', 'Billing', 'Delete Account'];
  
    return (
      <div className="w-48 flex flex-col" style={{ minWidth: '200px' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-left py-4 px-6 ${
              activeTab === tab ? 'bg-green-100 text-green-800' : 'hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }