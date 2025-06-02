import { useState } from "react"
import UsersAttendanceTable from "./UsersAttendanceTable";
import UsersListTable from "./UsersListTable";

const ViewTab = {
  ATTENDANCE: "ATTENDANCE",
  USERS: "USERS",
} as const;

type ViewTab = (typeof ViewTab)[keyof typeof ViewTab];

const ControlUser = () => {
    const [activeTab, setActiveTab] = useState<ViewTab>(ViewTab.ATTENDANCE);

    const TabButton = ({
            label,
            isActive,
            onClick,
        }: {
            label: string;
            isActive: boolean;
            onClick: () => void;
        }) => {
        return (
                <button
                onClick={onClick}
                className={`px-4 py-2 rounded font-medium transition-all ${
                    isActive
                    ? "bg-neutral-800 text-white"
                    : "bg-neutral-300 text-neutral-800 hover:bg-neutral-400"
                }`}
                >
                {label}
                </button>
            );
        };

  return (
    <div className="bg-neutral-50 flex flex-col w-full h-full px-4 py-6 gap-4 rounded-2xl">
      <div className="flex gap-4">
        <TabButton
          label="Attendances List"
          isActive={activeTab === ViewTab.ATTENDANCE}
          onClick={() => setActiveTab(ViewTab.ATTENDANCE)}
        />
        <TabButton
          label="Users List"
          isActive={activeTab === ViewTab.USERS}
          onClick={() => setActiveTab(ViewTab.USERS)}
        />
      </div>

      <div className="flex-1">
        {activeTab === ViewTab.ATTENDANCE ? <UsersAttendanceTable /> : <UsersListTable />}
      </div>
    </div>
  );
}

export default ControlUser