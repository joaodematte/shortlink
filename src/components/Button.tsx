interface TProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: string;
  loading?: boolean;
  disabled?: boolean;
}

const SpinnerIcon = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Button = ({ children, loading, ...props }: TProps) => (
  <button
    type="submit"
    className="relative w-full md:w-fit flex gap-2.5 justify-center items-center py-2 px-4 border-2 border-transparent text-sm font-medium rounded-md text-white bg-[#4433ff] hover:bg-[#3829d9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4433ff] disabled:opacity-75 disabled:hover:bg-[#4433ff]"
    {...props}
  >
    {loading && <SpinnerIcon />}
    {children}
  </button>
);

Button.defaultProps = {
  loading: false,
  disabled: false,
};

export default Button;
