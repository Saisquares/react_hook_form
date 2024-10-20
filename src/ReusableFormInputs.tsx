import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
  } from "@chakra-ui/react";
  import React from "react";
  
  interface TextFormInputProps {
    label: string;
    fieldId: string;
    errors: Record<string, any>;
    register: any;
    type?: string;  
    [x: string]: any;  
  }
  
  export const TextFormInput: React.FC<TextFormInputProps> = ({
    label,
    fieldId,
    errors,
    register,
    type = "text", 
    ...rest
  }) => {
    return (
      <FormControl isInvalid={!!errors?.[fieldId]}>
        <FormLabel htmlFor={fieldId}>{label}</FormLabel>
        <Input
          id={fieldId}
          type={type}  
          placeholder={label}
          {...register(fieldId)}
          {...rest}  
        />
        <FormErrorMessage>{errors?.[fieldId]?.message}</FormErrorMessage>
      </FormControl>
    );
  };
  