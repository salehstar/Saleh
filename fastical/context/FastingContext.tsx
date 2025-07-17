import * as React from 'react';

export const FastingContext = React.createContext({
  fastEndTime: null,
  setFastEndTime: (date: Date | null) => {},
});

export const FastingContextProvider = ({ children }) => {
  const [fastEndTime, setFastEndTime] = React.useState<Date | null>(null);

  return (
    <FastingContext.Provider value={{ fastEndTime, setFastEndTime }}>
      {children}
    </FastingContext.Provider>
  );
};
