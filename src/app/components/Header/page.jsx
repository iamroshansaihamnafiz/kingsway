"use client";
import {useState, useEffect} from 'react';
import Link from "next/link";
import {AiOutlineClose} from "react-icons/ai";
import {HiOutlineBars3} from "react-icons/hi2";
import Image from "next/image";
import navbarData from "../../Data/navbar-data.json";
import {usePathname} from 'next/navigation';

function Page() {
    const pathname = usePathname();
    // 👇️ Toggle class on click Show Menu Bar (Button)
    const ClickShowMenuBar = () => {
        const nav = document.getElementById('mobile_menu');
        if (nav) {
            nav.classList.add('show_menu');
        }
    };

    // 👇️ Toggle class on click Close Menu Bar (Button)
    const ClickCloseMenuBar = () => {
        const nav = document.getElementById('mobile_menu');
        if (nav) {
            nav.classList.remove('show_menu');
        }
    };

    const {logo, menu} = navbarData;

    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isHeaderVisible = scrollPosition <= 300;
    return (
        <>
            <section id="header-section" className="relative">
                <header
                    className={`lg:flex py-6 bg-white w-full fixed lg:relative z-50 ${isHeaderVisible ? '' : 'bg-black'}`}>
                    <div className="container flex items-center justify-between">
                        <div className="logo">
                            <Link href='/'>
                                <Image className="h-full sm:h-[45px] w-[100] sm:w-full" width={100} height={100}
                                       src={logo} alt="Logo"/>
                            </Link>
                        </div>

                        <nav className="hidden lg:block overflow-hidden lg:overflow-visible">
                            <div className="container flex">
                                <div className="navbar-items flex items-center justify-between flex-grow pl-12">
                                    <div className="flex items-center space-x-10 capitalize">
                                        {menu.map((item, index) => {
                                            const linkPath = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                                            const isActive = pathname === linkPath;
                                            return (
                                                <li key={index} className="list-none">
                                                    <Link href={linkPath}>
                                                        <h4 className={`text-[18px] uppercase font-[500] hover:text-primary transition ${isActive ? 'text-primary' : 'text-black'}`}>
                                                            {item}
                                                        </h4>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </nav>

                        {/* Tab / Mobile Icons */}
                        <div className="lg:hidden tab-mobile flex items-center gap-2">
                            <div onClick={ClickShowMenuBar}
                                 className="w-8 text-center text-black hover:text-primary transition cursor-pointer">
                                <div className="text-2xl">
                                    <HiOutlineBars3/>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* Mobile Menu */}
                <div id="mobile_menu" className="block lg:hidden bg-white z-50 overflow-hidden w-[300px] h-[100%]">
                    <div className="head flex items-center justify-between px-8 pt-8">
                        <div className="logo">
                            <Link href='/'>
                                <Image className="h-full sm:h-[35px] w-[100] sm:w-full" width={100} height={100}
                                       src={logo} alt="Logo"/>
                            </Link>
                        </div>
                        <div onClick={ClickCloseMenuBar} className="icon text-xl cursor-pointer hover:text-primary">
                            <AiOutlineClose/>
                        </div>
                    </div>

                    <div className="navbar-wrapper pl-12 pt-8 space-y-5">
                        {menu.map((item, index) => (
                            <li key={index} className="list-none">
                                <Link href={`/${item.toLowerCase()}`}
                                      className="active font-[500] text-back hover:text-primary transition">{item}</Link>
                            </li>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Page;