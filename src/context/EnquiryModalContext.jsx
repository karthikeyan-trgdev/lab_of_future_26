import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import EnquiryModal from '../components/common/EnquiryModal';

const EnquiryModalContext = createContext(null);

export const EnquiryModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openEnquiry = useCallback(() => setIsOpen(true), []);
  const closeEnquiry = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ openEnquiry, closeEnquiry }), [openEnquiry, closeEnquiry]);

  return (
    <EnquiryModalContext.Provider value={value}>
      {children}
      {isOpen && <EnquiryModal onClose={closeEnquiry} />}
    </EnquiryModalContext.Provider>
  );
};

export const useEnquiryModal = () => {
  const ctx = useContext(EnquiryModalContext);
  if (!ctx) {
    throw new Error('useEnquiryModal must be used within an EnquiryModalProvider');
  }
  return ctx;
};
