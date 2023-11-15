'use client'
import LoginPage from '@/assets/loginPage.jpg'
import { Footer, Hamburger } from '@/components/common'
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
import Image from 'next/image'
import Link from 'next/link'
import router from 'next/router'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
    // let isValid = data.checkLogin(values)
    // if (isValid) {
      // Redirect to /index
      // router.push('/register')
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-14 lg:gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-lg">Email</FormLabel>
                    <FormControl className="text-lg">
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
                    <FormLabel className="text-lg">Password</FormLabel>
                    <FormControl className="text-lg">
                      <Input
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <p className="text-right text-sm text-gray-600">
              <Link
                className="hover:underline hover:text-custom-orangeHover"
                href=""
              >
                Forgot password?{' '}
              </Link>
            </p>
          </div>

          <Button
            className="py-3 px-4 w-full text-lg inline-flex rounded-md hover:bg-custom-blackHover"
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
    </Form>
  )
}

const Login: NextPage = () => {
  return (
    <>
      <div className="absolute px-4 py-2 top-0 right-0 lg:left-0">
        <Hamburger className="text-custom-black" />
      </div>
      <div className="lg:flex lg:flex-row lg:min-h-screen">
        <MainLayout className="flex flex-col lg:gap-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="font-semibold text-3xl lg:text-4xl">Welcome Back!</p>
            <p className="font-normal text-base">Please enter your details</p>
          </div>
          <LoginForm />
          <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            {' '}
            or{' '}
          </div>

          <p className="text-center text-sm text-custom-gray">
            Don&apos;t have an account?{' '}
            <Link
              href={'/register'}
              className="hover:underline text-custom-orange"
            >
              Sign up
            </Link>
          </p>
          <div className="hidden lg:block">
            <Footer className="text-custom-black" />
          </div>
        </MainLayout>
        <Image
          src={LoginPage}
          width={500}
          height={500}
          alt="Login Footer Pic"
          className="hidden lg:block"
        />
      </div>
      <Footer className="text-custom-black" isHidden />
    </>
  )
}
export default Login
