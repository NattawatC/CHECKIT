'use client'
import { Flex,MainLayout } from "@/components/layouts"
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

export function RegisterForm(){
  //1. Define your form.
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues:{
      name: '',
      email: '',
      password: '',
    },
  })

  //2. Define a submit handler.
  function onSubmit(values: z.infer<typeof registerFormSchema>){
    console.log(values)
  }

  return(
    <Form{...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className= "w-full">
        <div className="space-y-8 mt-12 mb-8">
          <FormField
            control={form.control}
            name= "name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[18px]">Name</FormLabel>
                <FormControl className="text-[18]">
                  <Input placeholder="Jordani"{...field}/>
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
        <Button className="py-3 px-4 bg-[#F14C1B] w-full mt-6 text-[18px]" type="submit">
        Start your journey
        </Button>

        <p className="text-center text-sm text-gray-600 my-14">
          Been here before?{' '}
          <Link className="text-blue-500 hover:underline" href="/login">
            Log in
          </Link>
        </p>
      </form>
    </Form>
  )
  
}





const Register: NextPage = () => {
  return (
    <MainLayout>
      <Flex className="flex-col items-center">
        <p className="font-semibold text-[32px]/[42px]">Create an account</p>
        <p className="font-normal text-[16px]/[21px]">Start your journey today with CHECKIT!</p>

      </Flex>
      <RegisterForm />
      
      
    </MainLayout>
  )
}

export default Register