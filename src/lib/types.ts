export interface Book {
    id: number;
    title: string;
    author: string;
    publicationYear: number;
    language: string;
    genre: string;
    isAvailable: boolean;
    pages: number;
}

export type CreateBookData = Omit<Book, 'id'>;

export type UpdateBookData = Partial<CreateBookData> & {
    isAvailable?: boolean;
};

export type PropsForm = {
    initial?: Partial<CreateBookData>;
    loading?: boolean;
    onSubmit: (values: CreateBookData) => void;
};