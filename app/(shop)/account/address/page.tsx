import AccountMenu from "../../(auth)/components/AccountMenu";
import AddressManager from "./components/AddressManager";


const AddressPage = async () => {

  return (
    <AccountMenu title="Your addresses">
      <AddressManager initialData={[]}/>



      
    </AccountMenu>
  );
};

export default AddressPage;
