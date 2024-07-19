import './Navbar.scss';
import ForecastLogo from 'assets/logo.svg';
import GithubLogo from 'assets/github.svg';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

type ThemeMode = 'light' | 'dark';

export function Navbar() {
  const [ currentTheme, setCurrentTheme ] = useState<ThemeMode>( 'light' );

  const toggleTheme = ( theme: ThemeMode ) => {
    setCurrentTheme( theme );
    document.querySelector( 'html' )?.setAttribute( 'data-mode', theme );
    localStorage.setItem( 'theme', theme );
  };

  useEffect( () => {
    const savedTheme = localStorage.getItem( 'theme' ) as ThemeMode | null;

    if ( savedTheme ) {
      setCurrentTheme( savedTheme );
      document.querySelector( 'html' )?.setAttribute( 'data-mode', savedTheme );
    } else {
      const prefersDarkScheme = window.matchMedia( '(prefers-color-scheme: dark)' ).matches;
      const defaultTheme: ThemeMode = prefersDarkScheme ? 'dark' : 'light';

      setCurrentTheme( defaultTheme );
      document.querySelector( 'html' )?.setAttribute( 'data-mode', defaultTheme );
    }
  }, [] );

  return (
    <div
      className={
        'gradient-box h-14 flex items-center justify-between *:h-full *:text-white'
      }>
      <a href='/' className={'flex gap-1 items-center no-underline'}>
        <img
          className={'h-full'}
          src={ForecastLogo}
          alt='forecast weather app logo'
        />
        <span className={'font-bold text-lg text-center'}>
          Weather forecast
        </span>
      </a>
      <div className='flex h-full box-border space-x-1 p-2'>
        <Button
          variant='text'
          className='text-white'
          onClick={() => toggleTheme( currentTheme === 'light' ? 'dark' : 'light' )}
        >
          {currentTheme === 'light' ? (
            <DarkModeRoundedIcon />
          ) : (
            <LightModeRoundedIcon />
          )}
        </Button>
        <a className={'block *:h-full p-2 box-border'} href={'https://github.com/mh-zeynal/mh-zeynal.github.io'}>
          <img src={GithubLogo} alt="github logo" />
        </a>
      </div>
    </div>
  );
}
