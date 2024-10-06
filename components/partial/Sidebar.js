import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {
  menuList,
  documentationItem,
  crmManagement,
} from './SidebarData';
import {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  profile_av,
} from '/public/images'
import {
  IconCalendar,
  IconNote,
  IconMessage,
  IconPower,
  IconPlus,
  IconChevronRight,
  IconX,
  IconPhoneFilled,
  IconMessageCircle2Filled,
  IconMoodSmile,
  IconLeaf,
  IconStarFilled,
  IconTrash,
  IconCamera,
  IconVideo,
  IconDots,
  IconUser,
  IconSettings,
  IconCreditCard,
  IconUsersGroup,
  IconCalendarFilled,
  IconTag,
} from '@tabler/icons-react'
import NewProject from '../pages/app/project/NewProject';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Sidebar({ setMobileNav, note, toggleNote, chat, toggleChat }) {

  let pageUrl = usePathname();
  // Remove the trailing dash if it exists
  pageUrl = pageUrl.replace(/\/$/, '')

  const [menuActive, setMenuActive] = useState(0)
  const menuToggle = (key) => {
    setMenuActive(menuActive === key ? null : key)
  }

  const [menuActiveSub, setMenuActiveSub] = useState(false)
  const menuToggleSub = (key) => {
    setMenuActiveSub(menuActiveSub === key ? null : key)
  }

  const [schedule, setSchedule] = useState(false)
  const toggleSchedule = () => {
    setSchedule(!schedule)
  }

  const [newProjectSidebar, setNewProjectSidebar] = useState(false)
  const toggleNewProject = () => {
    setNewProjectSidebar(!newProjectSidebar)
  }

  const isDocumentationPage = (url) => {
    return documentationItem.some(item => item.url === url);
  };

  const isCrmManagement = (url) => {
    return crmManagement.some(item => item.url === url);
  };

  let data;
  if (isDocumentationPage(pageUrl)) {
    data = documentationItem;
  } else if (isCrmManagement(pageUrl)) {
    data = crmManagement;
  } else {
    data = menuList;
  }

  useEffect(() => {
    data.forEach((item, index) => {
      if (item.children) {
        item.children.forEach((child, subIndex) => {
          if (child.url === pageUrl) {
            setMenuActive(index);
            setMenuActiveSub(subIndex);
          } else if (child.children) {
            child.children.forEach((subChild) => {
              if (subChild.url === pageUrl) {
                setMenuActive(index);
                setMenuActiveSub(subIndex);
              }
            });
          }
        });
      } else if (item.url === pageUrl) {
        setMenuActive(index);
      }
    });
  }, [pageUrl, data]);

  return (
    <>
      <div className='p-6 flex items-start gap-4'>
        <div className='relative group flex'>
          <button>
            <Image src={profile_av} alt='profile' width="56" height="56" className='bg-white shadow-shadow-lg p-1 rounded-lg saturate-50 transition-all hover:filter-none' />
          </button>
          <div className='bg-card-color text-font-color rounded-xl overflow-hidden w-[240px] text-start shadow-shadow-lg absolute start-0 top-full origin-top-left rtl:origin-top-right z-[1] opacity-0 invisible scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:scale-100'>
            <div className='p-4 border-b border-border-color'>
              <div className='font-semibold'>
                Allie Grater
              </div>
              <div className='text-font-color-100'>
                alliegrater@swift.com
              </div>
              <div className="text-danger text-[12px]/[18px] mt-10">Last login: 1 Hours Ago</div>
            </div>
            <div className='p-1 m-1 overflow-auto max-h-[calc(80svh-279px)] cus-scrollbar'>
              <Link href="#" className='py-2 px-4 flex items-center gap-3 transition-all hover:bg-primary-10'>
                <IconUser className='w-[16px] h-[16px]' />
                My Profile
              </Link>
              <Link href="#" className='py-2 px-4 flex items-center gap-3 transition-all hover:bg-primary-10'>
                <IconSettings className='w-[16px] h-[16px]' />
                Settings
              </Link>
              <Link href="#" className='py-2 px-4 flex items-center gap-3 transition-all hover:bg-primary-10'>
                <IconCreditCard className='w-[16px] h-[16px]' />
                Billing
              </Link>
              <Link href="#" className='py-2 px-4 flex items-center gap-3 transition-all hover:bg-primary-10'>
                <IconUsersGroup className='w-[16px] h-[16px]' />
                Manage Team
              </Link>
              <Link href="#" className='py-2 px-4 flex items-center gap-3 transition-all hover:bg-primary-10'>
                <IconCalendarFilled className='w-[16px] h-[16px]' />
                My Events
              </Link>
              <Link href="#" className='py-2 px-4 flex items-center gap-3 transition-all hover:bg-primary-10'>
                <IconTag className='w-[16px] h-[16px]' />
                Support Ticket
              </Link>
            </div>
            <Link href="/auth/signin" className='bg-secondary uppercase text-[14px]/[20px] text-white py-5 px-10 text-center w-full inline-block'>
              Sign Out
            </Link>
          </div>
        </div>
        <div className='text-white'>
          <span className='text-[14px]/[20px]'>
            Sr. Manager
          </span>
          <div className='font-medium'>
            Allie Grater
          </div>
          <div className='flex gap-4 mt-10'>
            <button onClick={toggleSchedule} className={`transition-all duration-300 after:fixed after:z-[4] after:w-full after:h-full after:left-0 after:top-0 after:bg-black-50 after:backdrop-blur-[2px] after:transition-all after:duration-500 after:ease-in-out ${schedule ? 'after:opacity-1 after:visible after:overflow-auto' : 'after:opacity-0 after:invisible after:overflow-hidden'}`}>
              <span title='My Schedule'>
                <IconCalendar className='stroke-[1.5] w-[20px] h-[20px]' />
              </span>
            </button>
            <button onClick={toggleNote} className={`transition-all duration-300 after:fixed after:z-[4] after:w-full after:h-full after:left-0 after:top-0 after:bg-black-50 after:backdrop-blur-[2px] after:transition-all after:duration-500 after:ease-in-out ${note ? 'after:opacity-1 after:visible after:overflow-auto' : 'after:opacity-0 after:invisible after:overflow-hidden'}`}>
              <span title='My Note'>
                <IconNote className='stroke-[1.5] w-[20px] h-[20px]' />
              </span>
            </button>
            <button onClick={toggleChat} className={`transition-all duration-300 after:fixed after:z-[4] after:w-full after:h-full after:left-0 after:top-0 after:bg-black-50 after:backdrop-blur-[2px] after:transition-all after:duration-500 after:ease-in-out ${chat ? 'after:opacity-1 after:visible after:overflow-auto' : 'after:opacity-0 after:invisible after:overflow-hidden'}`}>
              <span title='My Chat'>
                <IconMessage className='stroke-[1.5] w-[20px] h-[20px]' />
              </span>
            </button>
            <Link href="/auth/signin" title='Log Out'>
              <IconPower className='stroke-[1.5] w-[20px] h-[20px]' />
            </Link>
          </div>
        </div>
      </div>
      <div className='px-6 py-4 flex gap-5'>
        <select className="form-select cursor-pointer rounded-md bg-card-color py-[6px] ps-15 pe-30 text-[14px]/[20px] w-full appearance-none border border-border-color focus:outline-0 focus:border-primary">
          <option defaultValue="">Select Project</option>
          <option value="1">Swift University</option>
          <option value="2">Book Manager</option>
          <option value="3">Swift Sass App</option>
        </select>
        <button onClick={toggleNewProject} className={`bg-secondary text-white rounded-md p-2 transition-all duration-300 after:fixed after:z-[4] after:w-full after:h-full after:left-0 after:top-0 after:bg-black-50 after:backdrop-blur-[2px] after:transition-all after:duration-500 after:ease-in-out ${newProjectSidebar ? 'after:opacity-1 after:visible after:overflow-auto' : 'after:opacity-0 after:invisible after:overflow-hidden'}`}>
          <IconPlus className='w-[20px] h-[20px]' />
        </button>
        <NewProject newProjectSidebar={newProjectSidebar} toggleNewProject={toggleNewProject} />
      </div>
      <ul className='text-font-color-400 px-6 py-2 overflow-auto xl:h-[calc(100svh-266px)] md:h-[calc(100svh-262px)] h-[calc(100svh-254px)] no-scrollbar'>
        {data.map((item, key) => (
          item.children ? <li key={key}>
            <button
              onClick={() => menuToggle(key)}
              className={`flex items-center gap-10 w-full py-10 transition-all hover:text-secondary ${menuActive === key ? 'text-secondary' : ''}`}
            >
              <item.icon className='stroke-[1.5] w-[22px] h-[22px]' />
              <span>{item.link}</span>
              <IconChevronRight className={`stroke-[1.5] w-[18px] h-[18px] ms-auto rtl:rotate-180 transition-all ${menuActive === key ? 'rotate-90 rtl:rotate-90' : ''}`} />
            </button>
            {menuActive === key && <ul className='ps-30 relative before:absolute before:h-full before:w-[1px] ltr:before:left-10 rtl:before:right-10 before:top-0 before:bg-white-10'>
              {item.children.map((res, key) => (
                res.children ?
                  <li key={key}>
                    <button
                      onClick={() => menuToggleSub(key)}
                      className={`flex items-center gap-10 w-full py-2 text-[14px]/[20px] relative before:hidden before:absolute before:h-full before:w-[1px] ltr:before:left-[-20px] rtl:before:right-[-20px] before:top-0 before:bg-secondary hover:text-secondary hover:before:block transition-all ${menuActiveSub === key ? 'text-secondary before:!block' : ''}`}
                    >
                      <span>{res.link}</span>
                      <IconChevronRight className={`stroke-[1.5] w-[18px] h-[18px] ms-auto rtl:rotate-180 transition-all ${menuActiveSub === key ? 'rotate-90 rtl:rotate-90' : ''}`} />
                    </button>
                    {menuActiveSub === key && <ul className='ps-30 relative before:absolute before:h-full before:w-[1px] ltr:before:left-10 rtl:before:right-10 before:top-0 before:bg-white-10'>
                      {res.children.map((sub, key) => (
                        <li key={key}>
                          <Link href={sub.url} onClick={() => { window.innerWidth < 1200 && setMobileNav(false) }} className={`py-1 text-[14px]/[20px] flex relative before:hidden before:absolute before:h-full before:w-[1px] ltr:before:left-[-20px] rtl:before:right-[-20px] before:top-0 before:bg-secondary hover:text-secondary hover:before:block transition-all ${pageUrl === sub.url ? 'text-secondary before:!block' : ''}`}>
                            {sub.link}
                          </Link>
                        </li>
                      ))}
                    </ul>}
                  </li>
                  :
                  <li key={key}>
                    <Link href={res.url} onClick={() => { window.innerWidth < 1200 && setMobileNav(false) }} className={`py-1 text-[14px]/[20px] flex relative before:hidden before:absolute before:h-full before:w-[1px] ltr:before:left-[-20px] rtl:before:right-[-20px] before:top-0 before:bg-secondary hover:text-secondary hover:before:block transition-all ${pageUrl === res.url ? 'text-secondary before:!block' : ''}`}>
                      {res.link}
                    </Link>
                  </li>
              ))}
            </ul>}
          </li>
            : item.url ?
              <li key={key}>
                <Link href={item.url} onClick={() => { window.innerWidth < 1200 && setMobileNav(false) }} className={`flex items-center gap-10 w-full py-2 transition-all hover:text-secondary ${pageUrl === item.url ? 'text-secondary' : ''}`}>
                  {item.icon ? <item.icon className='stroke-[1.5] w-[22px] h-[22px]' /> : <IconChevronRight />}
                  <span>{item.link}</span>
                </Link>
              </li>
              :
              <li key={key} className={`py-3 text-[12px]/[15px]${item.color ? ` text-${item.color}` : ''}${item.fontWeight ? ` font-${item.fontWeight}` : ''}`}>
                {item.devider}
              </li>
        ))}
      </ul>
      <div className={`fixed top-0 bg-card-color z-[5] h-svh w-full max-w-[300px] transition-all duration-200 ${schedule ? 'ltr:left-0 rtl:right-0' : 'ltr:-left-full rtl:-right-full'}`}>
        <div className='p-4 flex items-center justify-between gap-15 bg-secondary'>
          <div className='text-[20px]/[30px] font-medium text-white'>
            Schedule
          </div>
          <button onClick={toggleSchedule} className="bg-body-color rounded-md p-[3px] opacity-50">
            <IconX />
          </button>
        </div>
        <div className='p-4 h-[calc(100svh-62px)] overflow-auto no-scrollbar'>
          <div className="p-4 flex relative gap-4 border-s border-border-color group">
            <div className="w-[26px] h-[26px] min-w-[26px] flex items-center justify-center">
              <IconPhoneFilled className="w-[18px] h-[18px] fill-secondary" />
            </div>
            <div className="after:absolute after:w-[3px] after:h-[26px] after:bg-primary after:top-[1rem] after:start-[-2px] group-hover:after:h-[calc(100%-3em)] after:transition-all after:duration-300">
              <div className="mb-1">
                Call Danny at Colby's
              </div>
              <div className="text-[14px]/[20px] text-font-color-100">
                Today - 11:32am
              </div>
            </div>
          </div>
          <div className="p-4 flex relative gap-4 border-s border-border-color group">
            <div className="w-[26px] h-[26px] min-w-[26px] flex items-center justify-center">
              <IconPhoneFilled className="w-[18px] h-[18px] fill-secondary" />
            </div>
            <div className="after:absolute after:w-[3px] after:h-[26px] after:bg-secondary after:top-[1rem] after:start-[-2px] group-hover:after:h-[calc(100%-3em)] after:transition-all after:duration-300">
              <div className="mb-1">
                Meeting with Alice
              </div>
              <div className="text-[14px]/[20px] text-font-color-100">
                Today - 12:50pm
              </div>
            </div>
          </div>
          <div className="p-4 flex relative gap-4 border-s border-border-color group">
            <div className="w-[26px] h-[26px] min-w-[26px] flex items-center justify-center">
              <IconMessageCircle2Filled className="w-[18px] h-[18px] fill-secondary" />
            </div>
            <div className="after:absolute after:w-[3px] after:h-[26px] after:bg-chart-color4 after:top-[1rem] after:start-[-2px] group-hover:after:h-[calc(100%-3em)] after:transition-all after:duration-300">
              <div className="mb-1">
                Answer Annie's message
              </div>
              <div className="text-[14px]/[20px] text-font-color-100">
                Today - 01:35pm
              </div>
            </div>
          </div>
          <div className="p-4 flex relative gap-4 border-s border-border-color group">
            <div className="w-[26px] h-[26px] min-w-[26px] flex items-center justify-center">
              <IconPhoneFilled className="w-[18px] h-[18px] fill-secondary" />
            </div>
            <div className="after:absolute after:w-[3px] after:h-[26px] after:bg-primary after:top-[1rem] after:start-[-2px] group-hover:after:h-[calc(100%-3em)] after:transition-all after:duration-300">
              <div className="mb-1">
                Send new campaign
              </div>
              <div className="text-[14px]/[20px] text-font-color-100">
                Today - 02:40pm
              </div>
            </div>
          </div>
          <div className="p-4 flex relative gap-4 border-s border-border-color group">
            <div className="w-[26px] h-[26px] min-w-[26px] flex items-center justify-center">
              <IconMoodSmile className="w-[18px] h-[18px] stroke-secondary" />
            </div>
            <div className="after:absolute after:w-[3px] after:h-[26px] after:bg-secondary after:top-[1rem] after:start-[-2px] group-hover:after:h-[calc(100%-3em)] after:transition-all after:duration-300">
              <div className="mb-1">
                Project review
              </div>
              <div className="text-[14px]/[20px] text-font-color-100">
                Today - 03:15pm
              </div>
            </div>
          </div>
          <div className="p-4 flex relative gap-4 border-s border-border-color group">
            <div className="w-[26px] h-[26px] min-w-[26px] flex items-center justify-center">
              <IconPhoneFilled className="w-[18px] h-[18px] fill-secondary" />
            </div>
            <div className="after:absolute after:w-[3px] after:h-[26px] after:bg-chart-color3 after:top-[1rem] after:start-[-2px] group-hover:after:h-[calc(100%-3em)] after:transition-all after:duration-300">
              <div className="mb-1">
                Call Trisha Jackson
              </div>
              <div className="text-[14px]/[20px] text-font-color-100">
                Today - 05:40pm
              </div>
            </div>
          </div>
          <div className="p-4 flex relative gap-4 border-s border-border-color group">
            <div className="w-[26px] h-[26px] min-w-[26px] flex items-center justify-center">
              <IconLeaf className="w-[18px] h-[18px] stroke-secondary" />
            </div>
            <div className="after:absolute after:w-[3px] after:h-[26px] after:bg-primary after:top-[1rem] after:start-[-2px] group-hover:after:h-[calc(100%-3em)] after:transition-all after:duration-300">
              <div className="mb-1">
                Write proposal for Don
              </div>
              <div className="text-[14px]/[20px] text-font-color-100">
                Today - 06:30pm
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`fixed top-0 bg-card-color z-[5] h-svh w-full max-w-[500px] transition-all duration-200 ${note ? 'ltr:left-0 rtl:right-0' : 'ltr:-left-full rtl:-right-full'}`}>
        <div className='p-4 flex items-center justify-between gap-15 border-b border-border-color'>
          <div className='text-[20px]/[30px] font-medium flex items-center gap-10'>
            My Notes
            <span className='inline-block bg-danger rounded-md text-white py-1 px-2 text-[14px]/[1]'>
              14
            </span>
          </div>
          <button onClick={toggleNote} className="">
            <IconX />
          </button>
        </div>
        <div className='h-[calc(100svh-62px)] overflow-auto no-scrollbar'>
          <Tabs>
            <TabList className="flex flex-wrap py-4 px-6 bg-body-color items-center">
              <Tab className="flex-1 py-2 px-4 text-center cursor-pointer text-primary rounded-md focus:outline-0" selectedClassName="bg-primary text-white">All Notes</Tab>
              <Tab className="flex-1 py-2 px-4 text-center cursor-pointer text-primary rounded-md focus:outline-0" selectedClassName="bg-primary text-white">Business</Tab>
              <Tab className="flex-1 py-2 px-4 text-center cursor-pointer text-primary rounded-md focus:outline-0" selectedClassName="bg-primary text-white">Social</Tab>
              <Tab className="flex-1 py-2 px-4 text-center cursor-pointer text-primary rounded-md focus:outline-0" selectedClassName="bg-primary text-white">
                <div className="flex items-center justify-center gap-5"><IconPlus className='stroke-[5] w-[16px] h-[16px]' />
                  New
                </div>
              </Tab>
            </TabList>
            <div className='py-4 px-6'>
              <TabPanel>
                <div className='border border-border-color rounded-xl p-6 relative mb-10'>
                  <div className='w-8 h-5 start-6 top-0 bg-primary absolute'></div>
                  <div className='mb-6'>
                    <span className='inline-block text-[14px]/[20px] text-font-color-100'>
                      02 January 2021
                    </span>
                    <div className='mb-4 text-[20px]/[30px]'>
                      Give Review for design
                    </div>
                    <p>
                      It has roots in a piece of classical Latin literature from 45 BC, making it over 2020 years old.
                    </p>
                  </div>
                  <div className='flex gap-5'>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconStarFilled className='w-[14px] h-[14px]' />
                    </button>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconTrash className='w-[14px] h-[14px]' />
                    </button>
                  </div>
                </div>
                <div className='border border-border-color rounded-xl p-6 relative mb-10'>
                  <div className='w-8 h-5 start-6 top-0 bg-success absolute'></div>
                  <div className='mb-6'>
                    <span className='inline-block text-[14px]/[20px] text-font-color-100'>
                      17 January 2022
                    </span>
                    <div className='mb-4 text-[20px]/[30px]'>
                      Give salary to employee
                    </div>
                    <p>
                      The generated Lorem Ipsum is therefore always free from repetition
                    </p>
                  </div>
                  <div className='flex gap-5'>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconStarFilled className='w-[14px] h-[14px]' />
                    </button>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconTrash className='w-[14px] h-[14px]' />
                    </button>
                  </div>
                </div>
                <div className='border border-border-color rounded-xl p-6 relative mb-10'>
                  <div className='w-8 h-5 start-6 top-0 bg-info absolute'></div>
                  <div className='mb-6'>
                    <span className='inline-block text-[14px]/[20px] text-font-color-100'>
                      02 Fabruary 2020
                    </span>
                    <div className='mb-4 text-[20px]/[30px]'>
                      Launch new template
                    </div>
                    <p>
                      Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis.
                    </p>
                  </div>
                  <div className='flex gap-5'>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconStarFilled className='w-[14px] h-[14px]' />
                    </button>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconTrash className='w-[14px] h-[14px]' />
                    </button>
                  </div>
                </div>
                <div className='border border-border-color rounded-xl p-6 relative mb-10'>
                  <div className='w-8 h-5 start-6 top-0 bg-border-color absolute'></div>
                  <div className='mb-6'>
                    <span className='inline-block text-[14px]/[20px] text-font-color-100'>
                      22 August 2021
                    </span>
                    <div className='mb-4 text-[20px]/[30px]'>
                      Nightout with friends
                    </div>
                    <p>
                      Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis.
                    </p>
                  </div>
                  <div className='flex gap-5'>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconStarFilled className='w-[14px] h-[14px]' />
                    </button>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconTrash className='w-[14px] h-[14px]' />
                    </button>
                  </div>
                </div>
                <div className='border border-border-color rounded-xl p-6 relative mb-10'>
                  <div className='w-8 h-5 start-6 top-0 bg-danger absolute'></div>
                  <div className='mb-6'>
                    <span className='inline-block text-[14px]/[20px] text-font-color-100'>
                      01 December 2021
                    </span>
                    <div className='mb-4 text-[20px]/[30px]'>
                      Change a Design
                    </div>
                    <p>
                      It has survived not only five centuries, but also the leap into electronic
                    </p>
                  </div>
                  <div className='flex gap-5'>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconStarFilled className='w-[14px] h-[14px]' />
                    </button>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconTrash className='w-[14px] h-[14px]' />
                    </button>
                  </div>
                </div>
                <div className='border border-border-color rounded-xl p-6 relative'>
                  <div className='w-8 h-5 start-6 top-0 bg-warning absolute'></div>
                  <div className='mb-6'>
                    <span className='inline-block text-[14px]/[20px] text-font-color-100'>
                      10 December 2021
                    </span>
                    <div className='mb-4 text-[20px]/[30px]'>
                      Meeting with Mr.Lee
                    </div>
                    <p>
                      Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model
                    </p>
                  </div>
                  <div className='flex gap-5'>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconStarFilled className='w-[14px] h-[14px]' />
                    </button>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconTrash className='w-[14px] h-[14px]' />
                    </button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className='border border-border-color rounded-xl p-6 relative mb-10'>
                  <div className='w-8 h-5 start-6 top-0 bg-danger absolute'></div>
                  <div className='mb-6'>
                    <span className='inline-block text-[14px]/[20px] text-font-color-100'>
                      01 December 2021
                    </span>
                    <div className='mb-4 text-[20px]/[30px]'>
                      Change a Design
                    </div>
                    <p>
                      It has survived not only five centuries, but also the leap into electronic
                    </p>
                  </div>
                  <div className='flex gap-5'>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconStarFilled className='w-[14px] h-[14px]' />
                    </button>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconTrash className='w-[14px] h-[14px]' />
                    </button>
                  </div>
                </div>
                <div className='border border-border-color rounded-xl p-6 relative'>
                  <div className='w-8 h-5 start-6 top-0 bg-warning absolute'></div>
                  <div className='mb-6'>
                    <span className='inline-block text-[14px]/[20px] text-font-color-100'>
                      10 December 2021
                    </span>
                    <div className='mb-4 text-[20px]/[30px]'>
                      Meeting with Mr.Lee
                    </div>
                    <p>
                      Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model
                    </p>
                  </div>
                  <div className='flex gap-5'>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconStarFilled className='w-[14px] h-[14px]' />
                    </button>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconTrash className='w-[14px] h-[14px]' />
                    </button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className='border border-border-color rounded-xl p-6 relative mb-10'>
                  <div className='w-8 h-5 start-6 top-0 bg-border-color absolute'></div>
                  <div className='mb-6'>
                    <span className='inline-block text-[14px]/[20px] text-font-color-100'>
                      22 August 2021
                    </span>
                    <div className='mb-4 text-[20px]/[30px]'>
                      Nightout with friends
                    </div>
                    <p>
                      Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis.
                    </p>
                  </div>
                  <div className='flex gap-5'>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconStarFilled className='w-[14px] h-[14px]' />
                    </button>
                    <button className='border border-border-color rounded p-2 text-grey transition-all duration-300 hover:bg-grey hover:text-white'>
                      <IconTrash className='w-[14px] h-[14px]' />
                    </button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className='floating-form-control mb-10'>
                  <input type='text' id='noteTitle' className='form-input' placeholder="Note Title" />
                  <label htmlFor='noteTitle' className='form-label'>Note Title</label>
                </div>
                <div className="floating-form-control mb-10">
                  <input type="date" id='noteDate' className="form-input" placeholder="Select Date" />
                  <label htmlFor='noteDate' className='form-label'>Select Date</label>
                </div>
                <div className="floating-form-control mb-10">
                  <select className='form-select'>
                    <option defaultValue="">Open this select menu</option>
                    <option value="1">Business</option>
                    <option value="2">Social</option>
                  </select>
                  <label className='form-label'>Works with selects</label>
                </div>
                <div className="floating-form-control">
                  <textarea className="form-textarea" placeholder="Leave a comment here" rows="3"></textarea>
                  <label className='form-label'>Leave a comment here</label>
                </div>
                <div className="flex items-center gap-10 mt-6">
                  <button className="btn btn-primary">
                    Save Note
                  </button>
                  <button className="btn btn-white !border-border-color">
                    Close
                  </button>
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
      <div className={`fixed top-0 bg-card-color z-[5] h-svh w-full max-w-[460px] transition-all duration-200 ${chat ? 'ltr:right-0 rtl:left-0' : 'ltr:-right-full rtl:-left-full'}`}>
        <Tabs className="flex h-full">
          <div className='sm:w-[calc(100%-66px)] w-[calc(100%-50px)] shadow-shadow-sm'>
            <TabPanel>
              <div className='flex flex-wrap py-4 px-2 items-center justify-between gap-10 border-b border-border-color'>
                <div className='flex gap-4'>
                  <Image src={avatar1} width="36" height="36" alt='chat profile' className='w-[36px] h-[36px] min-w-[36px] rounded-md' />
                  <div>
                    <div className='mb-2 text-[16px]/[1]'>
                      Orlando Lentz
                    </div>
                    <div className='text-success text-[14px]/[1]'>
                      Online
                    </div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <button className='xl:block hidden'>
                    <IconCamera className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='xl:block hidden'>
                    <IconVideo className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='bg-primary-10 p-[2px] rounded text-primary transition-all hover:bg-primary hover:text-white'>
                    <IconDots className='w-[18px] h-[18px]' />
                  </button>
                  <button onClick={toggleChat} className='xl:hidden bg-danger p-[2px] rounded'>
                    <IconX className='w-[18px] h-[18px] stroke-white' />
                  </button>
                </div>
              </div>
              <div className='h-[calc(100svh-71px-79px)] py-6 px-2 overflow-auto no-scrollbar'>
                <ul className='flex flex-col gap-4'>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar1} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:10 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message"> Hi Aiden, how are you?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:12 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message"> Hi Aiden, how are you?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar1} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar1} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Contrary to popular belief, Lorem Ipsum is not simply random text.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:14 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Yes, Orlando Allredy done There are many variations of passages of Lorem Ipsum available</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar1} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:16 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Please find attached images</div>
                        <div className='flex flex-wrap gap-5 mt-4'>
                          <Image src={gallery3} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                          <Image src={gallery4} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                        </div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:20 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Okay, will check and let you know.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                </ul>
              </div>
              <div className='py-4 px-2 border-t border-border-color'>
                <div className='form-control flex'>
                  <input type="text" className="form-input !rounded-e-none" placeholder="Enter text here..." />
                  <button className="btn btn-primary !rounded-s-none" type="button">Send</button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='flex flex-wrap py-4 px-2 items-center justify-between gap-10 border-b border-border-color'>
                <div className='flex gap-4'>
                  <Image src={avatar2} width="36" height="36" alt='chat profile' className='w-[36px] h-[36px] min-w-[36px] rounded-md' />
                  <div>
                    <div className='mb-2 text-[16px]/[1]'>
                      Issa Bell
                    </div>
                    <div className='text-font-color-100 text-[14px]/[1]'>
                      Last seen: 1 hrs ago
                    </div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <button className='xl:block hidden'>
                    <IconCamera className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='xl:block hidden'>
                    <IconVideo className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='bg-primary-10 p-[2px] rounded text-primary transition-all hover:bg-primary hover:text-white'>
                    <IconDots className='w-[18px] h-[18px]' />
                  </button>
                  <button onClick={toggleChat} className='xl:hidden bg-danger p-[2px] rounded'>
                    <IconX className='w-[18px] h-[18px] stroke-white' />
                  </button>
                </div>
              </div>
              <div className='h-[calc(100svh-71px-79px)] py-6 px-2 overflow-auto no-scrollbar'>
                <ul className='flex flex-col gap-4'>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:12 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Are we meeting today?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar2} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Hi Aiden, how are you?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:14 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Yes, Orlando Allredy done There are many variations of passages of Lorem Ipsum available</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar2} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:16 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Please find attached images</div>
                        <div className='flex flex-wrap gap-5 mt-4'>
                          <Image src={gallery1} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                          <Image src={gallery2} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                        </div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:20 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Okay, will check and let you know.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar2} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar2} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Contrary to popular belief, Lorem Ipsum is not simply random text.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                </ul>
              </div>
              <div className='py-4 px-2 border-t border-border-color'>
                <div className='form-control flex'>
                  <input type="text" className="form-input !rounded-e-none" placeholder="Enter text here..." />
                  <button className="btn btn-primary !rounded-s-none" type="button">Send</button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='flex flex-wrap py-4 px-2 items-center justify-between gap-10 border-b border-border-color'>
                <div className='flex gap-4'>
                  <Image src={avatar3} width="36" height="36" alt='chat profile' className='w-[36px] h-[36px] min-w-[36px] rounded-md' />
                  <div>
                    <div className='mb-2 text-[16px]/[1]'>
                      Orlando Lentz
                    </div>
                    <div className='text-success text-[14px]/[1]'>
                      Online
                    </div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <button className='xl:block hidden'>
                    <IconCamera className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='xl:block hidden'>
                    <IconVideo className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='bg-primary-10 p-[2px] rounded text-primary transition-all hover:bg-primary hover:text-white'>
                    <IconDots className='w-[18px] h-[18px]' />
                  </button>
                  <button onClick={toggleChat} className='xl:hidden bg-danger p-[2px] rounded'>
                    <IconX className='w-[18px] h-[18px] stroke-white' />
                  </button>
                </div>
              </div>
              <div className='h-[calc(100svh-71px-79px)] py-6 px-2 overflow-auto no-scrollbar'>
                <ul className='flex flex-col gap-4'>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar3} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:10 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message"> Hi Aiden, how are you?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:12 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message"> Hi Aiden, how are you?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar3} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar3} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Contrary to popular belief, Lorem Ipsum is not simply random text.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:14 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Yes, Orlando Allredy done There are many variations of passages of Lorem Ipsum available</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar3} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:16 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Please find attached images</div>
                        <div className='flex flex-wrap gap-5 mt-4'>
                          <Image src={gallery3} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                          <Image src={gallery4} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                        </div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:20 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Okay, will check and let you know.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                </ul>
              </div>
              <div className='py-4 px-2 border-t border-border-color'>
                <div className='form-control flex'>
                  <input type="text" className="form-input !rounded-e-none" placeholder="Enter text here..." />
                  <button className="btn btn-primary !rounded-s-none" type="button">Send</button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='flex flex-wrap py-4 px-2 items-center justify-between gap-10 border-b border-border-color'>
                <div className='flex gap-4'>
                  <Image src={avatar4} width="36" height="36" alt='chat profile' className='w-[36px] h-[36px] min-w-[36px] rounded-md' />
                  <div>
                    <div className='mb-2 text-[16px]/[1]'>
                      Issa Bell
                    </div>
                    <div className='text-font-color-100 text-[14px]/[1]'>
                      Last seen: 1 hrs ago
                    </div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <button className='xl:block hidden'>
                    <IconCamera className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='xl:block hidden'>
                    <IconVideo className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='bg-primary-10 p-[2px] rounded text-primary transition-all hover:bg-primary hover:text-white'>
                    <IconDots className='w-[18px] h-[18px]' />
                  </button>
                  <button onClick={toggleChat} className='xl:hidden bg-danger p-[2px] rounded'>
                    <IconX className='w-[18px] h-[18px] stroke-white' />
                  </button>
                </div>
              </div>
              <div className='h-[calc(100svh-71px-79px)] py-6 px-2 overflow-auto no-scrollbar'>
                <ul className='flex flex-col gap-4'>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:12 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Are we meeting today?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar4} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Hi Aiden, how are you?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:14 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Yes, Orlando Allredy done There are many variations of passages of Lorem Ipsum available</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar4} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:16 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Please find attached images</div>
                        <div className='flex flex-wrap gap-5 mt-4'>
                          <Image src={gallery1} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                          <Image src={gallery2} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                        </div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:20 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Okay, will check and let you know.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar4} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar4} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Contrary to popular belief, Lorem Ipsum is not simply random text.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                </ul>
              </div>
              <div className='py-4 px-2 border-t border-border-color'>
                <div className='form-control flex'>
                  <input type="text" className="form-input !rounded-e-none" placeholder="Enter text here..." />
                  <button className="btn btn-primary !rounded-s-none" type="button">Send</button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='flex flex-wrap py-4 px-2 items-center justify-between gap-10 border-b border-border-color'>
                <div className='flex gap-4'>
                  <Image src={avatar5} width="36" height="36" alt='chat profile' className='w-[36px] h-[36px] min-w-[36px] rounded-md' />
                  <div>
                    <div className='mb-2 text-[16px]/[1]'>
                      Orlando Lentz
                    </div>
                    <div className='text-success text-[14px]/[1]'>
                      Online
                    </div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <button className='xl:block hidden'>
                    <IconCamera className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='xl:block hidden'>
                    <IconVideo className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='bg-primary-10 p-[2px] rounded text-primary transition-all hover:bg-primary hover:text-white'>
                    <IconDots className='w-[18px] h-[18px]' />
                  </button>
                  <button onClick={toggleChat} className='xl:hidden bg-danger p-[2px] rounded'>
                    <IconX className='w-[18px] h-[18px] stroke-white' />
                  </button>
                </div>
              </div>
              <div className='h-[calc(100svh-71px-79px)] py-6 px-2 overflow-auto no-scrollbar'>
                <ul className='flex flex-col gap-4'>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar5} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:10 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message"> Hi Aiden, how are you?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:12 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message"> Hi Aiden, how are you?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar5} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar5} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Contrary to popular belief, Lorem Ipsum is not simply random text.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:14 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Yes, Orlando Allredy done There are many variations of passages of Lorem Ipsum available</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar5} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:16 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Please find attached images</div>
                        <div className='flex flex-wrap gap-5 mt-4'>
                          <Image src={gallery3} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                          <Image src={gallery4} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                        </div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:20 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Okay, will check and let you know.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                </ul>
              </div>
              <div className='py-4 px-2 border-t border-border-color'>
                <div className='form-control flex'>
                  <input type="text" className="form-input !rounded-e-none" placeholder="Enter text here..." />
                  <button className="btn btn-primary !rounded-s-none" type="button">Send</button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='flex flex-wrap py-4 px-2 items-center justify-between gap-10 border-b border-border-color'>
                <div className='flex gap-4'>
                  <Image src={avatar6} width="36" height="36" alt='chat profile' className='w-[36px] h-[36px] min-w-[36px] rounded-md' />
                  <div>
                    <div className='mb-2 text-[16px]/[1]'>
                      Issa Bell
                    </div>
                    <div className='text-font-color-100 text-[14px]/[1]'>
                      Last seen: 1 hrs ago
                    </div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <button className='xl:block hidden'>
                    <IconCamera className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='xl:block hidden'>
                    <IconVideo className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='bg-primary-10 p-[2px] rounded text-primary transition-all hover:bg-primary hover:text-white'>
                    <IconDots className='w-[18px] h-[18px]' />
                  </button>
                  <button onClick={toggleChat} className='xl:hidden bg-danger p-[2px] rounded'>
                    <IconX className='w-[18px] h-[18px] stroke-white' />
                  </button>
                </div>
              </div>
              <div className='h-[calc(100svh-71px-79px)] py-6 px-2 overflow-auto no-scrollbar'>
                <ul className='flex flex-col gap-4'>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:12 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Are we meeting today?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar6} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Hi Aiden, how are you?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:14 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Yes, Orlando Allredy done There are many variations of passages of Lorem Ipsum available</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar6} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:16 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Please find attached images</div>
                        <div className='flex flex-wrap gap-5 mt-4'>
                          <Image src={gallery1} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                          <Image src={gallery2} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                        </div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:20 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Okay, will check and let you know.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar6} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar6} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Contrary to popular belief, Lorem Ipsum is not simply random text.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                </ul>
              </div>
              <div className='py-4 px-2 border-t border-border-color'>
                <div className='form-control flex'>
                  <input type="text" className="form-input !rounded-e-none" placeholder="Enter text here..." />
                  <button className="btn btn-primary !rounded-s-none" type="button">Send</button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='flex flex-wrap py-4 px-2 items-center justify-between gap-10 border-b border-border-color'>
                <div className='flex gap-4'>
                  <Image src={avatar7} width="36" height="36" alt='chat profile' className='w-[36px] h-[36px] min-w-[36px] rounded-md' />
                  <div>
                    <div className='mb-2 text-[16px]/[1]'>
                      Orlando Lentz
                    </div>
                    <div className='text-success text-[14px]/[1]'>
                      Online
                    </div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <button className='xl:block hidden'>
                    <IconCamera className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='xl:block hidden'>
                    <IconVideo className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='bg-primary-10 p-[2px] rounded text-primary transition-all hover:bg-primary hover:text-white'>
                    <IconDots className='w-[18px] h-[18px]' />
                  </button>
                  <button onClick={toggleChat} className='xl:hidden bg-danger p-[2px] rounded'>
                    <IconX className='w-[18px] h-[18px] stroke-white' />
                  </button>
                </div>
              </div>
              <div className='h-[calc(100svh-71px-79px)] py-6 px-2 overflow-auto no-scrollbar'>
                <ul className='flex flex-col gap-4'>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar7} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:10 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message"> Hi Aiden, how are you?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:12 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message"> Hi Aiden, how are you?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar7} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar7} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Contrary to popular belief, Lorem Ipsum is not simply random text.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:14 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Yes, Orlando Allredy done There are many variations of passages of Lorem Ipsum available</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar7} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:16 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Please find attached images</div>
                        <div className='flex flex-wrap gap-5 mt-4'>
                          <Image src={gallery3} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                          <Image src={gallery4} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                        </div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:20 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Okay, will check and let you know.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                </ul>
              </div>
              <div className='py-4 px-2 border-t border-border-color'>
                <div className='form-control flex'>
                  <input type="text" className="form-input !rounded-e-none" placeholder="Enter text here..." />
                  <button className="btn btn-primary !rounded-s-none" type="button">Send</button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='flex flex-wrap py-4 px-2 items-center justify-between gap-10 border-b border-border-color'>
                <div className='flex gap-4'>
                  <Image src={avatar8} width="36" height="36" alt='chat profile' className='w-[36px] h-[36px] min-w-[36px] rounded-md' />
                  <div>
                    <div className='mb-2 text-[16px]/[1]'>
                      Issa Bell
                    </div>
                    <div className='text-font-color-100 text-[14px]/[1]'>
                      Last seen: 1 hrs ago
                    </div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <button className='xl:block hidden'>
                    <IconCamera className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='xl:block hidden'>
                    <IconVideo className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='bg-primary-10 p-[2px] rounded text-primary transition-all hover:bg-primary hover:text-white'>
                    <IconDots className='w-[18px] h-[18px]' />
                  </button>
                  <button onClick={toggleChat} className='xl:hidden bg-danger p-[2px] rounded'>
                    <IconX className='w-[18px] h-[18px] stroke-white' />
                  </button>
                </div>
              </div>
              <div className='h-[calc(100svh-71px-79px)] py-6 px-2 overflow-auto no-scrollbar'>
                <ul className='flex flex-col gap-4'>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:12 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Are we meeting today?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar8} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Hi Aiden, how are you?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:14 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Yes, Orlando Allredy done There are many variations of passages of Lorem Ipsum available</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar8} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:16 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Please find attached images</div>
                        <div className='flex flex-wrap gap-5 mt-4'>
                          <Image src={gallery1} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                          <Image src={gallery2} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                        </div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:20 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Okay, will check and let you know.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar8} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar8} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Contrary to popular belief, Lorem Ipsum is not simply random text.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                </ul>
              </div>
              <div className='py-4 px-2 border-t border-border-color'>
                <div className='form-control flex'>
                  <input type="text" className="form-input !rounded-e-none" placeholder="Enter text here..." />
                  <button className="btn btn-primary !rounded-s-none" type="button">Send</button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='flex flex-wrap py-4 px-2 items-center justify-between gap-10 border-b border-border-color'>
                <div className='flex gap-4'>
                  <Image src={avatar9} width="36" height="36" alt='chat profile' className='w-[36px] h-[36px] min-w-[36px] rounded-md' />
                  <div>
                    <div className='mb-2 text-[16px]/[1]'>
                      Orlando Lentz
                    </div>
                    <div className='text-success text-[14px]/[1]'>
                      Online
                    </div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <button className='xl:block hidden'>
                    <IconCamera className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='xl:block hidden'>
                    <IconVideo className='stroke-secondary w-[20px] h-[20px]' />
                  </button>
                  <button className='bg-primary-10 p-[2px] rounded text-primary transition-all hover:bg-primary hover:text-white'>
                    <IconDots className='w-[18px] h-[18px]' />
                  </button>
                  <button onClick={toggleChat} className='xl:hidden bg-danger p-[2px] rounded'>
                    <IconX className='w-[18px] h-[18px] stroke-white' />
                  </button>
                </div>
              </div>
              <div className='h-[calc(100svh-71px-79px)] py-6 px-2 overflow-auto no-scrollbar'>
                <ul className='flex flex-col gap-4'>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar9} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:10 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message"> Hi Aiden, how are you?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:12 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message"> Hi Aiden, how are you?</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar9} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar9} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:13 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Contrary to popular belief, Lorem Ipsum is not simply random text.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:14 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Yes, Orlando Allredy done There are many variations of passages of Lorem Ipsum available</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row items-end'>
                    <div>
                      <div className='mb-2 flex gap-1'>
                        <Image src={avatar9} width="16" height="16" alt='chat profile' className='w-[16px] h-[16px] min-w-[16px] rounded' />
                        <span className="text-[14px]/[1] text-font-color-100">10:16 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg'>
                        <div className="message">Please find attached images</div>
                        <div className='flex flex-wrap gap-5 mt-4'>
                          <Image src={gallery3} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                          <Image src={gallery4} width="110" height="69" alt='chat attachment' className='p-1 border border-border-color rounded-md' />
                        </div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                  <li className='flex flex-row-reverse items-end'>
                    <div>
                      <div className='mb-2 flex justify-end gap-1'>
                        <span className="text-[14px]/[1] text-font-color-100">10:20 AM, Today</span>
                      </div>
                      <div className='p-3 rounded-lg bg-primary text-white'>
                        <div className="message">Okay, will check and let you know.</div>
                      </div>
                    </div>
                    <button className='p-3'>
                      <IconDots className='stroke-font-color-100 w-[18px] h-[18px] rotate-90' />
                    </button>
                  </li>
                </ul>
              </div>
              <div className='py-4 px-2 border-t border-border-color'>
                <div className='form-control flex'>
                  <input type="text" className="form-input !rounded-e-none" placeholder="Enter text here..." />
                  <button className="btn btn-primary !rounded-s-none" type="button">Send</button>
                </div>
              </div>
            </TabPanel>
          </div>
          <TabList className="flex items-center flex-col gap-2 sm:p-4 p-2">
            <Tab className="cursor-pointer p-1 rounded-full focus:outline-0" selectedClassName='bg-primary'>
              <Image src={avatar1} width="26" height="26" alt='chat profile' className='w-[26px] h-[26px] min-w-[26px] border border-body-color rounded-md saturate-50 hover:saturate-100' />
            </Tab>
            <Tab className="cursor-pointer p-1 rounded-full focus:outline-0" selectedClassName='bg-primary'>
              <Image src={avatar2} width="26" height="26" alt='chat profile' className='w-[26px] h-[26px] min-w-[26px] border border-body-color rounded-md saturate-50 hover:saturate-100' />
            </Tab>
            <Tab className="cursor-pointer p-1 rounded-full focus:outline-0" selectedClassName='bg-primary'>
              <Image src={avatar3} width="26" height="26" alt='chat profile' className='w-[26px] h-[26px] min-w-[26px] border border-body-color rounded-md saturate-50 hover:saturate-100' />
            </Tab>
            <Tab className="cursor-pointer p-1 rounded-full focus:outline-0" selectedClassName='bg-primary'>
              <Image src={avatar4} width="26" height="26" alt='chat profile' className='w-[26px] h-[26px] min-w-[26px] border border-body-color rounded-md saturate-50 hover:saturate-100' />
            </Tab>
            <Tab className="cursor-pointer p-1 rounded-full focus:outline-0" selectedClassName='bg-primary'>
              <Image src={avatar5} width="26" height="26" alt='chat profile' className='w-[26px] h-[26px] min-w-[26px] border border-body-color rounded-md saturate-50 hover:saturate-100' />
            </Tab>
            <Tab className="cursor-pointer p-1 rounded-full focus:outline-0" selectedClassName='bg-primary'>
              <Image src={avatar6} width="26" height="26" alt='chat profile' className='w-[26px] h-[26px] min-w-[26px] border border-body-color rounded-md saturate-50 hover:saturate-100' />
            </Tab>
            <Tab className="cursor-pointer p-1 rounded-full focus:outline-0" selectedClassName='bg-primary'>
              <Image src={avatar7} width="26" height="26" alt='chat profile' className='w-[26px] h-[26px] min-w-[26px] border border-body-color rounded-md saturate-50 hover:saturate-100' />
            </Tab>
            <Tab className="cursor-pointer p-1 rounded-full focus:outline-0" selectedClassName='bg-primary'>
              <Image src={avatar8} width="26" height="26" alt='chat profile' className='w-[26px] h-[26px] min-w-[26px] border border-body-color rounded-md saturate-50 hover:saturate-100' />
            </Tab>
            <Tab className="cursor-pointer p-1 rounded-full focus:outline-0" selectedClassName='bg-primary'>
              <Image src={avatar9} width="26" height="26" alt='chat profile' className='w-[26px] h-[26px] min-w-[26px] border border-body-color rounded-md saturate-50 hover:saturate-100' />
            </Tab>
          </TabList>
        </Tabs>
      </div>
    </>
  )
}
