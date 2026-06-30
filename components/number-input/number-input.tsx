"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import "./style.css";

interface NumberInputProps<T extends FieldValues>
  extends
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "defaultValue" | "name" | "disabled"
    >,
    UseControllerProps<T> {
  prefix?: string;
  suffix?: string;
  postChange?: (value: number) => void;
}

const NumberInput = React.forwardRef<
  HTMLInputElement,
  NumberInputProps<FieldValues>
>(({ prefix, suffix, postChange, className, ...props }, ref) => {
  const { field, fieldState, formState } = useController(props);

  return (
    <InputGroup className={props.disabled ? "" : ""}>
      {prefix && <InputGroupAddon>{prefix}</InputGroupAddon>}
      <InputGroupInput
        type="number"
        className={cn("no-caret", className)}
        {...field}
        {...props}
        disabled={false}
        ref={ref}
        value={field.value ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          const parsedValue = value === "" ? "" : Number(value);
          field.onChange(parsedValue);
          if (postChange) {
            postChange(value === "" ? 0 : Number(value));
          }
        }}
      />

      {suffix && <InputGroupAddon>{suffix}</InputGroupAddon>}
    </InputGroup>
  );
});

NumberInput.displayName = "NumberInput";

export { NumberInput };
