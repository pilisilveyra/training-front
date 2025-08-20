import { Card, Text, Badge, Group} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import type { Book } from "@/lib/types";

export default function BookCard({ book }: { book: Book }){
    const navigate = useNavigate();

    return (
        <Card withBorder
              radius="md"
              shadow="sm"
              p="md"
              onClick={() => navigate(`/books/${book.id}`)}
              style={{ cursor: "pointer" }}>

            <Group justify="space-between" mb="xs">
                <Text fw={700} lineClamp={1}>{book.title}</Text>
                <Badge color={book.isAvailable ? "green" : "gray"}>
                    {book.isAvailable ? "Disponible" : "No disponible"}
                </Badge>
            </Group>

            <Text size="sm" c="dimmed" lineClamp={1}>{book.author}</Text>

            <Group gap="xs" mt="sm">
                <Badge variant="light">{book.publicationYear}</Badge>
                <Badge variant="light">{book.language}</Badge>
                <Badge variant="light">{book.genre}</Badge>
                <Badge variant="light">{book.pages} págs</Badge>
            </Group>

        </Card>
    );
}