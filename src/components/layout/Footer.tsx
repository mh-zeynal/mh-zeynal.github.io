import FooterBackgroundUrl from 'assets/waveBackground.svg';
import GithubLogoUrl from 'assets/github.svg';
import LinkedinLogoUrl from 'assets/linkein.svg';
import moment from 'moment';

export function Footer() {
  return (
    <section className={'relative h-80 overflow-hidden flex flex-col justify-end *:z-10'}>
      <img className={'absolute top-0 h-full md:h-auto'} src={FooterBackgroundUrl} alt="waving water svg" />
      <ul className={'socials space-y-2 list-none'}>
        <li>
          <a
            className={'h-12 flex items-center gap-2 text-white font-medium'}
            href='https://www.linkedin.com/in/mohammad-hossein-zeynal-zadeh-a3b1b8213/'
          >
            <img className={'h-full'} src={LinkedinLogoUrl} alt="linkedin" />
            <span>Mohammad-hossein Zeynalzadeh</span>
          </a>
        </li>
        <li>
          <a
            className={'h-12 flex items-center gap-2 text-white font-medium'}
            href='https://github.com/mh-zeynal'
          >
            <img className={'h-full'} src={GithubLogoUrl} alt="github" />
            <span>mh-zeynal</span>
          </a>
        </li>
      </ul>
      <p className={'legal text-center text-white'}>
        © {moment().year()} All rights reserved
      </p>
    </section>
  );
}
