import React from "react";
import CardList from "../components/CardList";
import ModalConfirmation from "../components/ModalConfirmation";
import ModalRequestBike from "../components/ModalRequestBike";
import Portal from "../components/Portal";

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
