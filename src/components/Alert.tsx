import clsx from 'clsx';

type TProps = {
  type: 'error' | 'success';
  message: string;
};

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-50" viewBox="0 0 20 20" fill="currentColor">
    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
  </svg>
);

const Alert = ({ message, type }: TProps) => (
  <div
    className={clsx(
      'p-4 mb-4 text-sm rounded-lg flex items-center gap-1',
      type === 'error' && 'text-white bg-red-600',
      type === 'success' && 'text-white bg-[#4433ff]',
    )}
  >
    {type === 'error' ? (
      message
    ) : (
      <>
        <a href={message} target="_blank" rel="noreferrer" className="decoration-2 underline-offset-2 hover:underline">
          {message}
        </a>
        <ExternalLinkIcon />
      </>
    )}
  </div>
);

export default Alert;
