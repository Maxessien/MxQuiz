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
        "w-full rounded-xl bg-(--main-secondary) border border-[#2a2d3a] focus:outline-none focus:ring-2 focus:ring-(--main-primary-light)/50 focus:border-(--main-primary-light) text-sm font-medium text-(--text-primary-light) transition-all px-4 py-3 placeholder:text-(--text-secondary) " +
        (extraClassNames || "")
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
  children,
}: {
  attrs?: LabelHTMLAttributes<HTMLLabelElement>;
  children?: ReactNode;
}) => {
  return (
    <label
      {...attrs}
      className={
        "text-(--text-primary-light) text-sm font-semibold mb-1.5 inline-block" +
        (attrs?.className || "")
      }
    >
      {children}
    </label>
  );
};

const FieldWrapper = ({ children }: { children?: ReactNode }) => {
  return <div className="flex flex-col w-full relative">{children}</div>;
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

export { Errors, FieldWrapper, Input, Label, Select, TextArea };

