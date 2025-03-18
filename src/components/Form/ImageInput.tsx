import React from "react";

import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ImageInput = ({
  name = "image",
  label = "image",
  isRequired = true,
}: {
  name?: string;
  label?: string;
  isRequired?: boolean;
}) => {
  return (
    <div>
      <Label className="mb-2 capitalize">{label}</Label>
      <Input
        id={name}
        name={name}
        type="file"
        {...(isRequired ? { required: true } : {})}
        accept="image/*"
      />
    </div>
  );
};

export default ImageInput;
