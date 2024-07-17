import './Navbar.scss';
import ForecastLogo from 'assets/logo.svg';
import GithubLogo from 'assets/github.svg';

export function Navbar() {
  return (
    <div className={'gradient-box h-14 flex items-center justify-between *:h-full *:text-white'}>
      <div className={'flex gap-1 items-center'}>
        <img className={'h-full'} src={ForecastLogo} alt="forecast weather app logo" />
        <span className={'font-bold text-lg text-center'}>
          Weather forecast
        </span>
      </div>
      <a className={'block *:h-full p-2'} href={'https://github.com/mh-zeynal/mh-zeynal.github.io'}>
        <img src={GithubLogo} alt="github logo" />
      </a>
    </div>
  );
}
