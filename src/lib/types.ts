export interface Book {
    id: string
    title: string
    author: string
    year: number
    language: string
    genre: string
    isAvailable: boolean
    description?: string
    isbn?: string
}

export interface CreateBookData {
    title: string
    author: string
    year: number
    language: string
    genre: string
    description?: string
    isbn?: string
}

export interface UpdateBookData extends Partial<CreateBookData> {
    isAvailable?: boolean
}
