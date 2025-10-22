import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FormEvent, useMemo, useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

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
    <Box bgGradient="linear(to-br, teal.500, green.400)" minH="100vh" py={20}>
      <Container
        bg="white"
        borderRadius="3xl"
        boxShadow="2xl"
        maxW="lg"
        p={{ base: 8, md: 12 }}
      >
        <Stack gap={8}>
          <Stack gap={3} textAlign="center">
            <Badge
              alignSelf="center"
              borderRadius="full"
              colorScheme="teal"
              px={4}
              py={1}
            >
              My Todo
            </Badge>
            <Heading size="lg" color="teal.700">
              かんたん TODO アプリ
            </Heading>
            <Text color="gray.600">
              タスクを追加して進捗を管理しましょう。チェックすると完了扱いになります。
            </Text>
          </Stack>

          <form onSubmit={handleSubmit}>
            <HStack gap={3} align="stretch">
              <Input
                aria-label="Todoを入力"
                bg="gray.50"
                border="1px solid"
                borderColor="gray.200"
                placeholder="やることを入力..."
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                  if (inputError) {
                    setInputError("");
                  }
                }}
              />
              <Button
                colorScheme="teal"
                type="submit"
                isDisabled={!inputValue.trim()}
              >
                追加
              </Button>
            </HStack>
          </form>

          <Stack gap={4}>
            {inputError && (
              <Text color="red.500" fontSize="sm">
                {inputError}
              </Text>
            )}
            <HStack justify="space-between">
              <Text color="gray.600">
                残り: {summary.remaining} / 全体: {todos.length}
              </Text>
              <Badge colorScheme={summary.completed ? "teal" : "gray"}>
                完了 {summary.completed}
              </Badge>
            </HStack>

            {todos.length === 0 ? (
              <Text color="gray.500" textAlign="center">
                まだタスクがありません。まずは一件追加してみましょう。
              </Text>
            ) : (
              <Stack gap={3}>
                {todos.map((todo) => (
                  <HStack
                    key={todo.id}
                    align="center"
                    bg="gray.50"
                    borderRadius="xl"
                    px={4}
                    py={3}
                    justify="space-between"
                  >
                    <Button
                      variant="ghost"
                      colorScheme={todo.done ? "teal" : "gray"}
                      size="sm"
                      minW={12}
                      onClick={() => handleToggle(todo.id)}
                    >
                      {todo.done ? "完了" : "未完"}
                    </Button>
                    <Box flex="1">
                      <Text
                        color={todo.done ? "gray.500" : "gray.800"}
                        textDecoration={todo.done ? "line-through" : "none"}
                        transition="color 0.2s ease"
                      >
                        {todo.text}
                      </Text>
                    </Box>
                    <Button
                      variant="ghost"
                      colorScheme="red"
                      size="sm"
                      minW={12}
                      onClick={() => handleRemove(todo.id)}
                    >
                      削除
                    </Button>
                  </HStack>
                ))}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default App;
