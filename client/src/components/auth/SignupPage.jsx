import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { UserContext } from "@/context/UserContext";
 
const SignupPage = () => {
  const {user} = useContext(UserContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    file: "",
  });
  const [loading, setLoading] = useState(false);
  const naviagte = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
    setInput({ ...input, file });
  };

  const handelInputChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phone", input.phone);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_API}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        naviagte("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex justify-center items-center px-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="font-bold text-3xl text-yellow-500">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm">
            Join our platform and start exploring properties
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-center">
            {imagePreview && (
              <img
                src={imagePreview}
                className="h-20 w-20 rounded-full object-cover"
                alt="Profile Preview"
              />
            )}
          </div>
          <form action="" onSubmit={signupHandler}>
            <div className="space-y-1">
              <label htmlFor="profile" className="text-sm font-medium">
                Profile Image
              </label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={input.name}
                onChange={handelInputChange}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={input.email}
                onChange={handelInputChange}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter a strong password"
                value={input.password}
                onChange={handelInputChange}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <Input
                id="phone"
                type="text"
                placeholder="Enter your phone number"
                value={input.phone}
                onChange={handelInputChange}
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
                Sign Up
              </Button>
            )}
          </form>

          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-600 font-medium cursor-pointer hover:underline">
              Log in 
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
