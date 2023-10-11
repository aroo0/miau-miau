"use client";

import {
  Dialog,
  DialogContentPlainBlur,
  DialogPortal,
} from "@/components/ui/Dialog";
import { useEffect, useState } from "react";

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

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
      <Dialog open={isOpen} onOpenChange={onChange}>

        <DialogContentPlainBlur>{children}</DialogContentPlainBlur>

      </Dialog>
  );
};
