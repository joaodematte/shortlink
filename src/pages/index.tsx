import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Alert from '../components/Alert';
import Button from '../components/Button';
import ExternalLinkIcon from '../components/ExternalLinkIcon';
import trpc from '../utils/trpc';

type Form = {
  url: string;
};

const urlRegex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;

const Home: NextPage = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<Form>();
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const slugMutation = trpc.useMutation(['slug.create'], {
    onSuccess: (data) => {
      reset();
      setAlert({ type: 'success', message: `https://${process.env.NEXT_PUBLIC_APP_URL}/${data.slug}` });
    },
    onError: () => {
      setAlert({ type: 'error', message: 'there was an error processing your request, please try again!' });
    },
  });

  const onSubmit = (data: Form) => {
    slugMutation.mutate({ url: data.url });
  };

  return (
    <>
      <Head>
        <title>shortlink | shortify URLs for free</title>
      </Head>
      <div className="relative p-4 h-screen w-full flex justify-center items-center">
        <div className="w-full max-w-xl flex flex-col gap-2">
          <div className="block text-center">
            <h1 className="font-bold text-3xl">shortlink</h1>
            <p>
              provide a <b>*valid*</b> URL and click generate
            </p>
          </div>
          <form
            className="mt-3 flex flex-col md:flex-row items-center gap-2"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className={clsx(
                'p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4433ff] block w-full text-sm border-2 border-gray-300 rounded-md',
                errors.url && 'ring-2 ring-offset-2 ring-red-600',
              )}
              id="url"
              placeholder="https://twitter.com/joaodematte"
              {...register('url', {
                required: true,
                pattern: urlRegex,
              })}
            />
            <Button disabled={slugMutation.isLoading} loading={slugMutation.isLoading}>
              generate
            </Button>
          </form>
          {alert !== null && <Alert type={alert.type} message={alert.message} />}
        </div>

        <footer className="fixed bottom-4 right-4 flex items-center gap-1">
          <a
            href="https://github.com/joaodematte/shortlink"
            target="_blank"
            rel="noreferrer"
            className="decoration-2 underline-offset-2 hover:underline hover:text-[#4433ff]"
          >
            contribute on GitHub
          </a>
          <ExternalLinkIcon className="h-5 w-5" />
        </footer>
      </div>
    </>
  );
};

export default Home;
