"use client";
import { camelCaseAddress } from "@/app/global";
import { useState } from "react";
import AddressForm from "./AddressForm";
import { Button } from "@/components/ui/Button";
import AddressDisplay from "./AddressDisplay";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface AddressManagerProps {
  initialData: camelCaseAddress[];
}

const AddressManager: React.FC<AddressManagerProps> = ({ initialData }) => {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [addressToEdit, setAddressToEdit] = useState<camelCaseAddress | null>(
    null
  );
  const [disabled, setDisabled] = useState<boolean>(false);

  const removeAddress = async (addressId: string) => {
    const supabase = createClientComponentClient<Database>();
    setDisabled(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setDisabled(false);
      return;
    }
    const { error } = await supabase
      .from("user_addresses")
      .delete()
      .eq("id", addressId)
      .eq("user_id", user.id);

    if (error) {
      setDisabled(false);
      toast.error("Something went wrong.");
    } else {
      toast.success("Address removed sucessfuly.");
      router.refresh();
      setDisabled(false);
    }
  };

  const openForm = (address: camelCaseAddress | null) => {
    setAddressToEdit(address);
    setIsFormOpen(true);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {initialData.map((address) => (
          <AddressDisplay
            data={address}
            key={address.id}
            removeAddress={removeAddress}
            disabled={disabled}
            openForm={openForm}
          />
        ))}
      </div>
      {isFormOpen ? (
        <AddressForm
          key={addressToEdit?.id || "new"}
          initialData={addressToEdit}
          setIsFormOpen={setIsFormOpen}
        />
      ) : (
        <Button
          className="w-full"
          onClick={() => openForm(null)}
          variant="outline"
          disabled={disabled}
        >
          Add a new address
        </Button>
      )}
    </div>
  );
};

export default AddressManager;
