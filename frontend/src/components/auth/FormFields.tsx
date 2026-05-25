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
      type={attrs?.type || "text"}
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
        "w-full h-25 rounded-xl bg-(--main-secondary) border border-[#2a2d3a] focus:outline-none focus:ring-2 focus:ring-(--main-primary-light)/50 focus:border-(--main-primary-light) text-sm font-medium text-(--text-primary-light) transition-all px-4 py-3 placeholder:text-(--text-secondary) " +
        (extraClassNames || "")
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
        "w-full rounded-xl bg-(--main-secondary) border border-[#2a2d3a] focus:outline-none focus:ring-2 focus:ring-(--main-primary-light)/50 focus:border-(--main-primary-light) text-sm font-medium text-(--text-primary-light) transition-all px-4 py-3 " +
        (extraClassNames || "")
      }
    >
      {options.map(({ text, val }) => (
        <option
          className="hover:bg-(--main-secondary-light) transition-all"
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
  children?: ReactNode;
}) => {
  return (
    <label
      {...attrs}
      className={
        "text-(--text-primary-light) text-sm font-semibold mb-1.5 inline-block " +
        (extraClassNames || "")
      }
    >
      {children}
    </label>
  );
};

const FieldWrapper = ({
  attrs,
  extraClassNames,
  children,
}: {
  attrs?: HTMLAttributes<HTMLDivElement>;
  extraClassNames?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      {...attrs}
      className={"flex flex-col w-full relative " + (extraClassNames || "")}
    >
      {children}
    </div>
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
      className={"text-sm font-medium text-red-700 " + (extraClassNames || "")}
    >
      {error}
    </p>
  );
};

export { Errors, FieldWrapper, Input, Label, Select, TextArea };

