"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { BlurDialog } from "../ui/BlurDialog";

interface MobileNavDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  loading?: boolean;
  children: React.ReactNode
}

const MobileNavDialog: React.FC<MobileNavDialogProps> = ({
  children,
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <BlurDialog isOpen={isOpen} onClose={onClose}>
    {children}
  </BlurDialog>;
};

export default MobileNavDialog;
