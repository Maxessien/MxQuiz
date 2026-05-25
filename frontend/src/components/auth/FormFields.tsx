import {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  OptionHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const Input = ({
  attrs,
  extraClassNames,
}: {
  attrs?: InputHTMLAttributes<HTMLInputElement>;
  extraClassNames?: string;
}) => {
  return (
    <input
      type="text"
      {...attrs}
      className={
        "w-full max-w-lg rounded-md text-base font-medium shadow-[inset_0px_0px_10px_-6px_var(--text-primary-light)] px-2 py-2 " +
        extraClassNames
      }
    />
  );
};

const TextArea = ({
  attrs,
  extraClassNames,
}: {
  attrs?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  extraClassNames?: string;
}) => {
  return (
    <textarea
      {...attrs}
      className={
        "w-full h-25 max-w-lg rounded-md text-base font-medium shadow-[inset_0px_0px_10px_-6px_var(--text-primary-light)] px-2 py-1 " +
        extraClassNames
      }
    />
  );
};

const Select = ({
  attrs,
  extraClassNames,
  options = [],
  optsAttrs,
}: {
  attrs?: SelectHTMLAttributes<HTMLSelectElement>;
  extraClassNames?: string;
  options?: { val: string; text: string | number }[];
  optsAttrs?: OptionHTMLAttributes<HTMLOptionElement>;
}) => {
  return (
    <select
      {...attrs}
      className={
        "w-full max-w-lg bg-(--main-secondary-light) rounded-md text-base font-medium shadow-[inset_0px_0px_10px_-6px_var(--text-primary-light)] px-2 py-1 " +
        extraClassNames
      }
    >
      {options.map(({ text, val }) => (
        <option
          className="hover:bg-(--main-secondary) transition-all"
          {...optsAttrs}
          value={val}
          key={val}
        >
          {text}
        </option>
      ))}
    </select>
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

export { Errors, FieldWrapper, Input, Label, Select, TextArea };

