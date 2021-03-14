import { useFormikContext } from "formik";
import { Toggle } from "rsuite";
import { SwitchProps, SwitchValues } from "./types";

const Switch: React.FC<SwitchProps> = ({ label, name, disabled = false }) => {
  const { values, setFieldValue } = useFormikContext<SwitchValues>();
  const handleChange = (value: boolean) => {
    setFieldValue(name, value);
  };
  return (
    <div className="flex items-center justify-start w-full py-2">
      <span className="mr-4 text-ms">{label}</span>
      <Toggle
        name={name}
        checked={values[name]}
        disabled={disabled}
        onChange={handleChange}
      />
    </div>
  );
};

export { Switch };
