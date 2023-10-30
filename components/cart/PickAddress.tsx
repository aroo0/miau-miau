"use client"

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { camelCaseAddress } from '@/app/global';

interface PickAddressProps {
  addresses: camelCaseAddress[];
}

const formSchema = z.object({
  shippingAddress: z.string().min(1),
});

type AddressFormValues = z.infer<typeof formSchema>;

const PickAddress: React.FC<PickAddressProps> = ({ addresses }) => {
  const defaultAddress = addresses.find((address) => address.primary === true);

  console.log(defaultAddress)

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shippingAddress: defaultAddress ? defaultAddress.id.toString() : '',
    },
  });

  console.log(form.getValues())
  
  return (
    <Form {...form} >
    <form
      className="space-y-8 mt-6 pb-10 w-full "
    >
                   <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select Shipping Address"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {addresses.map((address) => (
                        <SelectItem
                          key={address.id}
                          value={address.id.toString()}
                        >
                          {`${address.firstName} ${address.lastName}, ${address.addressLine1} ${address.addressLine2 && address.addressLine2}, ${address.city} ${address.postalCode}, ${address.country}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
    </form>
    </Form>
   )
}

export default PickAddress