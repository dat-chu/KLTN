interface Option {
  value: string;
  label: string;
}

export const convertToSelectOptions = (input: { id: number; name: string }[]) => {
    return input.map(item => ({
      value: item.id,
      label: item.name, 
    }));
  };

export const getLabelByValue = (value: string, options: Option[]): string => {
  const matched = options.find(option => option.value === value);
  return matched ? matched.label : value;
};