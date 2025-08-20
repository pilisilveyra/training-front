import { Container, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import BookForm from "@/components/BookForm";
import type { CreateBookData } from "@/lib/types";
import { useState } from "react";
import {createBook} from "@/lib/api.ts";


export default function AddBook() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values: CreateBookData) => {
        try {
            setLoading(true);
            const created = await createBook(values);

            notifications.show({
                color: "green",
                title: "Libro creado",
                message: `Se agregó "${created.title}" correctamente.`,
            });

            navigate("/"); // volver al listado
        } catch (e: any) {
            notifications.show({
                color: "red",
                title: "Error",
                message: e?.response?.data?.message ?? e.message ?? "No se pudo crear el libro",
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <Container size="sm" py="xl">
            <Title mb="md">Agregar Libro</Title>
            <BookForm loading={loading} onSubmit={handleSubmit} />
        </Container>
    );





}

