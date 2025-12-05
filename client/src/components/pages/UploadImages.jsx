import React, { useContext, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { PropertyContext } from '@/context/PropertyContext'

const UploadImages = () => {
  const { refreshProperty } = useContext(PropertyContext);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const params = useParams();
  const propertyId = params.id;
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if(files.length > 10){
      toast.error("You can select maximum 10 images.");
      return;
    }

    const previewImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setSelectedImages(previewImages)
  }

  const handleUpload = async (e) => {
    e.preventDefault();

    if(selectedImages.length === 0){
      toast.error("Please select images first.");
      return;
    }

    const formData = new FormData();
   selectedImages.forEach(({ file }) => formData.append("files", file));

    try {
     setLoading(true); 
     const response = await axios.post(`${import.meta.env.VITE_PROPERTY_API}/${propertyId}/images`,formData,{
      headers:{
        "Content-Type": "multipart/form-data"
      },
      withCredentials:true
     })
     if(response.data.success){
      toast.success(response.data.message);
      await refreshProperty();
      navigate("/profile");
     }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div>
        <Navbar/>
        <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex justify-center">
          <Card className="w-full max-w-lg shadow-xl rounded-2xl p-4">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="font-bold text-3xl text-yellow-500">
                Upload Images
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm">
                 You can upload up to <b>10 images</b>.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <form className="space-y-4" onSubmit={handleUpload}>
                <div className="space-y-2">
                  <Label>Images</Label>
                  <Input
                    id="files"
                    type="file"
                    className="cursor-pointer"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                </div>

                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {selectedImages.map((img, index) => (
                      <div key={index} className="w-full">
                        <img
                          src={img.preview}
                          alt="preview"
                          className="w-full h-32 object-cover rounded-lg shadow-md"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {loading ? (
                  <Button
                    className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl"
                    type="submit"
                  >
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Adding...
                  </Button>
                ) : (
                  <Button
                    className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl"
                    type="submit"
                  >
                    Add Property
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default UploadImages
