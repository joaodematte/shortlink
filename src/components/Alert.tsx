import clsx from 'clsx';
import { useState } from 'react';

type TProps = {
  type: 'error' | 'success';
  message: string;
};

const CopyToClipboardIcon = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
  </svg>
);

const CopiedToClipboardIcon = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
    <path
      fillRule="evenodd"
      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const ExternalLinkIcon = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
  </svg>
);

const Alert = ({ message, type }: TProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
  };

  return (
    <div
      className={clsx(
        'p-4 mb-4 text-sm rounded-lg',
        type === 'error' && 'text-white bg-red-600',
        type === 'success' && 'text-white bg-[#4433ff]',
      )}
    >
      {type === 'error' ? (
        message
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <a
              href={message}
              target="_blank"
              rel="noreferrer"
              className="decoration-2 underline-offset-2 hover:underline"
            >
              {message}
            </a>
            <ExternalLinkIcon className="h-5 w-5 opacity-50" />
          </div>
          {copied ? (
            <CopiedToClipboardIcon className="h-5 w-5 opacity-50" />
          ) : (
            <CopyToClipboardIcon className="h-5 w-5 hover:cursor-pointer" onClick={() => handleCopyToClipboard()} />
          )}
        </div>
      )}
    </div>
  );
};

export default Alert;
