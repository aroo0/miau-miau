import { WishListType } from "@/app/global";

interface WishlistItemProps {
  data: WishListType;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ data }) => {
  return <div>WishlistItem</div>;
};

export default WishlistItem;
