import { Home, Bookmark, Settings } from "lucide-react";

interface IOSTabBarProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

export function IOSTabBar({ activeTab, onTabChange }: IOSTabBarProps) {
  const tabs = [
    { icon: Home, label: "Home" },
    { icon: Bookmark, label: "Reminders" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="flex items-center justify-around px-2 pt-1 pb-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === index;
          
          return (
            <button
              key={index}
              onClick={() => onTabChange(index)}
              className="flex flex-col items-center justify-center min-w-[60px] py-1"
            >
              <Icon
                className={`size-6 mb-0.5 ${
                  isActive ? "text-[#007AFF]" : "text-gray-400"
                }`}
              />
              <span
                className={`text-[10px] ${
                  isActive ? "text-[#007AFF] font-medium" : "text-gray-500"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
