import React from 'react';

export const Payroll: React.FC<{
  formData: IContract;
  setFormData: React.Dispatch<React.SetStateAction<IContract>>;
}> = (props) => {
  const { formData, setFormData } = props;
  return <>Payroll</>;
};
