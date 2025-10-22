import { Badge, Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { Todo } from "../types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
};

export const TodoItem = ({ todo, onToggle, onRemove }: TodoItemProps) => (
  <Box
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
          onClick={() => onToggle(todo.id)}
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
          onClick={() => onRemove(todo.id)}
        >
          削除
        </Button>
      </HStack>
    </HStack>
  </Box>
);
