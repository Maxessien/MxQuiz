import {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";
import { useForm } from "react-hook-form";

const Input = ({
  attrs,
  extraClassNames,
}: {
  attrs?: InputHTMLAttributes<HTMLInputElement>;
  extraClassNames?: string;
}) => {
  return (
    <input
      {...attrs}
      className={
        "w-full max-w-lg rounded-md text-base font-medium shadow-[inset_0px_0px_10px_-6px_var(--text-primary-light)] px-2 py-1 " +
        extraClassNames
      }
      type="text"
    />
  );
};

const Label = ({
  attrs,
  extraClassNames,
  children,
}: {
  attrs?: LabelHTMLAttributes<HTMLLabelElement>;
  extraClassNames?: string;
  children: ReactNode;
}) => {
  return (
    <label {...attrs} className={"text-lg font-medium " + extraClassNames}>
      {children}
    </label>
  );
};

const Errors = ({
  attrs,
  extraClassNames,
  error,
}: {
  attrs?: HTMLAttributes<HTMLParagraphElement>;
  extraClassNames?: string;
  error: string;
}) => {
  return (
    <p
      {...attrs}
      className={"text-sm font-medium text-red-700 " + extraClassNames}
    >
      {error}
    </p>
  );
};

const FieldWrapper = ({
  attrs,
  children,
  extraClassNames,
}: {
  attrs?: HTMLAttributes<HTMLDivElement>;
  extraClassNames?: string;
  children: ReactNode;
}) => {
  return (
    <div
      {...attrs}
      className={
        "w-full flex flex-col gap-2 justify-start items-start " +
        extraClassNames
      }
    >
      {children}
    </div>
  );
};

export { Input, Label, Errors, FieldWrapper };
