import { useMemo } from "react";

import {
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Button } from "@mui/material";

import type {
  Booking,
} from "../../types/bookingTypes"
import dayjs from "dayjs";

interface BookingTableProps {
  bookings: Booking[];
  onCancel: (
    bookingId: number
  ) => void;
}
const formatDate = (date: string) => {
  return date
    ? dayjs(date.split("T")[0]).format("DD-MM-YYYY")
    : "";
};

const BookingTable = ({
  bookings,
  onCancel,
}: BookingTableProps) => {
  const columns =
    useMemo<
      MRT_ColumnDef<Booking>[]
    >(
      () => [
        {
          accessorKey:
            "vehicleName",
          header: "Vehicle",
        },
        {
          accessorKey:
            "startDate",
          header: "Start Date",
           Cell: ({ cell }) =>
            formatDate(String(cell.getValue()))
        },
 
          
    
        {
          accessorKey:
            "endDate",
          header: "End Date",
           Cell: ({ cell }) =>
            formatDate(String(cell.getValue()))
        },
 
        
        {
          accessorKey:
            "totalCost",
          header: "Total Cost",
        },
        {
          accessorKey:
            "status",
          header: "Status",
        },
        {
          header: "Action",

          Cell: ({ row }) => (
            <Button
              variant="contained"
              color="error"
              disabled={
                row.original
                  .status ===
                "Cancelled"
              }
              onClick={() =>
                onCancel(
                  row.original
                    .bookingId
                )
              }
            >
              Cancel
            </Button>
          ),
        },
      ],
      [onCancel]
    );

  return (
    <MaterialReactTable
  columns={columns}
  data={bookings}
/>
  );
};

export default BookingTable;