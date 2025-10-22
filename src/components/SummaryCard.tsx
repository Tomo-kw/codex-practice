import { Badge, Box, HStack, Text } from "@chakra-ui/react";
import { CheckCircle } from "./icons/CheckCircle";

type SummaryCardProps = {
  remaining: number;
  completed: number;
  total: number;
};

export const SummaryCard = ({
  remaining,
  completed,
  total,
}: SummaryCardProps) => (
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
        <CheckCircle color="teal.500" boxSize={5} />
        <Text color="gray.700" fontWeight="semibold">
          残り {remaining} 件
        </Text>
      </HStack>
      <Badge borderRadius="full" px={4} py={1} bg="teal.500" color="white">
        完了 {completed}
      </Badge>
    </HStack>
    <Text mt={2} fontSize="sm" color="gray.500">
      全体 {total} 件のタスクを追跡中。
    </Text>
  </Box>
);
