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
}

const MobileNavDialog: React.FC<MobileNavDialogProps> = ({
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
    <div>Hello!</div>
  </BlurDialog>;
};

export default MobileNavDialog;
