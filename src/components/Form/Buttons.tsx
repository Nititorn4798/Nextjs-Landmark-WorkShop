'use client'
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, RotateCw } from 'lucide-react';
import { SignInButton } from "@clerk/nextjs";


type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  size?: btnSize;
  text?: string;
};

export const SubmitButton = ({ className, size, text }: SubmitButtonProps) => {

  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} type="submit" size={size} className={`${className} capitalize`}>
      {
        pending ? <><RotateCw className="animate-spin" /><span>Please wait...</span></> : <p>{text}</p>
      }
    </Button>
  );
};

export const SignInCardButton = () => {
  return (
    <SignInButton mode="modal">
      <Button variant='outline' size='icon'>
        <Heart />
      </Button>
    </SignInButton>
  )
}

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size='icon' variant='outline'>
      {
        pending ? <RotateCw className="animate-spin" /> : isFavorite ? <Heart fill="red" /> : <Heart />
      }

    </Button>
  )
}
