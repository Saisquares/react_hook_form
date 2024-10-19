import React from "react";
import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Text } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"

type FormFields = {
  email: string;
  password: string;
}
const ReactHookForm = () => {

    const {register, handleSubmit,  formState: { errors, isSubmitting }} = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data)
  }
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email ? true : false}>
          <FormLabel id={"email"}>Email</FormLabel>
          <Input
            type={"email"}
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {!errors.email ? (
        <FormHelperText>
          Enter the email you'd like to receive the newsletter on.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 8, validate: (value) => value.includes('@') })}
          />
          {errors.password && (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
        </FormControl>

       <FormControl>
       <Button type="submit">Submit</Button>
       </FormControl>
      </form>
    </Box>
  );
};

export default ReactHookForm;
