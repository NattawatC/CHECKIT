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
import { registerFormSchema } from '@/types/user/registerForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { NextPage } from 'next'
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-12 w-full "
      >
        <div className="flex flex-col gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Name</FormLabel>
                <FormControl className="text-lg">
                  <Input placeholder="Jordani" {...field} />
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
          className="py-3 px-4 bg-custom-orange text-lg inline-flex"
          type="submit"
        >
          Start your journey
        </Button>
      </form>
    </Form>
  )
}

const Register: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center">
          <p className="font-semibold text-[32px]/[42px]">Create an account</p>
          <p className="font-normal text-base">
            Start your journey today with CHECKIT!
          </p>
        </div>
        <RegisterForm />
      </MainLayout>
      <p className="text-center text-sm text-custom-gray">
        Been here before?{' '}
        <Link className="text-custom-orange hover:underline" href="/login">
          Log in
        </Link>
      </p>
      <Footer />
    </>
  )
}

export default Register
