import useMenuModal from "@/hooks/useMenuModal";
import Container from "../ui/Container";
import useCart from "@/hooks/useCart";
import CartItem from "./CartItem";

interface CartProps {}

const Cart: React.FC<CartProps> = ({}) => {
  const { onClose } = useMenuModal();
  const { items } = useCart();

  return (
    <div className="w-full h-full" onClick={onClose}>
      <Container>
        <div className="flex gap-10 py-16 w-full justify-center">
          <div className="bg-red-500 w-full h-20">
          </div>
          {items.map((item) => <CartItem key={item.product.id}/>)}
        </div>
      </Container>
    </div>
  );
};

export default Cart;
