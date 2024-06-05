import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
export const Payroll: React.FC<{
  formData: IContract;
  setFormData: React.Dispatch<React.SetStateAction<IContract>>;
}> = () => {
  // const { formData, setFormData } = props;
  return <>Payroll</>;
};
