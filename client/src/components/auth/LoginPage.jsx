import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { Label } from '../ui/label'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        email:"",
        password:""
    })

    const handleInputChange = (e) => {
        setInput({...input,[e.target.id]: e.target.value});
    }

    const handelLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email",input.email);
        formData.append("password",input.password);
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_AUTH_API}/login`,formData,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.data.success){
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className="min-h-screen bg-yellow-400 flex justify-center items-center px-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="font-bold text-3xl text-yellow-500">
            LogIn to your account
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm">
            Join our platform and start exploring properties
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form action="" onSubmit={handelLogin}>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={input.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-1 mt-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter a strong password"
                value={input.password}
                onChange={handleInputChange}
              />
            </div>

            <div className='mt-4 mb-2'>
                <Link to="/forgot-password" className="text-yellow-600 font-medium cursor-pointer hover:underline">Forgot Password</Link>
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
                Login
              </Button>
            )}
          </form>

          <p className="text-center text-sm mt-2">
            Do not have an account?{" "}
            <Link to="/signup" className="text-yellow-600 font-medium cursor-pointer hover:underline">
              Signup
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
