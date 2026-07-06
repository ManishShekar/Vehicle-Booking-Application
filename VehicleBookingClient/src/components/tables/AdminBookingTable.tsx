import { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { Button } from "@mui/material";
import type { AdminBooking } from "../../types/bookingTypes";
import dayjs from "dayjs";

interface AdminBookingTableProps {
  bookings: AdminBooking[];
  onCancel: (bookingId: number) => void;
}

const AdminBookingTable = ({ bookings, onCancel }: AdminBookingTableProps) => {
  const columns = useMemo<MRT_ColumnDef<AdminBooking>[]>(
    () => [
      { accessorKey: "customerName", header: "Customer" },
      { accessorKey: "vehicleName", header: "Vehicle" },
       {
    accessorKey: "startDate",
    header: "Start Date",
    Cell: ({ cell }) =>
      dayjs(cell.getValue<string>()).format("DD-MM-YYYY"),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    Cell: ({ cell }) =>
      dayjs(cell.getValue<string>()).format("DD-MM-YYYY"),
  },
      { accessorKey: "totalCost", header: "Total Cost" },
      { accessorKey: "status", header: "Status" },
      {
        header: "Action",
        Cell: ({ row }) => (
          <Button
            variant="contained"
            color="error"
            disabled={row.original.status !== "Confirmed"}
            onClick={() => onCancel(row.original.bookingId)}
          >
            Cancel
          </Button>
        ),
      },
    ],
    [onCancel]
  );

  return <MaterialReactTable columns={columns} data={bookings} />;
};

export default AdminBookingTable;