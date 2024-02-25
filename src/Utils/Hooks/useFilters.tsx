import { useSearchParams } from 'react-router-dom';

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilters = (name: string, value: string | string[]) => {
    const currentFilters = Object.fromEntries(searchParams);
    const updatedFilters = {
      ...currentFilters,
      [name]: value,
    };
    const newParams = new URLSearchParams(updatedFilters as Record<string, string>);
    setSearchParams(newParams);
  };
  return [searchParams, setFilters];
};
