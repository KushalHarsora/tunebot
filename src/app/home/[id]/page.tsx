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
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { AlignJustify, ReceiptIndianRupee, Type, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import TypingAnimation from '@/components/ui/typing-animation-updated';

// Schema
const inputSchema = z.object({
    input: z.string().min(1, {
        message: "Input Needed"
    })
})

const Home = ({ params }: { params: { id: string } }) => {

    const router = useRouter();

    const [username, SetUsername] = useState<string>();

    // Navbar UI Changer
    const [Lyrics, SetLyrics] = useState<boolean>(true);
    const [Bgm, SetBgm] = useState<boolean>(false);
    const [Art, SetArt] = useState<boolean>(false);
    const [Video, SetVideo] = useState<boolean>(false);

    // Store API Response
    const [resLyrics, SetResLyrics] = useState<string>("");

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

    useEffect(() => {
        console.log("After split", resLyrics.split("\n"));
        if (resLyrics.split("\n")[0].startsWith("##")) {
            console.log(resLyrics.split("\n")[0].replace("## ", "").trim())
        }
    }, [resLyrics]);

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

    // form schema
    const form = useForm<z.infer<typeof inputSchema>>({
        resolver: zodResolver(inputSchema),
        defaultValues: {
            input: "",
        },
    });

    // Lyrics Submit
    const onLyricSubmit = async (values: z.infer<typeof inputSchema>) => {
        try {
            const response = await axios.post("/auth/user/lyrics", values, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                console.log(response.data);
                SetResLyrics(response.data.text);
                form.reset();
            }
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
    }

    // BGM Submit
    const onBgmSubmit = async (values: z.infer<typeof inputSchema>) => {
        console.log(values);
        form.reset();
    }

    // Art Submit
    const onArtSubmit = async (values: z.infer<typeof inputSchema>) => {
        console.log(values);
        form.reset();
    }

    // Video Submit
    const onVideoSubmit = async (values: z.infer<typeof inputSchema>) => {
        console.log(values);
        form.reset();
    }

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
                <section className=' h-screen w-[80vw] flex flex-col max-lg:w-full'>
                    {Lyrics ?
                        <div className=' h-full w-full flex flex-col justify-center items-center'>
                            <div className=' relative flex h-[2vh] w-full max-w-[80vw] max-lg:max-w-[100vw] items-center justify-center overflow-hidden bg-background p-10'>
                                <Meteors number={30} />
                                <div className=' absolute left-4 top-[4.5vh] z-10 lg:hidden'>
                                    <Sheet>
                                        <SheetTrigger>
                                            <AlignJustify />
                                        </SheetTrigger>
                                        <SheetContent side={'left'}>
                                            <div className=' w-full h-full'>
                                                <DotPattern className=' w-full z-0' />
                                                <SheetHeader>
                                                    <SheetTitle className=' h-[15vh] w-full flex flex-col justify-center items-center z-10'>
                                                        <TypingAnimation key={key} text='Welcome' />
                                                    </SheetTitle>
                                                    <SheetDescription />
                                                </SheetHeader>
                                                <div className=' z-10 h-4/5 w-full flex flex-col justify-start items-center gap-4 pt-12'>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(true); SetBgm(false); SetArt(false); SetVideo(false); }}>Lyrics Gereration</Button>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(false); SetBgm(true); SetArt(false); SetVideo(false); }}>BGM Gereration</Button>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(false); SetBgm(false); SetArt(true); SetVideo(false); }}>Art Gereration</Button>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(false); SetBgm(false); SetArt(false); SetVideo(true); }}>Video Gereration</Button>
                                                </div>
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                </div>
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
                                                <DropdownMenuItem className=' cursor-pointer' onClick={() => router.push(`/billing/${params.id}`)}>
                                                    <div className=' flex flex-row justify-between items-center gap-2'>
                                                        <User />
                                                        <span>Profile</span>
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className=' cursor-pointer' onClick={() => router.push(`/billing/${params.id}`)}>
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
                            </div>
                            <div className=' h-[98vh] w-full overflow-hidden py-6 px-12 max-lg:px-6 flex flex-col items-center gap-4'>
                                <div className=' max-h-[20vh] h-[20vh] max-w-full w-full max-lg:max-h-[30vh]'>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onLyricSubmit)} className='space-y-4 max-lg:space-y-2'>
                                            <FormField
                                                control={form.control}
                                                name='input'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Lyrics Generator</FormLabel>
                                                        <FormControl>
                                                            <Input type='text' placeholder='enter ideas to generate' {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type='submit' className=' w-full h-fit duration-100 ease-in lg:hover:bg-white lg:hover:text-black lg:hover:duration-100 lg:hover:ease-out max-lg:hover:bg-black max-lg:hover:text-white'>
                                                Submit
                                            </Button>
                                        </form>
                                    </Form>
                                </div>
                                <div className=' max-h-[78vh] h-[78vh] max-lg:max-h-[68vh] max-w-full w-full bg-white overflow-auto p-2 text-wrap'>
                                    {resLyrics !== "" ? (
                                        <div className=' bg-slate-50 whitespace-pre-wrap p-4 rounded-lg'>
                                            {resLyrics.split("\n").map((line, key) => {
                                                const cleanedLine = line.replace(/\*/g, "");
                                                if (cleanedLine.startsWith("##")) {
                                                    return (
                                                        <div key={key}>
                                                            <h1 className=' font-bold text-center text-xl' key={key}>{cleanedLine.replace("## ", "").trim()}</h1>
                                                            <br />
                                                        </div>
                                                    )
                                                } else if (cleanedLine.match(/^(Chorus|Verse \d+|Outro|Bridge|Key):$/) || cleanedLine.match(/^((Chorus)|(Verse) \d+|(Outro)|(Bridge)):$/)) {
                                                    return (
                                                        <div key={key}>
                                                            <br />
                                                            <h4 className=" font-bold">{cleanedLine.trim()}</h4>
                                                        </div>
                                                    );
                                                } else {
                                                    return <p key={key}>{cleanedLine.trim()}</p>;
                                                }
                                            })}
                                        </div>
                                    ) : <></>}
                                </div>
                            </div>
                        </div> : <></>}
                    {Bgm ?
                        <div className=' h-full w-full flex flex-col justify-center items-center'>
                            <div className=' relative flex h-[2vh] w-full max-w-[80vw] max-lg:max-w-[100vw] items-center justify-center overflow-hidden bg-background p-10'>
                                <Meteors number={30} />
                                <div className=' absolute left-4 top-[4.5vh] z-10 lg:hidden'>
                                    <Sheet>
                                        <SheetTrigger>
                                            <AlignJustify />
                                        </SheetTrigger>
                                        <SheetContent side={'left'}>
                                            <div className=' w-full h-full'>
                                                <DotPattern className=' w-full z-0' />
                                                <SheetHeader>
                                                    <SheetTitle className=' h-[15vh] w-full flex flex-col justify-center items-center z-10'>
                                                        <TypingAnimation key={key} text='Welcome' />
                                                    </SheetTitle>
                                                    <SheetDescription />
                                                </SheetHeader>
                                                <div className=' z-10 h-4/5 w-full flex flex-col justify-start items-center gap-4 pt-12'>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(true); SetBgm(false); SetArt(false); SetVideo(false); }}>Lyrics Gereration</Button>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(false); SetBgm(true); SetArt(false); SetVideo(false); }}>BGM Gereration</Button>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(false); SetBgm(false); SetArt(true); SetVideo(false); }}>Art Gereration</Button>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(false); SetBgm(false); SetArt(false); SetVideo(true); }}>Video Gereration</Button>
                                                </div>
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                </div>
                                <p className=' z-10 whitespace-pre-wrap text-center text-2xl font-normal font-sans tracking-tighter text-black dark:text-white max-lg:hidden'>
                                    Background Music Generation
                                </p>
                                <p className=' z-10 whitespace-pre-wrap text-center text-2xl font-normal font-sans tracking-tighter text-black dark:text-white lg:hidden'>
                                    BGM Generation
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
                                                <DropdownMenuItem className=' cursor-pointer' onClick={() => router.push(`/billing/${params.id}`)}>
                                                    <div className=' flex flex-row justify-between items-center gap-2'>
                                                        <User />
                                                        <span>Profile</span>
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className=' cursor-pointer' onClick={() => router.push(`/billing/${params.id}`)}>
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
                            </div>
                            <div className=' h-[98vh] w-full overflow-hidden py-6 px-12 max-lg:px-6 flex flex-col items-center gap-4'>
                                <div className=' max-h-[20vh] h-[20vh] max-w-full w-full max-lg:max-h-[30vh]'>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onBgmSubmit)} className='space-y-4 max-lg:space-y-2'>
                                            <FormField
                                                control={form.control}
                                                name='input'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Background Music Generator</FormLabel>
                                                        <FormControl>
                                                            <Input type='text' placeholder='enter ideas to generate' {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type='submit' className=' w-full h-fit duration-100 ease-in lg:hover:bg-white lg:hover:text-black lg:hover:duration-100 lg:hover:ease-out max-lg:hover:bg-black max-lg:hover:text-white'>
                                                Submit
                                            </Button>
                                        </form>
                                    </Form>
                                </div>
                            </div>
                        </div> : <></>}
                    {Art ?
                        <div className=' h-full w-full flex flex-col justify-center items-center'>
                            <div className=' relative flex h-[2vh] w-full max-w-[80vw] max-lg:max-w-[100vw] items-center justify-center overflow-hidden bg-background p-10'>
                                <Meteors number={30} />
                                <div className=' absolute left-4 top-[4.5vh] z-10 lg:hidden'>
                                    <Sheet>
                                        <SheetTrigger>
                                            <AlignJustify />
                                        </SheetTrigger>
                                        <SheetContent side={'left'}>
                                            <div className=' w-full h-full'>
                                                <DotPattern className=' w-full z-0' />
                                                <SheetHeader>
                                                    <SheetTitle className=' h-[15vh] w-full flex flex-col justify-center items-center z-10'>
                                                        <TypingAnimation key={key} text='Welcome' />
                                                    </SheetTitle>
                                                    <SheetDescription />
                                                </SheetHeader>
                                                <div className=' z-10 h-4/5 w-full flex flex-col justify-start items-center gap-4 pt-12'>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(true); SetBgm(false); SetArt(false); SetVideo(false); }}>Lyrics Gereration</Button>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(false); SetBgm(true); SetArt(false); SetVideo(false); }}>BGM Gereration</Button>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(false); SetBgm(false); SetArt(true); SetVideo(false); }}>Art Gereration</Button>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(false); SetBgm(false); SetArt(false); SetVideo(true); }}>Video Gereration</Button>
                                                </div>
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                </div>
                                <p className=' z-10 whitespace-pre-wrap text-center text-2xl font-normal font-sans tracking-tighter text-black dark:text-white max-lg:hidden'>
                                    Concept Art Generation
                                </p>
                                <p className=' z-10 whitespace-pre-wrap text-center text-2xl font-normal font-sans tracking-tighter text-black dark:text-white lg:hidden'>
                                    Art Generation
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
                                                <DropdownMenuItem className=' cursor-pointer' onClick={() => router.push(`/billing/${params.id}`)}>
                                                    <div className=' flex flex-row justify-between items-center gap-2'>
                                                        <User />
                                                        <span>Profile</span>
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className=' cursor-pointer' onClick={() => router.push(`/billing/${params.id}`)}>
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
                            </div>
                            <div className=' h-[98vh] w-full overflow-hidden py-6 px-12 max-lg:px-6 flex flex-col items-center gap-4'>
                                <div className=' max-h-[20vh] h-[20vh] max-w-full w-full max-lg:max-h-[30vh]'>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onArtSubmit)} className='space-y-4 max-lg:space-y-2'>
                                            <FormField
                                                control={form.control}
                                                name='input'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Concept Art Generator</FormLabel>
                                                        <FormControl>
                                                            <Input type='text' placeholder='enter ideas to generate' {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type='submit' className=' w-full h-fit duration-100 ease-in lg:hover:bg-white lg:hover:text-black lg:hover:duration-100 lg:hover:ease-out max-lg:hover:bg-black max-lg:hover:text-white'>
                                                Submit
                                            </Button>
                                        </form>
                                    </Form>
                                </div>
                            </div>
                        </div> : <></>}
                    {Video ?
                        <div className=' h-full w-full flex flex-col justify-center items-center'>
                            <div className=' relative flex h-[2vh] w-full max-w-[80vw] max-lg:max-w-[100vw] items-center justify-center overflow-hidden bg-background p-10'>
                                <Meteors number={30} />
                                <div className=' absolute left-4 top-[4.5vh] z-10 lg:hidden'>
                                    <Sheet>
                                        <SheetTrigger>
                                            <AlignJustify />
                                        </SheetTrigger>
                                        <SheetContent side={'left'}>
                                            <div className=' w-full h-full'>
                                                <DotPattern className=' w-full z-0' />
                                                <SheetHeader>
                                                    <SheetTitle className=' h-[15vh] w-full flex flex-col justify-center items-center z-10'>
                                                        <TypingAnimation key={key} text='Welcome' />
                                                    </SheetTitle>
                                                    <SheetDescription />
                                                </SheetHeader>
                                                <div className=' z-10 h-4/5 w-full flex flex-col justify-start items-center gap-4 pt-12'>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(true); SetBgm(false); SetArt(false); SetVideo(false); }}>Lyrics Gereration</Button>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(false); SetBgm(true); SetArt(false); SetVideo(false); }}>BGM Gereration</Button>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(false); SetBgm(false); SetArt(true); SetVideo(false); }}>Art Gereration</Button>
                                                    <Button className=' min-w-[175px] max-w-[200px] hover:bg-black hover:text-white z-10' onClick={() => { SetLyrics(false); SetBgm(false); SetArt(false); SetVideo(true); }}>Video Gereration</Button>
                                                </div>
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                </div>
                                <p className=' z-10 whitespace-pre-wrap text-center text-2xl font-normal font-sans tracking-tighter text-black dark:text-white max-lg:hidden'>
                                    Video Generation
                                </p>
                                <p className=' z-10 whitespace-pre-wrap text-center text-2xl font-normal font-sans tracking-tighter text-black dark:text-white lg:hidden'>
                                    Video Maker
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
                                                <DropdownMenuItem className=' cursor-pointer' onClick={() => router.push(`/billing/${params.id}`)}>
                                                    <div className=' flex flex-row justify-between items-center gap-2'>
                                                        <User />
                                                        <span>Profile</span>
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className=' cursor-pointer' onClick={() => router.push(`/billing/${params.id}`)}>
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
                            </div>
                            <div className=' h-[98vh] w-full overflow-hidden py-6 px-12 max-lg:px-6 flex flex-col items-center gap-4'>
                                <div className=' max-h-[20vh] h-[20vh] max-w-full w-full max-lg:max-h-[30vh]'>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onVideoSubmit)} className='space-y-4 max-lg:space-y-2'>
                                            <FormField
                                                control={form.control}
                                                name='input'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Video Generator</FormLabel>
                                                        <FormControl>
                                                            <Input type='text' placeholder='enter ideas to generate' {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type='submit' className=' w-full h-fit duration-100 ease-in lg:hover:bg-white lg:hover:text-black lg:hover:duration-100 lg:hover:ease-out max-lg:hover:bg-black max-lg:hover:text-white'>
                                                Submit
                                            </Button>
                                        </form>
                                    </Form>
                                </div>
                            </div>
                        </div> : <></>}
                </section>
            </main>
        </React.Fragment>
    )
}

export default Home