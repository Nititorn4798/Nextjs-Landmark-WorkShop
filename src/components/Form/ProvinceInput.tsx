import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { provinces } from "@/utils/provinces";

const ProvinceInput = ({ defaultValue }: { defaultValue?: string }) => {
  const name = "provinces";
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize mb-2">
        {name}
      </Label>
      <Select
        name={name}
        required
        defaultValue={defaultValue || provinces[0].PROVINCE_NAME}
      >
        <SelectTrigger className="">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {provinces.map((item) => {
            return (
              <SelectItem key={item.PROVINCE_ID} value={item.PROVINCE_NAME}>
                <span className="capitalize flex items-center gap-1">
                  {item.PROVINCE_NAME}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProvinceInput;
