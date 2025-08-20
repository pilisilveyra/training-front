import { Card, Text, Badge, Group, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import type { Book } from "@/lib/types";
import DeleteDialog from "@/components/DeleteDialog";
import { deleteBook } from "@/lib/api";
import { notifications } from "@mantine/notifications";

type Props = {
    book: Book;
    onDeleted?: () => void; // el padre lo usa para refrescar
};

export default function BookCard({ book, onDeleted }: Props) {
    const navigate = useNavigate();

    const goToDetail = () => navigate(`/books/${book.id}`);

    return (
        <Card
            withBorder
            radius="md"
            shadow="sm"
            p="md"
            onClick={goToDetail}
            style={{ cursor: "pointer" }}
        >
            <Group justify="space-between" mb="xs">
                <Text fw={700} lineClamp={1}>
                    {book.title}
                </Text>
                <Badge color={book.isAvailable ? "green" : "gray"}>
                    {book.isAvailable ? "Disponible" : "No disponible"}
                </Badge>
            </Group>

            <Text size="sm" c="dimmed" lineClamp={1}>
                {book.author}
            </Text>

            <Group gap="xs" mt="sm">
                <Badge variant="light">{book.publicationYear}</Badge>
                <Badge variant="light">{book.language}</Badge>
                <Badge variant="light">{book.genre}</Badge>
                <Badge variant="light">{book.pages} págs</Badge>
            </Group>

            {/* Acciones */}
            <Group
                justify="flex-end"
                mt="md"
                // Evita que el click navegue
                onClick={(e) => e.stopPropagation()}
            >
                <Button variant="light" onClick={goToDetail}>
                    Ver detalle
                </Button>

                <DeleteDialog
                    title="Eliminar libro"
                    description={`¿Seguro que querés eliminar "${book.title}"? Esta acción no se puede deshacer.`}
                    triggerLabel="Eliminar"
                    onConfirm={async () => {
                        await deleteBook(book.id);
                        notifications.show({
                            color: "green",
                            title: "Libro eliminado",
                            message: `"${book.title}" se eliminó correctamente.`,
                        });
                        onDeleted?.(); // avisa al padre para que actualice la grilla
                    }}
                />
            </Group>
        </Card>
    );
}
