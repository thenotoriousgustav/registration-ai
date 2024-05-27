"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MdMoreHoriz } from "react-icons/md";
import { MdCopyAll } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
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
  // {
  //   accessorKey: "id",
  //   header: "Applicant ID",
  // },
  {
    accessorKey: "user_id",
    header: "User ID",
  },
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
        <Select onValueChange={handleSelect} value={applicant.status}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ubah Status Applicant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="initial">initial</SelectItem>
            <SelectItem value="approved">approved</SelectItem>
            <SelectItem value="rejected">rejected</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    header: "Applicant Name",
    cell: ({ row }) => {
      const applicant = row.original;
      return (
        <Button variant="outline">
          <Link href={`/dashboard/${applicant.exam_id}/${applicant.id}`}>
            Go to Detail Applicant
          </Link>
        </Button>
      );
    },
  },
];
