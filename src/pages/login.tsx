'use client'
import { Footer } from '@/components/common'
import { MainLayout } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginFormSchema } from '@/types/user/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NextPage } from 'next'
import Link from 'next/link'
import router from 'next/router'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import dataservices from '@/services/dataservices'

const data = new dataservices()

export function LoginForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Redefine a submit handler.
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.a
    let isValid = data.checkLogin(values)
    if (isValid) {
      // Redirect to /index
      router.push('/register')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-[18px]">Email</FormLabel>
                <FormControl className="text-[18px]">
                  <Input placeholder="John@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[18px]">Password</FormLabel>
                <FormControl className="text-[18px]">
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <p className="text-right text-sm text-gray-600 mt-2">
          <Link
            className="hover:underline hover:text-custom-orangeHover"
            href=""
          >
            Forgot password?{' '}
          </Link>
        </p>

        <Button
          className="py-3 px-4 w-full mt-6 text-[18px] inline-flex"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Form>
  )
}

const Login: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-16">
        <div className="flex flex-col items-center justify-center">
          <p className="font-semibold text-[32px]">Welcome Back!</p>
          <p className="font-normal text-base">Please enter your details</p>
        </div>
        <LoginForm />
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          {' '}
          or{' '}
        </div>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link
            href={'/register'}
            className="hover:underline text-custom-orange"
          >
            Sign up
          </Link>
        </p>
      </MainLayout>
      {/* <Image
        src={loginPic}
        sizes="(max-width: 100%), (max-width: 100%)"
        alt="Login Footer Pic"
      /> */}
      <Footer className="text-custom-black" />
    </>
  )
}
export default Login
