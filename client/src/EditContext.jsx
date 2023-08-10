import { createContext, useContext, useState } from 'react';

const EditContext = createContext();

export const EditContextProvider = ({ children }) => {
  const [makeEdit, setMakeEdit] = useState(false);
  const [userData, setUserData] = useState(null);

  const contextValues = {
    makeEdit,
    setMakeEdit,
    userData,
    setUserData,
  };

  return (
    <EditContext.Provider value={contextValues}>
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => useContext(EditContext);
