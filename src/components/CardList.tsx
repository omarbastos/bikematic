import React from "react";
import { Alert, Badge, Button, Card } from "react-daisyui";
import { useBikesContext } from "../contexts/useBikesContext";

const CardList = () => {
  const { toast, setToast, bikes, setSelectedBike } = useBikesContext();
  const getBadgetColor = (type: string) => {
    switch (type) {
      case "vintage":
        return "error";
      case "normal":
        return "success";
      case "electric":
        return "warning";
      default:
        return "primary";
    }
  };

  return (
    <div className="p-4 md:p-12">
      <h2 className="text-center my-12 lg:text-3xl font-bold">
        Bikes Available for Rent
      </h2>
      {toast.isVisible && (
        <Alert
          status="info"
          className="my-8"
          color="info"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 mx-2 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          }
        >
          <div className="w-full flex-row justify-between gap-2">
            <h3 className="text-lg font-bold">{toast.message}</h3>
          </div>
          <Button
            size="xs"
            onClick={() =>
              setToast({
                isVisible: false,
                message: "",
              })
            }
          >
            Dismiss
          </Button>
        </Alert>
      )}
      <div className="grid grid-cols-3 gap-4 ">
        {bikes?.map((bike, index) => {
          return (
            <Card key={bike.id} side="lg" bordered={true}>
              <Card.Image src={bike.avatar} alt={bike.name} />
              <Card.Body>
                <Card.Title tag="h2" className="break-words">
                  {bike.name}
                  <Badge color={getBadgetColor(bike.type)}> {bike.type}</Badge>
                </Card.Title>

                <Card.Actions className="my-4 justify-start">
                  <Button
                    size="sm"
                    role="button"
                    aria-label="Rent now"
                    onClick={() => setSelectedBike(bike)}
                    color="primary"
                  >
                    Rent now
                  </Button>
                </Card.Actions>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CardList;
