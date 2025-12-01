import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'

const ResetPassword = () => {
    const [loading, setLoading] = useState(false)
    const params = useParams();
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const token = params.token;
    const handelResetPassword = async (e) => {
      e.preventDefault();
      try {
        setLoading(true)
        const response = await axios.post(`${import.meta.env.VITE_AUTH_API}/reset-password/${token}`,{password},{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials: true
        })
        if(response.data.success){
          toast.success(response.data.message)
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    }

  return (
    <div className="min-h-screen bg-yellow-400 flex justify-center items-center px-4">
          <Card className="w-full max-w-md shadow-2xl rounded-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="font-bold text-3xl text-yellow-500">
                Reset Your Password
              </CardTitle>
            </CardHeader>
    
            <CardContent className="space-y-4">
              <form action="" onSubmit={handelResetPassword}>
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-medium">
                    New Passowrd
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)}
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

export default ResetPassword
