import { useField } from "formik";

interface Props {
  label: string;
  name: string;
}

export default function TextareaField({ label, ...props }: Props) {
  const [field] = useField(props);

  return (
    <div>
      <label htmlFor={props.name}>
        <strong>{label}</strong>
      </label>
      <textarea
        className="block mb-5 rounded w-full h-72 border-2 w-full"
        {...field}
        {...props}
        id={props.name}
      />
    </div>
  );
}
