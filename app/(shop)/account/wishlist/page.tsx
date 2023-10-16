import AccountMenu from "../../(auth)/components/AccountMenu";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <AccountMenu title="Wishlist">
      <p>wishlist</p>{" "}
    </AccountMenu>
  );
};

export default page;
