import {type Book} from "@/lib/types";

type RawBook = Partial<Book> & {
    available?: boolean;
    isAvailable?: boolean;
    publicationYear?: number;
};

export function normalizeBook(rb: RawBook): Book {
    return {
        id: Number(rb.id),
        title: rb.title ?? "",
        author: rb.author ?? "",
        publicationYear: Number(rb.publicationYear ?? 0),
        language: rb.language ?? "",
        genre: rb.genre ?? "",
        pages: Number(rb.pages ?? 0),
        isAvailable: rb.isAvailable ?? rb.available ?? false,
    };
}

export function normalizedList(list: RawBook[]): Book[]{
    return (list ?? []).map(normalizeBook);
}
