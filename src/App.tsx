import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  chakra,
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
          <Stack gap={3} textAlign="center">
            <Badge
              alignSelf="center"
              borderRadius="full"
              bg="whiteAlpha.800"
              color="teal.600"
              px={5}
              py={1.5}
              letterSpacing="wider"
            >
              My Todo
            </Badge>
            <Heading
              size="lg"
              bgGradient="linear(to-r, teal.200, cyan.300)"
              bgClip="text"
              fontWeight="extrabold"
              letterSpacing="wide"
            >
              かんたん TODO アプリ
            </Heading>
            <Text color="gray.600" fontSize="sm">
              ひらめきを逃さずメモして、チェックひとつで気持ちよく達成。
            </Text>
          </Stack>

          <chakra.form onSubmit={handleSubmit}>
            <Stack
              direction={{ base: "column", md: "row" }}
              gap={3}
              align="stretch"
            >
              <Input
                aria-label="Todoを入力"
                bg="white"
                border="1px solid"
                borderColor="whiteAlpha.400"
                borderRadius="xl"
                boxShadow="0 10px 30px rgba(15, 23, 42, 0.08)"
                placeholder="やることを入力..."
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                  if (inputError) {
                    setInputError("");
                  }
                }}
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
                disabled={!inputValue.trim()}
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

          <Stack gap={5}>
            {inputError && (
              <Text color="red.300" fontSize="sm">
                {inputError}
              </Text>
            )}

            <Box
              borderRadius="2xl"
              bg="white"
              border="1px solid"
              borderColor="gray.100"
              px={6}
              py={5}
              boxShadow="0 15px 35px rgba(100, 116, 139, 0.12)"
            >
              <HStack justify="space-between" align="center">
                <HStack gap={3}>
                  <Icon viewBox="0 0 24 24" color="teal.500" boxSize={5}>
                    <path
                      fill="currentColor"
                      d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm3.707-10.707-4.243 4.243-1.88-1.88a1 1 0 0 0-1.414 1.414l2.587 2.586a1 1 0 0 0 1.414 0l4.95-4.95a1 1 0 1 0-1.414-1.414Z"
                    />
                  </Icon>
                  <Text color="gray.700" fontWeight="semibold">
                    残り {summary.remaining} 件
                  </Text>
                </HStack>
                <Badge
                  borderRadius="full"
                  px={4}
                  py={1}
                  bg="teal.500"
                  color="white"
                >
                  完了 {summary.completed}
                </Badge>
              </HStack>
              <Text mt={2} fontSize="sm" color="gray.500">
                全体 {todos.length} 件のタスクを追跡中。
              </Text>
            </Box>

            {todos.length === 0 ? (
              <Box
                borderRadius="2xl"
                border="1px dashed"
                borderColor="gray.200"
                bg="whiteAlpha.800"
                textAlign="center"
                py={12}
                px={4}
              >
                <Text fontWeight="medium" color="gray.600">
                  まだタスクがありません。
                </Text>
                <Text mt={1} fontSize="sm" color="gray.500">
                  思いついたアイデアをまずは一件書き留めてみましょう。
                </Text>
              </Box>
            ) : (
              <Stack gap={4}>
                {todos.map((todo) => (
                  <Box
                    key={todo.id}
                    p={{ base: 4, md: 5 }}
                    borderRadius="2xl"
                    bg={
                      todo.done
                        ? "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(45,212,191,0.2))"
                        : "white"
                    }
                    border="1px solid"
                    borderColor={todo.done ? "teal.100" : "gray.100"}
                    boxShadow={
                      todo.done
                        ? "0 18px 35px rgba(45, 212, 191, 0.18)"
                        : "0 15px 35px rgba(148, 163, 184, 0.12)"
                    }
                    transition="transform 0.2s ease, box-shadow 0.2s ease"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 22px 45px rgba(148, 163, 184, 0.2)",
                    }}
                  >
                    <HStack align="flex-start" justify="space-between">
                      <Stack gap={2}>
                        <HStack gap={3}>
                          <Box
                            w={3}
                            h={3}
                            borderRadius="full"
                            bgGradient={
                              todo.done
                                ? "linear(to-br, teal.300, green.300)"
                                : "linear(to-br, orange.300, pink.300)"
                            }
                            boxShadow="0 0 0 4px rgba(255,255,255,0.25)"
                          />
                          <Text
                            fontWeight="semibold"
                            color={todo.done ? "teal.800" : "gray.800"}
                            textDecoration={todo.done ? "line-through" : "none"}
                            opacity={todo.done ? 0.85 : 1}
                            transition="color 0.2s ease"
                          >
                            {todo.text}
                          </Text>
                        </HStack>
                        <Badge
                          width="fit-content"
                          borderRadius="full"
                          px={3}
                          py={1}
                          bg={todo.done ? "teal.100" : "gray.100"}
                          color={todo.done ? "teal.700" : "gray.600"}
                        >
                          {todo.done ? "完了" : "進行中"}
                        </Badge>
                      </Stack>
                      <HStack gap={2}>
                        <Button
                          variant="outline"
                          size="sm"
                          borderRadius="full"
                          color="teal.600"
                          borderColor="teal.200"
                          bg="white"
                          _hover={{
                            bg: "teal.50",
                            borderColor: "teal.300",
                          }}
                          _active={{ bg: "teal.100" }}
                          onClick={() => handleToggle(todo.id)}
                        >
                          切替
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          borderRadius="full"
                          color="red.500"
                          _hover={{
                            bg: "red.50",
                            color: "red.600",
                          }}
                          onClick={() => handleRemove(todo.id)}
                        >
                          削除
                        </Button>
                      </HStack>
                    </HStack>
                  </Box>
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
