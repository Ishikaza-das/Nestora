import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PropertyContext } from "@/context/PropertyContext";
import axios from "axios";
import { Delete, MoreHorizontal, View } from "lucide-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserPropertyTable = () => {
  const { userProperty, refreshProperty } = useContext(PropertyContext);
  const naviagte = useNavigate();

  const handelStatusChange = async (e, id) => {
    const newStatus = e.target.checked ? "rented" : "available"

    try {
      const response = await axios.put(`${import.meta.env.VITE_PROPERTY_API}/status/${id}`,
        {status: newStatus},
        {withCredentials: true}
      )
      if(response.data.success){
        await refreshProperty();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  const deleteProperty = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_PROPERTY_API}/delete/${id}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        await refreshProperty();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Table>
        <TableCaption>List of your property</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Property Name</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userProperty.length <= 0 ? (
            <span>No Property Created yet.</span>
          ) : (
            userProperty.map((uProperty) => (
              <TableRow key={uProperty._id}>
                <TableCell>{uProperty?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{uProperty?.title}</TableCell>
                <TableCell>
                  {uProperty?.images.length > 0 ? (
                    <span>Images Uploaded</span>
                  ) : (
                    <span>No Images Uploaded</span>
                  )}
                </TableCell>
                <TableCell>{uProperty?.price}</TableCell>
                <TableCell className="text-center">
                  {uProperty?.status === "available" ? (
                    <Badge className="bg-green-400">AVAILABLE</Badge>
                  ) : (
                    <Badge className="bg-red-500">RENTED</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="link">
                        <MoreHorizontal />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit mr-2">
                      <div className="flex flex-col gap-6 items-start">
                        <Button variant="link" className="cursor-pointer" onClick={() => naviagte(`/propertyview/${uProperty?._id}`)}>
                          <View />
                          View
                        </Button>
                        <div className="flex items-center-safe gap-2">
                          <Input
                            type="checkbox"
                            className="w-4 h-4"
                            id={`status-${uProperty._id}`}
                            checked={uProperty?.status === "rented"}
                            onChange={(e) => handelStatusChange(e, uProperty?._id)}
                          />
                          <Label>Rented</Label>
                        </div>
                        <Button
                          variant="link"
                          className="cursor-pointer text-red-500"
                          onClick={() => deleteProperty(uProperty._id)}
                        >
                          <Delete />
                          Delete
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserPropertyTable;
