'use client'
import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
const SignOut = () => {
  return (
    <div> <Button variant="outline" className='rounded-full' onClick={() => signOut()}><LogOut/></Button></div>
  )
}

export default SignOut