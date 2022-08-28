import React from "react";
import { Button, Input, Modal, Select } from "react-daisyui";
import { Controller, useForm } from "react-hook-form";
import { useBikesContext } from "../contexts/useBikesContext";
import {
  BASE_PRICE_AFTER_15_DAYS,
  BASE_PRICE_BEFORE_15_DAYS,
  DAYS_NORMAL_BIKE,
  DAYS_VINTAGE_BIKE,
  EXTRA_DAY_PRICE,
} from "../utils/constants";

type Props = {};

const defaultValues = {
  username: "",
  email: "",
  phone: "",
  startDate: new Date().toISOString().split("T")[0], // dd-mm-yyyy
  howManyDays: 1,
};

const ModalRequestBike = (props: Props) => {
  const { selectedBike, setSelectedBike, setConfirmation } = useBikesContext();
  const { control, handleSubmit } = useForm({ defaultValues });
  const handleCloseModal = () => {
    setSelectedBike(null);
  };
  const getTotalAmount = (
    startDate: string,
    howManyDays: number,
    days: number
  ) => {
    const firstDays = howManyDays >= days ? days : howManyDays;
    const remainingDays = howManyDays - firstDays;

    return (
      getBasePrice(startDate) * firstDays + EXTRA_DAY_PRICE * remainingDays
    );
  };
  const getBasePrice = (date: string): number => {
    const startDate = new Date(date);

    const day = startDate.getUTCDate();

    if (day < 15) {
      return BASE_PRICE_BEFORE_15_DAYS;
    }

    return BASE_PRICE_AFTER_15_DAYS;
  };

  const getAmountByData = ({
    startDate,
    howManyDays,
  }: typeof defaultValues) => {
    switch (selectedBike?.type) {
      case "electric":
        return getBasePrice(startDate) * howManyDays;
      case "normal":
        return getTotalAmount(startDate, howManyDays, DAYS_NORMAL_BIKE);
      case "vintage":
        return getTotalAmount(startDate, howManyDays, DAYS_VINTAGE_BIKE);
      default:
        return 0;
    }
  };
  const onSubmit = (data: typeof defaultValues) => {
    const amount = getAmountByData(data);
    if (selectedBike?.id) {
      setConfirmation({
        isOpen: true,
        amount,
        ...selectedBike,
      });
      setSelectedBike(null);
    }
  };

  return (
    <Modal open={!!selectedBike?.id}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header className="font-bold">
          Bike Rental Application
        </Modal.Header>

        <Modal.Body>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Controller
              render={({ field }) => {
                return (
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">What is your username?</span>
                    </label>
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      name={field.name}
                    />
                  </div>
                );
              }}
              control={control}
              name="username"
            />
            <Controller
              render={({ field }) => {
                return (
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">What is your email?</span>
                    </label>
                    <Input
                      type="email"
                      value={field.value}
                      onChange={field.onChange}
                      name={field.name}
                    />
                  </div>
                );
              }}
              control={control}
              name="email"
            />
            <Controller
              render={({ field }) => {
                return (
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">
                        What is your telephone?
                      </span>
                    </label>
                    <Input
                      type="tel"
                      value={field.value}
                      onChange={field.onChange}
                      name={field.name}
                    />
                  </div>
                );
              }}
              control={control}
              name="phone"
            />
            <Controller
              render={({ field }) => {
                return (
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Rental start date?</span>
                    </label>
                    <Input
                      type="date"
                      value={field.value}
                      onChange={field.onChange}
                      name={field.name}
                    />
                  </div>
                );
              }}
              control={control}
              name="startDate"
            />
            <Controller
              render={({ field }) => (
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">How many days?</span>
                  </label>
                  <select
                    onChange={field.onChange}
                    name={field.name}
                    value={field.value}
                    ref={field.ref}
                    className="select select-bordered w-full"
                  >
                    {[...Array(7)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              control={control}
              name="howManyDays"
            />
          </div>
        </Modal.Body>

        <Modal.Actions>
          <Button variant="outline" onClick={handleCloseModal}>
            Cancel
          </Button>

          <Button color="primary" type="submit">
            Get a Quote
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  );
};

export default ModalRequestBike;
