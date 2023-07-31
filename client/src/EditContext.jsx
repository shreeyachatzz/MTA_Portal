import React, { createContext, useState, useContext } from 'react';

const EditContext = createContext();

export const EditContextProvider = ({ children }) => {
  const [makeEdit, setMakeEdit] = useState(false);
  const [userData, setUserData] = useState(null);

  return (
    <EditContext.Provider value={{ makeEdit, setMakeEdit, userData, setUserData}}>
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => useContext(EditContext);
