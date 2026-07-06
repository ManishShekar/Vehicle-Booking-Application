import { useMemo } from "react";

import {
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { Button } from "@mui/material";

import type { Vehicle } from "../../types/vehicleTypes";

interface VehicleTableProps {
  vehicles: Vehicle[];
  onBook: (vehicleId: number) => void;
}

const VehicleTable = ({
  vehicles,
  onBook,
}: VehicleTableProps) => {
  const columns = useMemo<
    MRT_ColumnDef<Vehicle>[]
  >(
    () => [
      {
        accessorKey: "vehicleName",
        header: "Vehicle",
      },
      {
        accessorKey: "vehicleType",
        header: "Type",
      },
      {
        accessorKey: "registrationNumber",
        header: "Registration",
      },
      {
        accessorKey: "dailyRate",
        header: "Daily Rate",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        header: "Action",

        Cell: ({ row }) => (
          <Button
            variant="contained"
            disabled={
              row.original.status !==
              "Available"
            }
            onClick={() =>
              onBook(
                row.original.vehicleId
              )
            }
          >
            Book Now
          </Button>
        ),
      },
    ],
    [onBook]
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={vehicles}
    />
  );
};

export default VehicleTable;