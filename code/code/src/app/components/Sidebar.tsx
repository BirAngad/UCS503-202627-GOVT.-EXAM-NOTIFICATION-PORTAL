import { Home, Calendar, BookmarkPlus, Settings, X } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ isOpen, onClose, activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'all', label: 'All Exams', icon: Home },
    { id: 'upcoming', label: 'Upcoming Deadlines', icon: Calendar },
    { id: 'saved', label: 'Saved Exams', icon: BookmarkPlus },
    { id: 'settings', label: 'Preferences', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-white transition-transform lg:sticky lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4 lg:hidden">
            <span className="font-semibold">Menu</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="size-5" />
            </Button>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onClose();
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="size-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="border-t p-4">
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm font-medium text-blue-900">Premium Features</p>
              <p className="mt-1 text-xs text-blue-700">
                Get SMS alerts and priority notifications
              </p>
              <Button className="mt-3 w-full bg-blue-600 hover:bg-blue-700" size="sm">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
