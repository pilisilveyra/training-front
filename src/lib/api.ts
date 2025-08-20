import api from "@/lib/axios";
import { normalizeBook } from "@/lib/normalized";
import type { Book } from "@/lib/types";

export async function getBook(id: string | number): Promise<Book> {
    const { data } = await api.get(`/books/${id}`);           // o /api/books
    return normalizeBook(data);
}

export async function toggleAvailability(id: string | number): Promise<Book> {
    const { data } = await api.put(`/books/${id}/available`); // o /api/books
    return normalizeBook(data);
}