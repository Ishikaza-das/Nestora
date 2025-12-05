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
import React, { useContext } from "react";

const UserPropertyTable = () => {
  const { userProperty } = useContext(PropertyContext);
  return (
    <div>
      <Table>
        <TableCaption>List of your property</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Property Name</TableHead>
            <TableHead>price</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userProperty.length <= 0 ? (
            <span>No Property Created yet.</span>
          ) : (
            userProperty.map((uProperty) => (
              <TableRow key={uProperty._id}>
                <TableCell>{uProperty?.createdAt.split('T')[0]}</TableCell>
                <TableCell>{uProperty?.title}</TableCell>
                <TableCell>{uProperty?.price}</TableCell>
                <TableCell className="text-right">{uProperty?.status.toUpperCase()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserPropertyTable;
