"use client";

import { cn, formatNumber } from "@/lib/utils";
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

interface NumberInputProps<
  T extends FieldValues,
> extends UseControllerProps<T> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  placeholder?: string;
  className?: string;
  postChange?: (value: number) => void;
}

const NumberInput = React.forwardRef<
  HTMLInputElement,
  NumberInputProps<FieldValues>
>(
  (
    { prefix, suffix, postChange, className, placeholder, disabled, ...props },
    ref,
  ) => {
    const { field } = useController(props);
    return (
      <InputGroup
        className={cn(
          disabled && " cursor-none pointer-events-none border-0",
          className,
        )}
      >
        {prefix && <InputGroupAddon>{prefix}</InputGroupAddon>}
        {disabled ? (
          <span className="ps-1.5">{formatNumber(field.value, true)}</span>
        ) : (
          <InputGroupInput
            type="number"
            {...field}
            ref={ref}
            placeholder={placeholder || ""}
            onChange={(e) => {
              const value = e.target.value;
              const parsedValue = value === "" ? undefined : Number(value);
              field.onChange(parsedValue);
              if (postChange) {
                postChange(value === "" ? 0 : Number(value));
              }
            }}
          />
        )}

        {suffix && (
          <InputGroupAddon align={"inline-end"}>{suffix}</InputGroupAddon>
        )}
      </InputGroup>
    );
  },
);

NumberInput.displayName = "NumberInput";

export { NumberInput };
