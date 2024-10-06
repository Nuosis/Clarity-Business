import CompanyLogo from '../common/CompanyLogo'
import { useSelector } from 'react-redux';

export default function AuthLayout({ children }) {
    const darkMode = useSelector((state) => state.theme.mode === 'dark'); 
    const logoType = darkMode ? "dm":"lm"
    return (
        <div className='admin-wrapper min-h-svh py-6 px-4 flex items-center justify-center bg-body-color before:fixed before:w-[450px] before:h-full before:end-[18%] before:top-0 after:fixed after:w-[30px] after:h-full after:end-[18%] after:top-0 after:bg-black-50'>
            <div className='flex gap-15 w-full relative z-[1]'>
                <div className='items-center justify-center w-full lg:flex hidden'>
                    <div className='max-w-[400px]'>
                        <div className='mb-4'>
                            <CompanyLogo className="text-primary w-[360px] h-auto" type={logoType} />
                        </div>
                        <div className='mb-8'>
                            <p className='text-[24px]/[30px] mb-2'>
                                Clarity Business
                            </p>
                            <p>
                                Your Business, Managed Well
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center w-full'>
                    <div className='bg-card-color rounded-xl sm:p-4 p-2 max-w-[500px] w-full shadow-shadow-sm'>
                        <div className='sm:max-h-[calc(100svh-48px-32px)] max-h-[calc(100svh-48px-16px)] sm:p-4 p-3 overflow-auto cus-scrollbar'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
