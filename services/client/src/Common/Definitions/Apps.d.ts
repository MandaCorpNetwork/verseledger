type AppListing = {
  id: string;
  label: string;
  path: string;
  icon: JSX.Element;
  disabled?: boolean;
};

type AppGroup = {
  id: string;
  label: string;
  category: string;
  list: string[];
};
