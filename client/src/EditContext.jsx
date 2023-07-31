import React, { createContext, useState, useContext } from 'react';

const EditContext = createContext();

export const EditContextProvider = ({ children }) => {
  const [makeEdit, setMakeEdit] = useState(false);

  return (
    <EditContext.Provider value={{ makeEdit, setMakeEdit }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => useContext(EditContext);
