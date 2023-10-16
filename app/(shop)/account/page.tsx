import Container from "@/components/ui/Container";
import AccountMenu from "../(auth)/components/AccountMenu";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <AccountMenu title="Account Details">
      <p>
        Welcome. Find and track your orders, add or update your addresses and
        more.
      </p>{" "}
    </AccountMenu>
  );
};

export default page;
