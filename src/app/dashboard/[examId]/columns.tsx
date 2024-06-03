"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { ApplicantDetailCard } from "@/components/dashboard/application-detail-dialog";

export type DetailExam = {
  id: String;
  title: String;
  start: String;
  end: String;
  reg_start: String;
  reg_end: String;
  status: String;
};

export type Applicant = {
  id: string;
  exam_id: string;
  user_id: string;
  name: string;
  photo: string;
  id_card_type: string;
  id_card_no: string;
  id_card_file: string;
  id_card_profile: string;
  status: "initial" | "approved" | "rejected";
};

export const columns: ColumnDef<Applicant>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      const { index } = row;
      return <div>{index + 1}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "Applicant ID",
  },
  // {
  //   accessorKey: "user_id",
  //   header: "User ID",
  // },
  {
    accessorKey: "name",
    header: "Applicant Name",
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const applicant = row.original;
      const handleSelect = (value: string) => {
        if (applicant.status === "initial") {
          console.log(`Status diubah menjadi: ${value}`);
          // Update status applicant di sini
          // applicant.status = value;
        } else {
          console.log('Status tidak bisa diubah karena bukan "initial".');
        }
      };

      return (
        <div className="flex justify-center">
          <Select onValueChange={handleSelect} defaultValue={applicant.status}>
            <SelectTrigger className="w-[100px] text-xs">
              <SelectValue placeholder="Ubah Status Applicant" />
            </SelectTrigger>
            <SelectContent className="text-xs">
              <SelectItem value="initial" className="text-xs">
                initial
              </SelectItem>
              <SelectItem value="approved" className="text-xs">
                approved
              </SelectItem>
              <SelectItem value="rejected" className="text-xs">
                rejected
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    },
  },
  {
    header: "Evidences Count",
    cell: ({ row }) => {
      const applicant = row.original;
      return (
        <Button variant="outline">
          <Link
            href={`/dashboard/${applicant.exam_id}/${applicant.id}`}
            className="underline"
          >
            78
          </Link>
        </Button>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const applicant = row.original;
      const handleEdit = () => {
        console.log("edit");
      };

      const handleDelete = () => {
        console.log("edit");
      };

      return (
        <div className="flex justify-center gap-2">
          <ApplicantDetailCard applicantId={applicant.id} />
          <Button variant="outline" size="sm" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      );
    },
  },
];
