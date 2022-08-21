import { NextPage } from 'next';
import Head from 'next/head';
import React, { ChangeEvent, useState } from 'react';
import Alert from '../components/Alert';
import Button from '../components/Button';
import Input from '../components/Input';
import trpc from '../utils/trpc';

const Home: NextPage = () => {
  const [urlInput, setUrlInput] = useState<string>('');
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const slugMutation = trpc.useMutation(['slug.create'], {
    onSuccess: (data) => {
      setUrlInput('');
      setAlert({ type: 'success', message: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/${data.slug}` });
    },
    onError: () => {
      setAlert({ type: 'error', message: 'there was an error processing your request, please try again!' });
    },
  });

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    slugMutation.mutate({ url: urlInput });
  };

  return (
    <>
      <Head>
        <title>shortlink | shortify URLs for free</title>
      </Head>
      <div className="p-4 h-screen w-full flex justify-center items-center">
        <div className="w-full max-w-xl flex flex-col gap-2">
          <div className="block text-center">
            <h1 className="font-bold text-3xl">shortlink</h1>
            <p>input your URL below and click generate</p>
          </div>
          <form
            className="mt-2 flex flex-col md:flex-row items-center gap-2"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Input
              id="url"
              placeholder="https://twitter.com/joaodematte"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setUrlInput(event.target.value);
              }}
              // i don't know why but the input value is getting a TypeError but that's life
              // @ts-expect-error
              value={urlInput}
            />
            <Button disabled={urlInput === '' || slugMutation.isLoading} loading={slugMutation.isLoading}>
              generate
            </Button>
          </form>
          {alert !== null && <Alert type={alert.type} message={alert.message} />}
        </div>
      </div>
    </>
  );
};

export default Home;
