import { Box, Text } from "@chakra-ui/react";

export const EmptyState = () => (
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
);
