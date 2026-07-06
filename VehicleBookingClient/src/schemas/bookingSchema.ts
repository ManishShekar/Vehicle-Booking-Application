import * as yup from "yup";

import type {
  BookingFormValues,
} from "../types/bookingTypes";

export const bookingSchema: yup.ObjectSchema<BookingFormValues> =
  yup.object({
    startDate: yup
      .date()
      .nullable()
      .required("Start Date is required."),

    endDate: yup
      .date()
      .nullable()
      .required("End Date is required.")
      .test(
        "end-date",
        "End Date must be after Start Date.",
        function (value) {
          const { startDate } = this.parent;

          if (!startDate || !value) {
            return true;
          }

          return value >= startDate;
        }
      ),
  });