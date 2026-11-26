import { Bell, Search, Menu, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HeaderProps {
  onMenuClick: () => void;
  activeAlerts: number;
}

export function Header({ onMenuClick, activeAlerts }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="size-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-600">
              <span className="font-bold text-white">GE</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-gray-900">GovExam</h1>
              <p className="text-xs text-gray-500">Never Miss an Opportunity</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative hidden sm:flex">
            <Search className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-5" />
            {activeAlerts > 0 && (
              <Badge className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 p-0 text-xs">
                {activeAlerts}
              </Badge>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <User className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
