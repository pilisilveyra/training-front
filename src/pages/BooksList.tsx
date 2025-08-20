import { useEffect, useState, useCallback } from "react";
import {
    Container, Title, Loader, Alert, SimpleGrid, TextInput, Button, Group
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { Book } from "@/lib/types";
import BookCard from "@/components/BookCard";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import {getBooks} from "@/lib/api.ts";


export default function BookList(){
    const [books, setBooks] = useState<Book[]>([]);
    const [filtered, setFiltered] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();


    const loadBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const list = await getBooks();
            setBooks(list);
            setFiltered(list);
        } catch (e: any) {
            setError(e?.response?.data?.message ?? e?.message ?? "Error inesperado");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);


    useEffect(() => {
        const q = query.trim().toLowerCase();
        if (!q) setFiltered(books);
        setFiltered(
            books.filter(b=>[b.title, b.author, b.genre, b.language].some(v => v?.toLowerCase().includes(q))
            || String(b.publicationYear).includes(q)
            )
        );
        }, [query, books] // Cuando queries o books cambia
    );

    const handleDeletedLocal = (id: number) => {
        setBooks((prev) => prev.filter((b) => b.id !== id));
        setFiltered((prev) => prev.filter((b) => b.id !== id));
        notifications.show({
            color: "green",
            title: "Libro eliminado",
            message: "La lista fue actualizada.",
        });
    };

    return (
        <Container size="lg" py="xl">
            <Group justify="space-between" mb="md">
                <Title>Libros</Title>
                <Button onClick={() => navigate("/add")}>Agregar libro</Button>
            </Group>


            <TextInput
                placeholder="Buscar por título, autor, género, idioma o año…"
                leftSection={<IconSearch size={16} />}
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
                mb="md"
            />

            {loading && <Loader />}
            {error && <Alert color="red" mt="sm">{error}</Alert>}

            {!loading && !error && (
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md" mt="md">
                    {filtered.map((b) => (
                        <BookCard
                            key={b.id}
                            book={b}
                            onDeleted={() => handleDeletedLocal(b.id)}
                        />
                    ))}
                </SimpleGrid>
            )}
        </Container>

    );


}