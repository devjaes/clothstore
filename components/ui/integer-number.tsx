"use client";
import React, { useState } from "react";

export interface IntegerInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  maxIntegerValue?: number;
}

const IntegerInput = React.forwardRef<HTMLInputElement, IntegerInputProps>(
  ({ maxIntegerValue, className, onChange, disabled, ...props }, ref) => {
    const [value, setValue] = useState(props.value || "");

    const triggerChange = (newValue: string) => {
      setValue(newValue); // actualiza el estado interno
      // crea un evento de cambio sintético para enviar al método onChange prop
      const event = {
        target: {
          value: newValue,
          name: props.name,
        },
      };
      onChange?.(event as React.ChangeEvent<HTMLInputElement>);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (
        /^\d*$/.test(newValue) &&
        (!maxIntegerValue || parseInt(newValue, 10) <= maxIntegerValue)
      ) {
        triggerChange(newValue); // actualiza usando la función de utilidad
      }
    };

    const handleIncrease = () => {
      setValue((currentValue) => {
        const numericValue = parseInt((currentValue as string) || "0", 10);
        if (!maxIntegerValue || numericValue < maxIntegerValue) {
          const newValue = String(numericValue + 1);
          triggerChange(newValue); // actualiza usando la función de utilidad
          return newValue;
        }
        return currentValue;
      });
    };

    const handleDecrease = () => {
      setValue((currentValue) => {
        const numericValue = Math.max(
          parseInt((currentValue as string) || "0", 10) - 1,
          0
        );
        const newValue = String(numericValue);
        triggerChange(newValue); // actualiza usando la función de utilidad
        return newValue;
      });
    };

    return (
      <div
        className="flex flex-row space-x-0"
        style={{ width: "fit-content", maxWidth: "100%" }}
        data-testid="integer-input"
      >
        <button
          type="button"
          onClick={handleDecrease}
          disabled={disabled}
          className="text-white hover:text-slate-400 focus:outline-none bg-primaryBlack disabled:bg-gray-500 font-bold rounded-sm rounded-l-none px-3"
        >
          -
        </button>
        <input
          {...props}
          type="text"
          value={value}
          disabled={disabled}
          onChange={handleChange}
          ref={ref}
          className={
            "ml-2 mr-0 w-1/2 h-10 rounded-md rounded-r-none border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" +
            className
          }
        />
        <div className="flex flex-col m-0"></div>
        <button
          type="button"
          disabled={disabled}
          onClick={handleIncrease}
          className="text-white hover:text-slate-400 focus:outline-none bg-primaryBlack disabled:bg-gray-500 font-bold rounded-sm rounded-l-none px-3 "
        >
          +
        </button>
      </div>
    );
  }
);

IntegerInput.displayName = "IntegerInput";

export { IntegerInput };
