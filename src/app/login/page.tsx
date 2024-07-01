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
import { Separator } from '@/components/ui/separator';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Password is short"
    }).max(500, {
        message: "Password too long"
    })
});

const Login = () => {

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        console.log(values);
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