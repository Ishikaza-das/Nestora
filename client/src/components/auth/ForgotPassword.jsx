import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const handelForgotPassword = async (e) => {
      e.preventDefault();
      try {
        setLoading(true)
        const response = await axios.post(`${import.meta.env.VITE_AUTH_API}/forgot-password`,{email},{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true});
        if(response.data.success){
            toast.success(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      }
    }
  return (
    <div className="min-h-screen bg-yellow-400 flex justify-center items-center px-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="font-bold text-3xl text-yellow-500">
            Forgot your account
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm">
            Enter your register email Id
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form action="" onSubmit={handelForgotPassword}>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {loading ? (
              <Button
                className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl"
                type="submit"
              >
                <Loader2 className="animate-spin h-4 w-4 mr-2"/>
              </Button>
            ) : (
              <Button
                className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl"
                type="submit"
              >
                Submit
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ForgotPassword