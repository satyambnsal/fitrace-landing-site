'use client';
import Spinner from '@/components/Spinner';
import {
  TWITTER_URL,
  GITHUB_URL,
  DOCS_URL,
  PRESENTATION_URL,
} from '@/constants';
import { useSignup } from '@/utils/react-query-hooks';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { PresentationModal } from '@/components/PresentationModal';

export default function Component() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const signupMutation = useSignup({});

  const handleSignup = () => {
    if (email && name) {
      signupMutation.mutate({ email, name });
    }
  };

  const carousalImages = [
    {
      id: 1,
      title: 'landing',
      path: '/screenshots/newShot1.jpg',
    },
    {
      id: 2,
      title: 'game',
      path: '/screenshots/newShot2.jpg',
    },
    {
      id: 3,
      title: 'rules',
      path: '/screenshots/newShot3.jpg',
    },
    {
      id: 4,
      title: 'settings',
      path: '/screenshots/newShot4.jpg',
    },
  ];

  return (
    <body className="leading-normal tracking-normal text-white bg-cover bg-fixed">
      <div className="min-h-screen">
        <div className="w-full container mx-auto">
          <div className="w-full flex items-center justify-between">
            <a className="flex items-center text-primary-foreground no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
              Fit
              <span className="text-gradient">Race</span>
            </a>
            <div className="flex w-1/2 justify-end content-center">
              <div className="">
                <PresentationModal />
              </div>

              <div className="">
                <a
                  className="inline-block text-primary-foreground no-underline hover:opacity-80 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                  href={PRESENTATION_URL}
                  target="_blank"
                >
                  Pitch Deck
                </a>
              </div>

              <div className="">
                <a
                  className="inline-block text-primary-foreground no-underline hover:opacity-80 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                  href={DOCS_URL}
                  target="_blank"
                >
                  Documentation
                </a>
              </div>
              <div className="">
                <a
                  className="inline-block text-primary-foreground no-underline hover:opacity-80 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                  href={TWITTER_URL}
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width={24}
                    height={24}
                    viewBox="0 0 50 50"
                  >
                    <path
                      fill="white"
                      d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"
                    />
                  </svg>
                </a>
              </div>

              <div className="">
                <a
                  className="inline-block text-primary-foreground no-underline hover:opacity-80 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                  target="_blank"
                  href={GITHUB_URL}
                >
                  {/*?xml version="1.0" encoding="UTF-8"?*/}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 23"
                    version="1.1"
                  >
                    <g id="surface1">
                      <path
                        style={{
                          stroke: 'none',
                          fillRule: 'evenodd',
                          fill: 'rgb(100%,100%,100%)',
                          fillOpacity: 1,
                        }}
                        d="M 11.964844 0 C 5.347656 0 0 5.269531 0 11.792969 C 0 17.003906 3.425781 21.417969 8.179688 22.976562 C 8.773438 23.09375 8.992188 22.722656 8.992188 22.410156 C 8.992188 22.136719 8.972656 21.203125 8.972656 20.226562 C 5.644531 20.929688 4.953125 18.820312 4.953125 18.820312 C 4.417969 17.453125 3.625 17.101562 3.625 17.101562 C 2.535156 16.378906 3.703125 16.378906 3.703125 16.378906 C 4.914062 16.457031 5.546875 17.589844 5.546875 17.589844 C 6.617188 19.386719 8.339844 18.878906 9.03125 18.566406 C 9.132812 17.804688 9.449219 17.277344 9.785156 16.984375 C 7.132812 16.710938 4.339844 15.695312 4.339844 11.167969 C 4.339844 9.878906 4.8125 8.824219 5.566406 8.003906 C 5.445312 7.710938 5.03125 6.5 5.683594 4.878906 C 5.683594 4.878906 6.695312 4.566406 8.972656 6.089844 C 9.949219 5.832031 10.953125 5.703125 11.964844 5.699219 C 12.972656 5.699219 14.003906 5.835938 14.957031 6.089844 C 17.234375 4.566406 18.242188 4.878906 18.242188 4.878906 C 18.898438 6.5 18.480469 7.710938 18.363281 8.003906 C 19.136719 8.824219 19.589844 9.878906 19.589844 11.167969 C 19.589844 15.695312 16.796875 16.691406 14.125 16.984375 C 14.558594 17.355469 14.933594 18.058594 14.933594 19.171875 C 14.933594 20.753906 14.914062 22.019531 14.914062 22.410156 C 14.914062 22.722656 15.132812 23.09375 15.726562 22.976562 C 20.480469 21.414062 23.910156 17.003906 23.910156 11.792969 C 23.929688 5.269531 18.558594 0 11.964844 0 Z M 11.964844 0 "
                      />
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container pt-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="grid grid-cols-12">
            <div className="flex flex-col justify-center lg:items-start overflow-y-hidden col-span-7">
              <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                FitRace{' '}
                <span className="text-gradient">
                  is a Web3 lifestyle application on Starknet.
                </span>
              </h1>
              <p className="leading-normal text-base md:text-xl mb-8 text-center md:text-left">
                In the app, Players can purchase NFT sneakers and equip them to
                earn rewards. Initial version plans to have three sneaker
                categories namely Walker, Jogger and Runner with following
                properties.
              </p>

              <form className="bg-[#2e236c99] text-white w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 max-w-[500px]">
                <div className="mb-4">
                  <label
                    className="block py-2 font-bold mb-2"
                    htmlFor="emailaddress"
                  >
                    Signup for our preview version
                  </label>

                  <input
                    className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />

                  <input
                    className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out mt-4"
                    id="emailaddress"
                    type="email"
                    value={email}
                    placeholder="Email Address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    className="bg-gradient text-white font-bold py-2 px-8 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out relative"
                    type="button"
                    onClick={handleSignup}
                  >
                    Sign Up for a beta version
                    <span className="absolute right-2 top-1/2 -translate-y-1/2">
                      {signupMutation.isLoading && <Spinner />}
                    </span>
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full p-12 overflow-hidden col-span-5 text-primary-foreground">
              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}
              >
                <CarouselContent>
                  {carousalImages.map(({ id, title, path }) => {
                    return (
                      <CarouselItem className="py-6" key={id}>
                        <Image
                          src={path}
                          alt={title}
                          className="rounded-xl rotate-[4deg] hover:rotate-12 transition-all h-[600px] object-cover mx-auto"
                          width={250}
                          height={620}
                        />
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          <div className="mx-auto md:pt-16">
            <p className="text-primary-foreground font-bold pb-8 lg:pb-6 text-center">
              Download our app:
            </p>
            <div className="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in">
              <Image
                src="app_store.svg"
                className="h-12 transform hover:scale-125 duration-300 ease-in-out"
                alt="app store"
                width={190}
                height={48}
              />
              <Image
                src="play_store.svg"
                className="h-12 transform hover:scale-125 duration-300 ease-in-out"
                alt="play store"
                width={170}
                height={48}
              />
            </div>
          </div>

          <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
            <a
              className="text-gray-500 no-underline hover:no-underline"
              href="#"
            >
              &copy; Fitrace 2024
            </a>
          </div>
        </div>
      </div>
    </body>
  );
}
