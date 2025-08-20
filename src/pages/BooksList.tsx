import { useEffect, useState } from "react";
import {
    Container, Title, Loader, Alert, SimpleGrid, TextInput, Button, Group
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import api from "@/lib/axios";
import type { Book } from "@/lib/types";
import BookCard from "@/components/BookCard";
import { useNavigate } from "react-router-dom";
import { normalizedList } from "@/lib/normalized";

export default function BookList(){
    const [books, setBooks] = useState<Book[]>([]);
    const [filtered, setFiltered] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await api.get("/books");
                const normalized = normalizedList(data);
                setBooks(normalized);
                setFiltered(normalized);
            } catch (e: any) {
                console.error("GET /books failed:", e);
                setError(e?.response?.data?.message ?? e.message ?? "Error al cargar libros");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []); // Solo cuando se monta el componente, por eso []


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
                    {filtered.map(b => <BookCard key={b.id} book={b} />)}
                </SimpleGrid>
            )}
        </Container>

    );


}