import React from "react";

export type AppListing = {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

export type AppGroup = {
  id: string;
  label: string;
  category: string;
  list: string[];
};

export const AllAppsList: AppListing[] = [
  { id: 'dashboard', label: 'Home', path: '/dashboard/overview', icon: <HomeTwoTone /> },
];
