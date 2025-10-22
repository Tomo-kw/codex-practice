import { Stack } from "@chakra-ui/react";
import { Todo } from "../types/todo";
import { EmptyState } from "./EmptyState";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
};

export const TodoList = ({ todos, onToggle, onRemove }: TodoListProps) => {
  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <Stack gap={4}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </Stack>
  );
};
