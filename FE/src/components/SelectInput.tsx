import { Label, Select } from 'flowbite-react';

type Option = {
    value: string | number;
    label: string;
};

type SelectInputProps = {
    id: string;
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    options: Option[];
    required?: boolean;
};

export default function SelectInput({
    id,
    label,
    value,
    onChange,
    options,
    required = false,
}: SelectInputProps) {
    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            <Select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </Select>
        </div>
    );
}
