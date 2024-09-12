'use client'

import Link from '@/node_modules/next/link'
import Image from '@/node_modules/next/image'
import React, { useState } from 'react'


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import {Loader2} from 'lucide-react';
import SignIn from '@/app/(auth)/sign-in/page'
import Router from '@/node_modules/next/router'
import { useRouter } from '@/node_modules/next/navigation'

import { signIn, signUP } from '@/lib/actions/user.action';
 
 



const AuthForm = ( {type}: {type: string}) => {

 const [user, setUser] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
 const router = useRouter();


const formSchema = authFormSchema(type);

   // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
      
    },
  })
 
  // 2. Define a submit handler.
  const  onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)
   try{

    //Sign up with Appwrite and create plaid token

    if(type === 'sign-up'){
        const newUser = await signUP(data)
        setUser(newUser);
    }

    if(type === 'sign-in'){

     const response = await signIn({
      email: data.email,
      password: data.password,
     })
     if(response) router.push('/')
    }

   }
   catch(error){
     console.error(error)
   }
   finally{
    setIsLoading(false)
   }

    console.log(data)
    setIsLoading(false)
  }

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
           
         <Link 
         href="/"
         className='cursor-pointer flex items-center gap-1 '
        >
         <Image
           src="/icons/logo.svg"
           width= {34}
           height= {34}
           alt ="Centralized logo"
           
         />
         <h1 className='font-26 font-ibm--plex-serif font-bold text-black-1'>
          Centralized
         </h1>
        </Link>

        <div className='flex flex-col gap md;gap-3'>
         <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
          {user  
           ? 'Link Account' 
           : type === 'sign-in'
             ? 'Sign In'
             : 'Sign Up'
          }
          <p className='text-16 font-normal text-gray-600'>

             {user
             ? 'Link your account to get start'
              : 'Please provide your details'
             }

          </p>
         </h1>
        </div>
           
            {user ? (
            <div className='flex flex-col gap-4 '>
             {/**PaidLink */}
            </div>
            ): (
             <>

               <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                 {type === 'sign-up' && (
                  <>
                  <div className='flex gap-4'>
                  <CustomInput control={form.control} name='firstName' label='First Name' placeholder= "Enter your first name" type='text'/>
                  <CustomInput control={form.control} name='lastName' label='Last Name' placeholder= "Enter your last name" type='text'/>
                  </div>
                  <CustomInput control={form.control} name='address1' label='Address' placeholder= "Enter your specific address" type='text'/>
                  <CustomInput control={form.control} name='city' label='City' placeholder= "Enter your city" type='text'/>
                  <div className='flex gap-4'>
                  <CustomInput control={form.control} name='state' label='State' placeholder= "Example: NY" type='text'/>
                  <CustomInput control={form.control} name='postCode' label='Post Code' placeholder= "Example: 11101" type='text'/>
                  </div>

                  <div className='flex gap-4'>

                  <CustomInput control={form.control} name='dob' label='Date of Birth' placeholder= "YYYY-MM-DD" type='text'/>
                  <CustomInput control={form.control} name='ssn' label='SSN' placeholder= "Example: 1234" type='text'/>
                   
                  </div>

                  
                  </>
                 )}

                   <CustomInput 
                   control={form.control} 
                   name="email" 
                   label= "Email" 
                   placeholder="Enter your email"
                   type="email"
                   />

                   <CustomInput 
                   control={form.control} 
                   name="password" 
                   label= "Password" 
                   placeholder="Enter your password"
                   type="password"
                   />
                   <div className='flex flex-col gap-4'>
                    <Button
                     type="submit"
                     disabled={isLoading}
                     className='form-btn'
                     >
                    {isLoading ? (
                     <>
                      <Loader2 size={20} className="animate-spin"/> &nbsp;
                      Loading...
                     </>
                    ): type === 'sign-in'
                     ? 'Sign In' : 'Sign Up'
                    }
                    </Button>
                   </div>
                  
                 </form>
                </Form>

                <footer className='flex justify-center gap-1'>
                 <p className='text-14 font-normal text-gray-600'>
                  {type == 'sign-in'
                  ? "Don't have an account?"
                  : "Already have an account?"
                  }
                 </p>

                 <Link
                 className='form-link'
                  href={type === 'sign-in' ? '/sign-up'
                 : '/sign-in'
                 }>
                  {type === 'sign-in' ? 'Sign Up'
                 : 'Sign In'
                 }
                 </Link>

                </footer>

             </>
            )}
           
      </header>
    </section>
  )
}

export default AuthForm
function signUp(data: z.infer<any>) {
 throw new Error('Function not implemented.')
}

