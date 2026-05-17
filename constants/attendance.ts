// constants/attendance.ts

import { MaterialCommunityIcons } from "@expo/vector-icons";

export const attendance = {
  department: "CelcomDigi Project",
  shiftStart: "9:00 AM",
  shiftEnd: "6:00 PM",
  currentStatus: "working",
};

export const attendanceStatuses: Record<
  string,
  {
    label: string;
    dotColor: string;
    cardColor: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    message?: string;
    showShift: boolean;
  }
> = {
  working: {
    label: "Working",
    dotColor: "#FACC15",
    cardColor: "#A16207",
    icon: "progress-clock",
    showShift: true,
  },

  absent: {
    label: "Absent",
    dotColor: "#F87171",
    cardColor: "#991B1B",
    icon: "close-circle",
    message: "You are marked absent today.",
    showShift: false,
  },

  annualLeave: {
    label: "Annual Leave",
    dotColor: "#60A5FA",
    cardColor: "#1D4ED8",
    icon: "beach",
    message: "Enjoy your well deserved break.",
    showShift: false,
  },

  sickLeave: {
    label: "Sick Leave",
    dotColor: "#C084FC",
    cardColor: "#7E22CE",
    icon: "medical-bag",
    message: "Get well soon and rest properly.",
    showShift: false,
  },

  publicHoliday: {
    label: "Public Holiday",
    dotColor: "#FB923C",
    cardColor: "#C2410C",
    icon: "calendar-star",
    message: "Enjoy your public holiday.",
    showShift: false,
  },
};
