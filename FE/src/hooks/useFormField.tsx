import { useState } from "react";

interface returnUseFormField {
  value: string;
  isValid: boolean;
  onChange: (newValue: string) => void;
  clear: () => void;
}

function useFormField(initialValue: string, validator?: (value: string) => boolean): returnUseFormField {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);

  const onChange = (newValue: string) => {
    setValue(newValue);
    if (validator) {
      setIsValid(validator(newValue));
    }
  };

  const clear = () => {
    setValue("");
    setIsValid(false);
  };

  return {
    value,
    isValid,
    onChange,
    clear,
  };
}

export default useFormField;
