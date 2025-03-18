"use client";
import React from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { useEffect } from "react";
import { actionFunction } from "@/utils/types";

const initialState = {
  message: "",
  error: "",
};

const FormContainer = ({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) => {
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.message)
      toast(state.error, {
        description: state.message,
      });
  }, [state]);

  return <form action={formAction}>{children}</form>;
};

export default FormContainer;
