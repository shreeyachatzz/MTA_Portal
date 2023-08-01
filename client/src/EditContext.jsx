import { createContext, useContext, useMemo, useState } from 'react';

const EditContext = createContext();

export const EditContextProvider = ({ children }) => {
  const [makeEdit, setMakeEdit] = useState(false);
  const [userData, setUserData] = useState(null);

  // Memoize the userData state
  const memoizedUserData = useMemo(() => userData, [userData]);

  const contextValues = {
    makeEdit,
    setMakeEdit,
    userData: memoizedUserData,
    setUserData,
  };

  return (
    <EditContext.Provider value={contextValues}>
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => useContext(EditContext);
