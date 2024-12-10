import React from "react";

export const RefetchProvider = React.createContext<(() => void) | undefined>(
  undefined
);

export const RefetchData = () => {
  const refetch = React.useContext(RefetchProvider);

  if (!refetch) {
    throw new Error("error");
  }
  return refetch;
};

export const AdminProvider = React.createContext<string | undefined>(undefined);

export const AdminhData = () => {
  const admina = React.useContext(RefetchProvider);

  if (!admina) {
    throw new Error("error");
  }
  return admina;
};
