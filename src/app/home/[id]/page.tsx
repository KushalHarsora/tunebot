"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import Meteors from '@/components/magicui/meteors';
import DotPattern from '@/components/magicui/dot-pattern';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { ReceiptIndianRupee, Type, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';

const Home = ({ params }: { params: { id: string } }) => {

    const router = useRouter();

    const [username, SetUsername] = useState<string>();

    // Navbar UI Changer
    const [Lyrics, SetLyrics] = useState<boolean>(true);
    const [Bgm, SetBgm] = useState<boolean>(false);
    const [Art, SetArt] = useState<boolean>(false);
    const [Video, SetVideo] = useState<boolean>(false);

    // heading
    const text = [{ text: "Welcome" }];

    // re-render component using state
    const [key, setKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setKey((prevKey) => prevKey + 1);
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    // Get Username
    useEffect(() => {
        const decodeParams = async () => {
            try {
                const response = await axios.get("/auth/user/home");
                SetUsername(response.data.username);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    const { status, data } = error.response;
                    console.log(status);
                    if (status === 404) {
                        toast.error(data.error || "Data Not Found", {
                            duration: 2500
                        });
                    }
                } else {
                    toast.error("An unexpected error occurred. Please try again.", {
                        duration: 2500
                    });
                }
            }
        };

        decodeParams();
    }, []);

    // logout
    const handlelogout = async () => {
        try {
            await axios.get("/auth/user/logout")
                .then((res) => {
                    toast.success(res.data.message || "Logout Successful!", {
                        style: {
                            "backgroundColor": "#D5F5E3",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 1500
                    });
                    router.push("/login");
                })
                .catch((error: any) => {
                    console.log(error);
                })
        } catch (error: any) {
            console.log(error);
        }
    };

    console.log(username);
    return (
        <React.Fragment>
            <main className=' h-screen w-screen flex justify-between items-center'>
                <section className=' h-screen w-[20vw] max-lg:hidden flex flex-col'>
                    <DotPattern className=' w-[20vw] max-lg:hidden' />
                    <div className=' h-1/5 w-full flex flex-col justify-center items-center z-10'>
                        <TypewriterEffectSmooth words={text} key={key} />
                    </div>
                    <div className=' z-10 h-4/5 w-full flex flex-col justify-start items-center gap-4 pt-12'>
                        <Button className=' min-w-[175px] max-w-[200px] duration-100 ease-in hover:bg-white hover:text-black hover:duration-100 hover:ease-out' onClick={() => { SetLyrics(true); SetBgm(false); SetArt(false); SetVideo(false); }}>Lyrics Gereration</Button>
                        <Button className=' min-w-[175px] max-w-[200px] duration-100 ease-in hover:bg-white hover:text-black hover:duration-100 hover:ease-out' onClick={() => { SetLyrics(false); SetBgm(true); SetArt(false); SetVideo(false); }}>BGM Gereration</Button>
                        <Button className=' min-w-[175px] max-w-[200px] duration-100 ease-in hover:bg-white hover:text-black hover:duration-100 hover:ease-out' onClick={() => { SetLyrics(false); SetBgm(false); SetArt(true); SetVideo(false); }}>Art Gereration</Button>
                        <Button className=' min-w-[175px] max-w-[200px] duration-100 ease-in hover:bg-white hover:text-black hover:duration-100 hover:ease-out' onClick={() => { SetLyrics(false); SetBgm(false); SetArt(false); SetVideo(true); }}>Video Gereration</Button>
                    </div>
                </section>
                <section className=' h-screen w-[80vw] flex flex-col'>
                    {Lyrics ?
                        <div className=' relative flex h-[2vh] w-full max-w-[80vw] items-center justify-center overflow-hidden bg-background p-10'>
                            <Meteors number={30} />
                            <p className=' z-10 whitespace-pre-wrap text-center text-2xl font-normal font-sans tracking-tighter text-black dark:text-white'>
                                Lyrics Generation
                            </p>
                            <span className=' absolute top-[3.75vh] right-4 z-20 cursor-pointer'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt='user icon' />
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className=' w-40'>
                                        <DropdownMenuLabel>{username != undefined && username?.length < 8 ? username?.toLowerCase() : "Profile"}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <div className=' flex flex-row justify-between items-center gap-2'>
                                                    <User />
                                                    <span>Profile</span>
                                                </div>
                                            </DropdownMenuItem><DropdownMenuItem>
                                                <div className=' flex flex-row justify-between items-center gap-2'>
                                                    <ReceiptIndianRupee />
                                                    <span>Billing</span>
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup className=' px-2 py-1 flex items-center justify-center'>
                                            <Button className=' w-full h-fit' onClick={handlelogout}>Logout</Button>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </span>
                        </div> : <></>}
                    {Bgm ?
                        <div className=' relative flex h-[2vh] w-full max-w-[80vw] items-center justify-center overflow-hidden bg-background p-10'>
                            <Meteors number={30} />
                            <p className=' z-10 whitespace-pre-wrap text-center text-2xl font-normal font-sans tracking-tighter text-black dark:text-white'>
                                Background Music Generation
                            </p>
                            <span className=' absolute top-[3.75vh] right-4 z-20 cursor-pointer'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt='user icon' />
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className=' w-40'>
                                        <DropdownMenuLabel>{username != undefined && username?.length < 8 ? username?.toLowerCase() : "Profile"}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <div className=' flex flex-row justify-between items-center gap-2'>
                                                    <User />
                                                    <span>Profile</span>
                                                </div>
                                            </DropdownMenuItem><DropdownMenuItem>
                                                <div className=' flex flex-row justify-between items-center gap-2'>
                                                    <ReceiptIndianRupee />
                                                    <span>Billing</span>
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup className=' px-2 py-1 flex items-center justify-center'>
                                            <Button className=' w-full h-fit' onClick={handlelogout}>Logout</Button>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </span>
                        </div> : <></>}
                    {Art ?
                        <div className=' relative flex h-[2vh] w-full max-w-[80vw] items-center justify-center overflow-hidden bg-background p-10'>
                            <Meteors number={30} />
                            <p className=' z-10 whitespace-pre-wrap text-center text-2xl font-normal font-sans tracking-tighter text-black dark:text-white'>
                                Concept Art Generation
                            </p>
                            <span className=' absolute top-[3.75vh] right-4 z-20 cursor-pointer'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt='user icon' />
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className=' w-40'>
                                        <DropdownMenuLabel>{username != undefined && username?.length < 8 ? username?.toLowerCase() : "Profile"}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <div className=' flex flex-row justify-between items-center gap-2'>
                                                    <User />
                                                    <span>Profile</span>
                                                </div>
                                            </DropdownMenuItem><DropdownMenuItem>
                                                <div className=' flex flex-row justify-between items-center gap-2'>
                                                    <ReceiptIndianRupee />
                                                    <span>Billing</span>
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup className=' px-2 py-1 flex items-center justify-center'>
                                            <Button className=' w-full h-fit' onClick={handlelogout}>Logout</Button>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </span>
                        </div> : <></>}
                    {Video ?
                        <div className=' relative flex h-[2vh] w-full max-w-[80vw] items-center justify-center overflow-hidden bg-background p-10'>
                            <Meteors number={30} />
                            <p className=' z-10 whitespace-pre-wrap text-center text-2xl font-normal font-sans tracking-tighter text-black dark:text-white'>
                                Video Generation
                            </p>
                            <span className=' absolute top-[3.75vh] right-4 z-20 cursor-pointer'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt='user icon' />
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className=' w-40'>
                                        <DropdownMenuLabel>{username != undefined && username?.length < 8 ? username?.toLowerCase() : "Profile"}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <div className=' flex flex-row justify-between items-center gap-2'>
                                                    <User />
                                                    <span>Profile</span>
                                                </div>
                                            </DropdownMenuItem><DropdownMenuItem>
                                                <div className=' flex flex-row justify-between items-center gap-2'>
                                                    <ReceiptIndianRupee />
                                                    <span>Billing</span>
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup className=' px-2 py-1 flex items-center justify-center'>
                                            <Button className=' w-full h-fit' onClick={handlelogout}>Logout</Button>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </span>
                        </div> : <></>}
                </section>
            </main>
        </React.Fragment>
    )
}

export default Home