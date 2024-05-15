"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function DialogUjian() {
  const [isFinish, setIsFinish] = useState(true);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Lihat</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isFinish ? (
          <p>Anda sudah terdaftar dan sudah lulus</p>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Daftar Ujian</DialogTitle>
              <DialogDescription>
                Silahkan masukkan data diri anda sebelum ujian dimulai.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nama
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Umur
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
