interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const Textarea = ({
  value,
  onChange,
  placeholder,
  required,
  ...others
}: TextareaProps) => {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      autoFocus={true}
      placeholder={placeholder}
      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md resize-none h-[90px]"
      required={required}
      {...others}
    />
  );
};

export default Textarea;
