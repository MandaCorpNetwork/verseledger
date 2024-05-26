import React from 'react';

export const Locations: React.FC<{
  formData: IContract;
  setFormData: React.Dispatch<React.SetStateAction<IContract>>;
}> = (props) => {
  const { formData, setFormData } = props;
  return <>Locations</>;
};
