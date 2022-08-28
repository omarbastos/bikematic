import React from "react";
import { Alert, Button, Modal, Toast } from "react-daisyui";
import CardList from "../components/CardList";
import ModalConfirmation from "../components/ModalConfirmation";
import ModalRequestBike from "../components/ModalRequestBike";
import Portal from "../components/Portal";
import { useBikesContext } from "../contexts/useBikesContext";

const home = () => {
  return (
    <>
      <CardList />
      <Portal>
        <ModalRequestBike />
      </Portal>
      <Portal>
        <ModalConfirmation />
      </Portal>
    </>
  );
};

export default home;
