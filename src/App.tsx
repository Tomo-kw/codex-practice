import { Box, Container, Stack, Text } from "@chakra-ui/react";
import { FormEvent, useMemo, useState } from "react";
import { HeaderSection } from "./components/HeaderSection";
import { SummaryCard } from "./components/SummaryCard";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { Todo } from "./types/todo";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = inputValue.trim();

    if (!trimmed) {
      setInputError("Todo を入力してください。");
      return;
    }

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, done: false },
    ]);
    setInputValue("");
    setInputError("");
  };

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleRemove = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const summary = useMemo(() => {
    const completed = todos.filter((todo) => todo.done).length;
    return { completed, remaining: todos.length - completed };
  }, [todos]);

  return (
    <Box
      bgGradient="linear(to-br, #0f172a, #1e293b)"
      minH="100vh"
      px={{ base: 4, md: 8 }}
      py={{ base: 12, md: 20 }}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-24"
        right="-16"
        w={{ base: "72", md: "96" }}
        h={{ base: "72", md: "96" }}
        bgGradient="radial(closest-side, rgba(45,212,191,0.6), transparent)"
        filter="blur(50px)"
      />
      <Box
        position="absolute"
        bottom="-20"
        left="-16"
        w={{ base: "64", md: "80" }}
        h={{ base: "64", md: "80" }}
        bgGradient="radial(closest-side, rgba(59,130,246,0.45), transparent)"
        filter="blur(60px)"
      />

      <Container
        position="relative"
        maxW="lg"
        bg="rgba(248, 250, 252, 0.92)"
        borderRadius="3xl"
        border="1px solid"
        borderColor="whiteAlpha.400"
        backdropFilter="blur(12px)"
        boxShadow="0 25px 60px rgba(15, 23, 42, 0.35)"
        px={{ base: 6, md: 10 }}
        py={{ base: 8, md: 12 }}
      >
        <Stack gap={10}>
          <HeaderSection />

          <TodoForm
            value={inputValue}
            onSubmit={handleSubmit}
            onChange={(nextValue) => {
              setInputValue(nextValue);
              if (inputError) {
                setInputError("");
              }
            }}
          />

          <Stack gap={5}>
            {inputError && (
              <Text color="red.300" fontSize="sm">
                {inputError}
              </Text>
            )}

            <SummaryCard
              remaining={summary.remaining}
              completed={summary.completed}
              total={todos.length}
            />

            <TodoList
              todos={todos}
              onToggle={handleToggle}
              onRemove={handleRemove}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default App;
