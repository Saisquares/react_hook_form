import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  Controller,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from "./Schema.tsx";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { TextFormInput } from "./ReusableFormInputs.tsx";

type FormFields = z.infer<typeof Schema>;

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
    resetField,
  } = useForm<FormFields>({
    defaultValues: {
      first_name: undefined,
      email: "",
      password: "",
      gender: undefined,
      address: { city: "", state: "" },
      age: undefined,
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hobbies",
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };


  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Registration Form
        </Heading>
        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          bg="white"
          p={8}
          borderRadius="md"
          boxShadow="md"
        >
          <VStack spacing={6}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
              <FormControl isInvalid={!!errors.first_name}>
                <FormLabel htmlFor="first_name">First Name</FormLabel>
                <Input
                  id="first_name"
                  placeholder="First name"
                  {...register("first_name")}
                />
                <FormErrorMessage>
                  {errors.first_name?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.gender}>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Select {...register("gender")} placeholder="Select gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </Select>
                <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.address?.city}>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input
                  id="city"
                  placeholder="Enter City"
                  {...register("address.city")}
                />
                <FormErrorMessage>
                  {errors.address?.city?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.address?.state}>
                <FormLabel htmlFor="state">State</FormLabel>
                <Input
                  id="state"
                  placeholder="Enter state"
                  {...register("address.state")}
                />
                <FormErrorMessage>
                  {errors.address?.state?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.age}>
                <FormLabel htmlFor="age">Age</FormLabel>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  {...register("age", { valueAsNumber: true })}
                />
                <FormErrorMessage>{errors.age?.message}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <VStack spacing={4} align="stretch" w="full">
              {fields.map((item, index) => (
                <FormControl
                  key={item.id}
                  isInvalid={!!errors?.hobbies?.[index]?.name}
                >
                  <FormLabel htmlFor={`hobbies[${index}].name`}>
                    Hobby {index + 1}
                  </FormLabel>
                  <Input
                    id={`hobbies[${index}].name`}
                    placeholder="Hobby name"
                    {...register(`hobbies.${index}.name`)}
                  />
                  <FormErrorMessage>
                    {errors?.hobbies?.[index]?.name?.message}
                  </FormErrorMessage>
                </FormControl>
              ))}
              <Button onClick={() => append({ name: "" })} colorScheme="blue">
                Add Hobby
              </Button>
            </VStack>

            <FormControl isInvalid={!!errors.acceptPrivacy}>
              <Checkbox {...register("acceptPrivacy")}>
                I accept the privacy policy
              </Checkbox>
              <FormErrorMessage>
                {errors.acceptPrivacy?.message}
              </FormErrorMessage>
            </FormControl>

            {acceptPrivacy && (
              <FormControl isInvalid={!!errors.description}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      style={{ height: "200px", marginBottom: "50px" }}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.description?.message}
                </FormErrorMessage>
              </FormControl>
            )}

            <Button
              type="submit"
              colorScheme="green"
              isLoading={isSubmitting}
              loadingText="Submitting"
              width="full"
            >
              Submit
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default ReactHookForm;
