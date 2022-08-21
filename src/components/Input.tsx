// interface InputProps extends  {}

const Input = ({ ...otherProps }: React.HTMLAttributes<HTMLInputElement>) => (
  <input
    className="p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4433ff] mt-1 block w-full text-sm border border-gray-300 rounded-md"
    {...otherProps}
  />
);

export default Input;
