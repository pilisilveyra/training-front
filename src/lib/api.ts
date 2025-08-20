import api from "@/lib/axios";
import { normalizeBook, normalizedList } from "@/lib/normalized";

import type {Book, CreateBookData} from "@/lib/types";


export async function toggleAvailability(id: string | number): Promise<Book> {
    const { data } = await api.put(`/books/${id}/available`); // o /api/books
    return normalizeBook(data);
}

export async function deleteBook(id: number | string): Promise<void> {
    await api.delete(`/books/${id}`);
}

export async function getBooks(): Promise<Book[]> {
    const { data } = await api.get("/books");
    return normalizedList(data);
}

export async function getBook(id: string | number): Promise<Book> {
    const { data } = await api.get(`/books/${id}`);
    return normalizeBook(data);
}

export async function createBook(payload: CreateBookData): Promise<Book> {
    const { data } = await api.post("/books", payload);
    return normalizeBook(data);
}