import { User, Bell, BellOff, Palette, Globe, Shield, HelpCircle, Info, LogOut, ChevronRight } from "lucide-react";

export function IOSSettings() {
  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#007AFF] flex items-center justify-center">
            <User className="size-8 text-white" />
          </div>
          <div>
            <h3 className="text-[20px] font-semibold">Guest User</h3>
            <p className="text-[15px] text-gray-500">guest@govexam.app</p>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div>
        <h4 className="text-[13px] text-gray-500 uppercase tracking-wide px-4 mb-2">
          Notifications
        </h4>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Bell className="size-5 text-gray-500" />
              <div>
                <div className="text-[17px]">Push Notifications</div>
                <div className="text-[13px] text-gray-500">Get alerts for new exams</div>
              </div>
            </div>
            <label className="relative inline-block w-12 h-7">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-12 h-7 bg-gray-300 peer-checked:bg-[#34C759] rounded-full peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
            </label>
          </div>

          <div className="border-t border-gray-200 flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Bell className="size-5 text-gray-500" />
              <div>
                <div className="text-[17px]">Deadline Reminders</div>
                <div className="text-[13px] text-gray-500">Alerts 3 days before deadline</div>
              </div>
            </div>
            <label className="relative inline-block w-12 h-7">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-12 h-7 bg-gray-300 peer-checked:bg-[#34C759] rounded-full peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
            </label>
          </div>

          <div className="border-t border-gray-200 flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <BellOff className="size-5 text-gray-500" />
              <div>
                <div className="text-[17px]">Email Notifications</div>
                <div className="text-[13px] text-gray-500">Receive exam updates via email</div>
              </div>
            </div>
            <label className="relative inline-block w-12 h-7">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-12 h-7 bg-gray-300 peer-checked:bg-[#34C759] rounded-full peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div>
        <h4 className="text-[13px] text-gray-500 uppercase tracking-wide px-4 mb-2">
          Preferences
        </h4>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <button className="w-full flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Palette className="size-5 text-gray-500" />
              <div className="text-left">
                <div className="text-[17px]">Theme</div>
                <div className="text-[13px] text-gray-500">Light</div>
              </div>
            </div>
            <ChevronRight className="size-5 text-gray-400" />
          </button>

          <div className="border-t border-gray-200">
            <button className="w-full flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <Globe className="size-5 text-gray-500" />
                <div className="text-left">
                  <div className="text-[17px]">Language</div>
                  <div className="text-[13px] text-gray-500">English</div>
                </div>
              </div>
              <ChevronRight className="size-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* About & Support Section */}
      <div>
        <h4 className="text-[13px] text-gray-500 uppercase tracking-wide px-4 mb-2">
          About & Support
        </h4>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <button className="w-full flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Shield className="size-5 text-gray-500" />
              <div className="text-[17px]">Privacy Policy</div>
            </div>
            <ChevronRight className="size-5 text-gray-400" />
          </button>

          <div className="border-t border-gray-200">
            <button className="w-full flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <HelpCircle className="size-5 text-gray-500" />
                <div className="text-[17px]">Help & Support</div>
              </div>
              <ChevronRight className="size-5 text-gray-400" />
            </button>
          </div>

          <div className="border-t border-gray-200">
            <button className="w-full flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <Info className="size-5 text-gray-500" />
                <div className="text-left">
                  <div className="text-[17px]">About</div>
                  <div className="text-[13px] text-gray-500">Version 1.0.0</div>
                </div>
              </div>
              <ChevronRight className="size-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <button className="w-full flex items-center px-4 py-3">
          <div className="flex items-center gap-3">
            <LogOut className="size-5 text-[#FF3B30]" />
            <div className="text-[17px] text-[#FF3B30]">Logout</div>
          </div>
        </button>
      </div>
    </div>
  );
}
