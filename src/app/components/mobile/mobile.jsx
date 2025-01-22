'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Constants, { shouldUseWhiteIcons } from '../constants/constants';

export default function Mobile() {
  const pathname = usePathname();
  const useWhiteIcons = shouldUseWhiteIcons(pathname);

  return (
    <div className='lg:hidden pb-1 lg:p-0 bg-neutral-600 h-16 fixed bottom-0 w-full z-40 backdrop-blur-3xl'>
        <div className="container">
            <div className="links flex justify-between items-center h-full">
                {Constants.map((nav, index) => {
                    const Icon = nav.Icon;
                    const isActive = pathname.startsWith(nav.basePath);
                    const isHome = nav.basePath === '/';
                    
                    return (
                        <Link 
                            href={nav.link} 
                            key={index+'mobilenavigation'} 
                            className={`py-2 px-3 h-full flex items-center flex-col justify-center
                                ${isHome ? 'opacity-70' : useWhiteIcons ? 'text-white' : 'opacity-60'}
                                ${isActive ? 'opacity-100' : 'opacity-60'}
                                transition-all duration-200 hover:opacity-100`}
                        >
                            <Icon className="text-2xl" />
                            <p className='text-xs font-medium'>{nav.label}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    </div>
  )
}