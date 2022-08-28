import React, { createContext, useContext, useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export interface Bike {
  id: string;
  name: string;
  maker: string;
  year: number;
  type: string;
  size: string;
  avatar: string;
}
export interface ConfirmationModal extends Bike {
  isOpen: boolean;
  amount: number;
}
interface ToastProps {
  isVisible: boolean;
  message: string;
}
type Context = {
  bikes: Bike[];
  setBikes: (bikes: Bike[]) => void;
  selectedBike: Bike | null;
  setSelectedBike: (bike: Bike | null) => void;
  confirmation: ConfirmationModal;
  setConfirmation: (confirmationModal: ConfirmationModal) => void;
  toast: ToastProps;
  setToast: (toast: ToastProps) => void;
};

const BikesContext = createContext<Context | null>(null);

export const BikesContextProvider = ({ children }: Props) => {
  const [toast, setToast] = useState<ToastProps>({
    isVisible: false,
    message: "",
  });
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [confirmation, setConfirmation] = useState<ConfirmationModal>({
    isOpen: false,
    amount: 0,
    id: "",
    name: "",
    maker: "",
    year: 0,
    type: "",
    size: "",
    avatar: "",
  });
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const data = await fetch("https://my.api.mockaroo.com/bikes.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-API-Key": "33c84350",
          },
        });

        setBikes(await data.json());
      } catch (error) {
        console.error(error);
      }
    };

    fetchBikes();
  }, []);

  return (
    <BikesContext.Provider
      value={{
        bikes,
        setBikes,
        toast,
        setToast,
        selectedBike,
        setSelectedBike,
        confirmation,
        setConfirmation,
      }}
    >
      {children}
    </BikesContext.Provider>
  );
};

export const useBikesContext = () => {
  const context = useContext(BikesContext);

  if (!context)
    throw new Error(
      "BikesContext must be called from within the BikesContextProvider"
    );

  return context;
};
