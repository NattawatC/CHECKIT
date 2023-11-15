'use client'
import RegisterPage from '@/assets/registerPage.jpg'
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
import { registerFormSchema } from '@/types/user/registerForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export function RegisterForm() {
  //1. Define your form.
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  //2. Define a submit handler.
  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
        <div className="flex flex-col gap-14 lg:gap-10">
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Name</FormLabel>
                  <FormControl className="text-lg">
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="py-3 px-4 bg-custom-orange w-full text-lg inline-flex rounded-md hover:bg-custom-orangeHover"
            type="submit"
          >
            Start your journey
          </Button>
        </div>
      </form>
    </Form>
  )
}

const Register: NextPage = () => {
  return (
    <>
      <div className="absolute px-4 py-2 top-0 right-0 lg:left-0">
        <Hamburger className="text-custom-black" />
      </div>
      <div className="lg:flex lg:flex-row lg:min-h-screen">
        <MainLayout className="flex flex-col gap-14 lg:gap-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="font-semibold text-3xl lg:text-4xl">Create an account</p>
            <p className="font-normal text-base">
              Start your journey today with CHECKIT!
            </p>
          </div>
          <RegisterForm />
            <p className="text-center text-sm text-custom-gray">
              Been here before?{' '}
              <Link
                className="text-custom-orange hover:underline"
                href="/login"
              >
                Log in
              </Link>
            </p>
          <div className="hidden lg:block">
            <Footer className="text-custom-black" />
          </div>
        </MainLayout>
        <Image
          src={RegisterPage}
          width={500}
          height={500}
          alt="Register Pic"
          className="hidden lg:block"
        />
      </div>
      <Footer className="text-custom-black" isHidden />
    </>
  )
}

export default Register
