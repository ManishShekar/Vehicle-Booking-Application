import { Controller } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers";

import dayjs from "dayjs";

import type { Control } from "react-hook-form";

import type {
  BookingFormValues,
} from "../../types/bookingTypes";

import {
  FormContainer,
} from "./BookingForm.styles";

interface BookingFormProps {
  control: Control<BookingFormValues>;
}

const BookingForm = ({
  control,
}: BookingFormProps) => {
  return (
    <FormContainer>

      <Controller
        name="startDate"
        control={control}
        render={({
          field,
          fieldState,
        }) => (
          <DatePicker
            label="Start Date"
             disablePast
            value={
              field.value
                ? dayjs(field.value)
                : null
            }
            onChange={(value) =>
              field.onChange(
                value
                  ? value.toDate()
                  : null
              )
            }
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!fieldState.error,
                helperText:
                  fieldState.error?.message,
              },
            }}
          />
        )}
      />

      <Controller
        name="endDate"
        control={control}
        render={({
          field,
          fieldState,
        }) => (
          <DatePicker
            label="End Date"
            disablePast
            value={
              field.value
                ? dayjs(field.value)
                : null
            }
            onChange={(value) =>
              field.onChange(
                value
                  ? value.toDate()
                  : null
              )
            }
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!fieldState.error,
                helperText:
                  fieldState.error?.message,
              },
            }}
          />
        )}
      />

    </FormContainer>
  );
};

export default BookingForm;