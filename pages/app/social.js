import React, { useState } from 'react'
import Link from 'next/link'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Breadcrumb from '@/components/common/Breadcrumb'
import Activity from '@/components/pages/app/social/Activity'
import {
    IconFile,
    IconHash,
    IconHome,
    IconNews,
    IconPhoto,
    IconSettings,
    IconTag,
    IconUsers,
} from '@tabler/icons-react'
import People from '@/components/pages/app/social/People'
import NewsFeed from '@/components/pages/app/social/NewsFeed'
import Photos from '@/components/pages/app/social/Photos'
import Page from '@/components/pages/app/social/Page'
import Settings from '@/components/pages/app/social/Settings'
import Layout from '@/components/layout/Layout'

export default function Social() {

    const [socialSide, setSocialSide] = useState(false)
    const socialSideToggle = () => {
        setSocialSide(!socialSide)
    }

    const breadcrumbItem = [
        {
            name: "App",
        },
        {
            name: "Social App",
        },
    ]

    return (
        <Layout>
            <Tabs className='flex'>
                <div className={`bg-card-color min-w-[230px] w-[230px] p-4 xl:h-[calc(100svh-77px)] md:h-[calc(100svh-73px)] h-[calc(100svh-60px)] overflow-auto no-scrollbar lg:static fixed z-[2] rounded-ss-2xl transition-all duration-300 ${socialSide ? 'md:left-[13px] sm:left-2 left-0 rtl:md:right-[13px] rtl:sm:right-2 rtl:right-0 shadow-shadow-lg' : '-left-full rtl:-right-full'}`}>
                    <TabList>
                        <Tab className="flex items-center gap-4 py-2 px-3 border border-dashed border-transparent rounded-md font-semibold cursor-pointer hover:text-primary focus:outline-0" selectedClassName='text-primary !border-primary'>
                            <IconHome className='w-[20px] h-[20px]' />
                            Activity
                        </Tab>
                        <Tab className="flex items-center gap-4 py-2 px-3 border border-dashed border-transparent rounded-md font-semibold cursor-pointer hover:text-primary focus:outline-0" selectedClassName='text-primary !border-primary'>
                            <IconUsers className='w-[20px] h-[20px]' />
                            People
                        </Tab>
                        <Tab className="flex items-center gap-4 py-2 px-3 border border-dashed border-transparent rounded-md font-semibold cursor-pointer hover:text-primary focus:outline-0" selectedClassName='text-primary !border-primary'>
                            <IconNews className='w-[20px] h-[20px]' />
                            News Feed
                        </Tab>
                        <Tab className="flex items-center gap-4 py-2 px-3 border border-dashed border-transparent rounded-md font-semibold cursor-pointer hover:text-primary focus:outline-0" selectedClassName='text-primary !border-primary'>
                            <IconPhoto className='w-[20px] h-[20px]' />
                            Photos
                        </Tab>
                        <Tab className="flex items-center gap-4 py-2 px-3 border border-dashed border-transparent rounded-md font-semibold cursor-pointer hover:text-primary focus:outline-0" selectedClassName='text-primary !border-primary'>
                            <IconFile className='w-[20px] h-[20px]' />
                            Page
                        </Tab>
                        <Tab className="flex items-center gap-4 py-2 px-3 border border-dashed border-transparent rounded-md font-semibold cursor-pointer hover:text-primary focus:outline-0" selectedClassName='text-primary !border-primary'>
                            <IconSettings className='w-[20px] h-[20px]' />
                            Settings
                        </Tab>
                    </TabList>
                    <p className='py-4 mt-4 border-t border-border-color uppercase text-font-color-100 text-[14px]/[20px]'>
                        Recent
                    </p>
                    <ul className='flex flex-col gap-4'>
                        <li>
                            <Link href="#" className='flex items-center gap-10 transition-all hover:text-primary'>
                                <IconTag className='w-[18px] h-[18px]' />
                                <span className='flex-1 inline-block'>
                                    VueJS Developers
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className='flex items-center gap-10 transition-all hover:text-primary'>
                                <IconTag className='w-[18px] h-[18px]' />
                                <span className='flex-1 inline-block'>
                                    Futurism
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className='flex items-center gap-10 transition-all hover:text-primary'>
                                <IconTag className='w-[18px] h-[18px]' />
                                <span className='flex-1 inline-block'>
                                    Innovation
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <p className='py-4 mt-4 border-t border-border-color uppercase text-font-color-100 text-[14px]/[20px]'>
                        FOLLOWED HASHTAGS
                    </p>
                    <ul className='flex flex-col gap-4'>
                        <li>
                            <Link href="#" className='flex items-center gap-10 transition-all hover:text-primary'>
                                <IconHash className='w-[18px] h-[18px]' />
                                <span className='flex-1 inline-block'>
                                    bigdata
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className='flex items-center gap-10 transition-all hover:text-primary'>
                                <IconHash className='w-[18px] h-[18px]' />
                                <span className='flex-1 inline-block'>
                                    Design
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className='flex items-center gap-10 transition-all hover:text-primary'>
                                <IconHash className='w-[18px] h-[18px]' />
                                <span className='flex-1 inline-block'>
                                    ReactJS
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='flex-1 md:p-6 p-4 xl:h-[calc(100svh-77px)] lg:h-[calc(100svh-73px)] overflow-auto no-scrollbar'>
                    <div className='flex items-center justify-between gap-4'>
                        <Breadcrumb breadcrumbItem={breadcrumbItem} />
                        <button onClick={socialSideToggle} className={`hamburger-menu lg:hidden bg-primary p-1 rounded-md text-white ${socialSide ? 'opened' : ''}`}>
                            <svg width="20" height="20" viewBox="0 0 100 100">
                                <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                                <path className="line line2" d="M 20,50 H 80" />
                                <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                            </svg>
                        </button>
                    </div>
                    <TabPanel>
                        <Activity />
                    </TabPanel>
                    <TabPanel>
                        <People />
                    </TabPanel>
                    <TabPanel>
                        <NewsFeed />
                    </TabPanel>
                    <TabPanel>
                        <Photos />
                    </TabPanel>
                    <TabPanel>
                        <Page />
                    </TabPanel>
                    <TabPanel>
                        <Settings />
                    </TabPanel>
                </div>
            </Tabs>
        </Layout>
    )
}
