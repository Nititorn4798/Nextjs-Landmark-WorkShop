import Image from "next/image";
import React from "react";

const ImageContainer = ({
  mainImage,
  name,
  sizes = "100vw",
}: {
  mainImage: string;
  name: string;
  sizes?: string;
}) => {
  return (
    <section className="h-[300px] md:h-[500px] relative mt-8">
      <Image
        src={mainImage}
        sizes={sizes}
        alt={name}
        fill
        priority
        className="object-cover rounded-md "
      />
    </section>
  );
};

export default ImageContainer;
