'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import content from '@/public/json/home.json';
import { Button } from '../ui/button';
import { Typography } from '../ui/typography';

const Navbar = () => {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { navigation, navLinks } = content.header;


  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        setDrawerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  return (
    <header className="sticky top-0 z-50 flex w-full justify-between gap-4 bg-gray-800 px-8 py-3">
      <div className="flex items-center justify-center gap-8">
        <Image
          alt="logo-image"
          className="w-full object-cover"
          height={30}
          quality={100}
          src={'/images/collegeLogo.png'}
          width={30}
        />

        <Typography variant='h5' className='text-white'> GGCB</Typography>

        <div className="hidden items-center justify-center text-white md:flex md:gap-3 lg:gap-8">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className={`${isAuthPage ? 'hidden' : 'md:flex'} hidden gap-5`}>
        <Button className="rounded-full">
          <Link href={navigation.navigateLogin.href}>
            {navigation.navigateLogin.label}
          </Link>
        </Button>
      </div>
      <div className="flex w-full bg-gray-800 justify-end gap-5 md:hidden">
        <Drawer direction="left" open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              className="relative overflow-hidden hover:bg-gray-700 rounded-full"
              size="sm"
              variant="ghost"
              onClick={toggleDrawer}
            >
              <div
                className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-in-out ${drawerOpen ? 'rotate-180' : ''}`}
              >
                {drawerOpen ? (
                  <X className=" transition-transform text-white hover:bg-gray-700 duration-700 ease-in-out" />
                ) : (
                  <Menu className="transition-transform text-white hover:bg-gray-700 duration-700 ease-in-out" />
                )}
              </div>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[calc(100%-70px)] bg-gray-800 w-64 overflow-y-auto py-6 text-white shadow-none transition-transform duration-500 ease-in-out">
            <div className="flex h-full flex-col justify-between overflow-y-auto py-2">
              <div className="mb-4 flex flex-col gap-3 font-medium">
                {navLinks.map(({ label, href }) => (
                  <Link key={label} href={href} className='hover:bg-gray-700 px-6 py-2 mx-2 hover:rounded-2xl'>
                    {label}
                  </Link>
                ))}
              </div>
              <div className={`${isAuthPage ? 'hidden' : 'flex'} flex-col gap-5 px-6`}>
                <Button className="rounded-full">
                  <Link href={navigation.navigateLogin.href}>
                    {navigation.navigateLogin.label}
                  </Link>
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
};

export default Navbar;