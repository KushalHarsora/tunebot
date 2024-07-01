"use client";

import RetroGrid from '@/components/magicui/retro-grid';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import bcryptjs from 'bcryptjs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Password is short"
    }).max(500, {
        message: "Password too long"
    })
});

const Login = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            const response: AxiosResponse = await axios.post('/auth/user/login', { values },  {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data;
            
            if (response.status === 200) {
                toast.success(data.message || "Login successful!", {
                    style: {
                        "backgroundColor": "#D5F5E3",
                        "color": "black",
                        "border": "none"
                    },
                    duration: 1500
                });

                // Hash URL
                const salt = await bcryptjs.genSalt(5);
                const hashedValue = await bcryptjs.hash(data.name, salt);
                console.log(hashedValue);

                router.push(`/home/${hashedValue}`);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { status, data } = error.response;
                console.log(status);
                if (status === 401) {
                    toast.error(data.error || "User does not Exists", {
                        style: {
                            "backgroundColor": "#FADBD8",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 2500
                    })
                    router.push("/register");
                } else if (status === 409) {
                    toast.error(data.error || "Invalid Credentials", {
                        style: {
                            "backgroundColor": "#FADBD8",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 2500
                    });
                    form.resetField('password');
                } else {
                    toast.error(data.error || "Some Error Occured", {
                        style: {
                            "backgroundColor": "#FADBD8",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 2500
                    });
                    form.reset();
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.", {
                    invert: false,
                    duration: 2500
                });
            }
        }
    };

    return (
        <React.Fragment>
            <main className=' h-screen w-screen flex justify-center items-center'>
                <RetroGrid className=' bg-slate-50' />
                <section className=' h-fit w-2/6 max-md:w-fit max-lg:w-1/2 flex flex-col justify-center items-center z-10'>
                    <Card className=' h-full w-full'>
                        <CardHeader>
                            <CardTitle className=' text-center text-xl font-bold'>LOGIN</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type='email' placeholder='enter email' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type='password' placeholder='enter password' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type='submit' className=' w-full lg:hover:bg-white lg:hover:text-black'>
                                        Login
                                    </Button>
                                    <Separator className=' my-4' />
                                    <div className=' w-full flex flex-row justify-center gap-4'>
                                        <span>
                                            Don&apos;t have an account?
                                        </span>
                                        <span>
                                            <Link href={'/register'} className=' font-bold text-gray-700'>
                                                Sign up
                                            </Link>
                                        </span>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </section>
            </main>
        </React.Fragment>
    )
}

export default Login;