import { camelCaseAddress } from "@/app/global";
import { Button } from "@/components/ui/Button";

interface AddressDisplayProps {
  data: camelCaseAddress;
  removeAddress: (id: string) => void;
  disabled: boolean;
  openForm: (address: camelCaseAddress | null) => void;
}

const AddressDisplay: React.FC<AddressDisplayProps> = ({
  data,
  removeAddress,
  disabled,
  openForm
}) => {
  return (
    <div className="grid grid-rows-4 gap-2">
      <div className="flex flex-col gap-1 text-sm row-span-3">
        <p className="text-xs uppercase mb-2">
          {data.primary ? "Default" : ""}
        </p>
        <p>{data.firstName + " " + data.lastName}</p>
        <p>{data.telephone}</p>
        {data.company && <p>{data.company}</p>}
        <p>{data.addressLine1 + (data.addressLine2 ? ", " + data.addressLine2 : "")}</p>
        <p>{data.postalCode + " " + data.city}</p>
        <p>{data.country}</p>
      </div>
      <div className="grid grid-cols-2 row-span-1 content-start gap-2 ">
        <Button variant="outline" disabled={ disabled} onClick={() => openForm(data)}>
          Edit
        </Button>
        <Button
          variant="outline"
          onClick={() => removeAddress(data.id)}
          disabled={disabled}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default AddressDisplay;
