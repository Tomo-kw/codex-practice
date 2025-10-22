import { Badge, Heading, Stack, Text } from "@chakra-ui/react";

export const HeaderSection = () => (
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
);
