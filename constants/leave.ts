export type LeaveStatus = "All" | "Pending" | "Approved" | "Rejected" | "Cancelled";

export type LeaveItem = {
  id: string;
  type: string;
  duration: string;
  days: string;
  appliedAt: string;
  reason: string;
  status: Exclude<LeaveStatus, "All">;
  icon: string;
};

export const leaveFilters: LeaveStatus[] = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
  "Cancelled",
];

export const leaves: LeaveItem[] = [
  {
    id: "1",
    type: "Annual Leave",
    duration: "12 - 14 May 2026",
    days: "3 Days",
    appliedAt: "Applied 2 days ago",
    reason: "Family vacation",
    status: "Approved",
    icon: "palm-tree",
  },
  {
    id: "2",
    type: "Medical Leave",
    duration: "18 May 2026",
    days: "1 Day",
    appliedAt: "Applied today",
    reason: "Fever and clinic appointment",
    status: "Pending",
    icon: "medical-bag",
  },
  {
    id: "3",
    type: "Emergency Leave",
    duration: "4 May 2026",
    days: "1 Day",
    appliedAt: "Applied last week",
    reason: "Personal emergency",
    status: "Rejected",
    icon: "alert",
  },
  {
    id: "4",
    type: "Unpaid Leave",
    duration: "27 - 28 May 2026",
    days: "2 Days",
    appliedAt: "Cancelled yesterday",
    reason: "Personal matters",
    status: "Cancelled",
    icon: "close-circle-outline",
  },
];
