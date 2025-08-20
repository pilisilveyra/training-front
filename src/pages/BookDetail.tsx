import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Container, Title, Text, Loader, Alert, Group, Badge, Button, Stack
} from "@mantine/core";
import api from "@/lib/axios";
import type { Book } from "@/lib/types";
import { normalizeBook } from "@/lib/normalized";


export default function BookDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const {data} = await api.get(`/books/${id}`);
                setBook(normalizeBook(data));
            } catch (e: any){
                const msg = e?.response?.status === 404
                    ? "El libro no existe."
                    : (e?.response?.data?.message ?? e.message ?? "Error al cargar el libro");
                setError(msg);
            } finally {
                setLoading(false);
            }
        }; if (id) load();
        }, [id]);

    return (
        <Container size="md" py="xl">
            <Group justify="space-between" mb="md">
                <Title>Detalle del Libro</Title>
                <Button variant="light" onClick={() => navigate(-1)}>Volver</Button>
            </Group>

            {loading && <Loader />}

            {error && <Alert color="red" mt="sm">{error}</Alert>}

            {!loading && !error && book && (
                <Stack gap="sm">
                    <Group justify="space-between">
                        <Title order={2}>{book.title}</Title>
                        <Badge color={book.isAvailable ? "green" : "gray"}>
                            {book.isAvailable ? "Disponible" : "No disponible"}
                        </Badge>
                    </Group>

                    <Text c="dimmed">de {book.author}</Text>

                    <Group gap="xs">
                        <Badge variant="light">Año: {book.publicationYear}</Badge>
                        <Badge variant="light">Idioma: {book.language}</Badge>
                        <Badge variant="light">Género: {book.genre}</Badge>
                        <Badge variant="light">{book.pages} págs</Badge>
                    </Group>
                </Stack>
            )}
        </Container>
    )
}