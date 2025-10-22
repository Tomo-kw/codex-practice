import { Button, Input, Stack, chakra } from "@chakra-ui/react";
import { FormEvent } from "react";

type TodoFormProps = {
  value: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (value: string) => void;
};

export const TodoForm = ({ value, onSubmit, onChange }: TodoFormProps) => (
  <chakra.form onSubmit={onSubmit}>
    <Stack direction={{ base: "column", md: "row" }} gap={3} align="stretch">
      <Input
        aria-label="Todoを入力"
        bg="white"
        border="1px solid"
        borderColor="whiteAlpha.400"
        borderRadius="xl"
        boxShadow="0 10px 30px rgba(15, 23, 42, 0.08)"
        placeholder="やることを入力..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        _focus={{
          borderColor: "teal.300",
          boxShadow: "0 0 0 2px rgba(45,212,191,0.2)",
          bg: "white",
        }}
        _placeholder={{ color: "gray.400" }}
      />
      <Button
        type="submit"
        borderRadius="xl"
        px={{ base: 4, md: 8 }}
        fontWeight="bold"
        color="white"
        bgGradient="linear(to-r, teal.400, cyan.300)"
        boxShadow="0 15px 30px rgba(20, 184, 166, 0.35)"
        transition="all 0.2s ease"
        disabled={!value.trim()}
        _hover={{
          bgGradient: "linear(to-r, teal.500, cyan.400)",
          transform: "translateY(-1px)",
          boxShadow: "0 18px 35px rgba(20, 184, 166, 0.4)",
        }}
        _active={{ transform: "translateY(0)" }}
        _disabled={{
          opacity: 0.6,
          cursor: "not-allowed",
          boxShadow: "none",
        }}
      >
        追加する
      </Button>
    </Stack>
  </chakra.form>
);
