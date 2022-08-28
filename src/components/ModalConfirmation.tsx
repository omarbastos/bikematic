import React from "react";
import { Modal, Input, Button } from "react-daisyui";
import {
  ConfirmationModal,
  useBikesContext,
} from "../contexts/useBikesContext";
import { useLocalStorage } from "usehooks-ts";

type Props = {};

function ModalConfirmation({}: Props) {
  const { confirmation, setConfirmation, setToast } = useBikesContext();
  const handleCloseModal = () => {
    setConfirmation({
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
  };

  const [orders, setOrders] = useLocalStorage<ConfirmationModal[]>(
    "orders",
    []
  );
  const handleConfirm = () => {
    setOrders([...orders, confirmation]);
    handleCloseModal();
    setToast({
      isVisible: true,
      message: "Your order has been placed",
    });
  };
  return (
    <Modal open={confirmation.isOpen}>
      <Modal.Header className="font-bold">
        Please confirm your order
      </Modal.Header>

      <Modal.Body>
        <h3>
          <>
            {`You are renting a bike ${confirmation.name} - ${
              confirmation.maker
            }, ${confirmation.year} type ${confirmation.type} size ${
              confirmation.size
            } for an amount: USD $
            ${confirmation?.amount.toFixed(2)}`}
          </>
        </h3>
      </Modal.Body>

      <Modal.Actions>
        <Button variant="outline" onClick={handleCloseModal}>
          Cancel
        </Button>

        <Button onClick={handleConfirm} color="primary" type="submit">
          Rent now
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ModalConfirmation;
