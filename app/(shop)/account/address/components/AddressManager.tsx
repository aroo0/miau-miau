"use client";
import { camelCaseAddress } from "@/app/global";
import { useState } from "react";
import AddressForm from "./AddressForm";
import { Button } from "@/components/ui/Button";

interface AddressManagerProps {
  initialData: camelCaseAddress[] | [];
}

const AddressManager: React.FC<AddressManagerProps> = ({ initialData }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  return (
    <div className="w-full">
      {isFormOpen ? (
        <AddressForm initialData={null} setIsFormOpen={setIsFormOpen} />
      ) : (
        <Button className="w-full" onClick={() => setIsFormOpen(true)} variant="outline">
          Add a new address
        </Button>
      )}
    </div>
  );
};

export default AddressManager;
