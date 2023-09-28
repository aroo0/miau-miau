"use client";

import {
  Dialog,
  DialogContentPlainBlur,
} from "@/components/ui/Dialog";

interface BlurDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const BlurDialog: React.FC<BlurDialogProps> = ({

  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContentPlainBlur>
       {children}
      </DialogContentPlainBlur>
    </Dialog>
  );
};
