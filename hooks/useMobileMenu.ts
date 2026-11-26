import { useCallback, useState, type KeyboardEvent } from "react";

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const closeOnEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    },
    [close],
  );

  return { isOpen, open, close, closeOnEscape };
}
