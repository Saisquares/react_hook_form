import React, { useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from "./Schema.tsx";


type FormFields = z.infer<typeof Schema>;

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control, watch, resetField
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
      age: null,
      hobbies: [{ name: "" }],
      acceptPrivacy: false,
      description: "",
    },
    resolver: zodResolver(Schema),
    mode: "all",
  });

  const acceptPrivacy = watch("acceptPrivacy");

  useEffect(() => {
    if (!acceptPrivacy) {
      resetField("description"); 
    }
  }, [acceptPrivacy, resetField]);

  const {append,fields, remove}= useFieldArray({
   control,  
   name: "hobbies"
  })

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.first_name}>
          <FormLabel htmlFor="first_name">First Name</FormLabel>
          <Input
            id={"first_name"}
            type={"text"}
            placeholder="First name"
            {...register("first_name")}
          />
          {errors.first_name && (
            <FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id={"email"}
            type={"email"}
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.gender}>
          <FormLabel htmlFor="gender">Gender</FormLabel>
          <Select {...register("gender")} placeholder="Select">
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
            <option value={"Others"}>Others</option>
          </Select>
          {errors.gender && (
            <FormErrorMessage>{errors.gender.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.address?.city}>
          <FormLabel htmlFor="city">City</FormLabel>
          <Input
            id="city"
            type="text"
            placeholder="Enter City"
            {...register("address.city")}
          />
          {errors.address?.city && (
            <FormErrorMessage>{errors.address?.city.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.address?.state}>
          <FormLabel htmlFor="state">State</FormLabel>
          <Input
            id="state"
            type="text"
            placeholder="Enter state"
            {...register("address.state")}
          />
          {errors.address?.state && (
            <FormErrorMessage>{errors.address?.state.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.age}>
          <FormLabel htmlFor="age">Age</FormLabel>
          <Input
            id="age"
            type="number"
            placeholder="Enter age"
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age && (
            <FormErrorMessage>{errors.age.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.acceptPrivacy}>
        <Checkbox {...register("acceptPrivacy")}>
          I accept the privacy policy
        </Checkbox>
        {errors.acceptPrivacy && (
          <FormErrorMessage>
            {errors.acceptPrivacy.message}
          </FormErrorMessage>
        )}
      </FormControl>

      {acceptPrivacy && (
        <FormControl isInvalid={!!errors.description} mt={4}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            id="description"
            placeholder="Enter a description"
            {...register("description")}
          />
          {errors.description && (
            <FormErrorMessage>{errors.description.message}</FormErrorMessage>
          )}
        </FormControl>
      )}

        {fields.map((item, index) => (
        <FormControl
          key={item.id}
          isInvalid={!!errors?.hobbies?.[index]?.name}
        >
          <FormLabel htmlFor={`hobbies[${index}].name`}>Hobby Name</FormLabel>
          <Input
            id={`hobbies[${index}].name`}
            type="text"
            placeholder="Hobby name"
            {...register(`hobbies.${index}.name`)}
          />
          {errors?.hobbies?.[index]?.name && (
            <FormErrorMessage>
              {errors?.hobbies?.[index]?.name?.message}
            </FormErrorMessage>
          )}
        </FormControl>
      ))}

      <Button
        mt={4}
        onClick={() => append({ name: "" })} 
      >
        Add Hobby
      </Button>


        <FormControl>
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default ReactHookForm;
