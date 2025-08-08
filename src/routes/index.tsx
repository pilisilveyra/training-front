import { createBrowserRouter } from 'react-router-dom'
import BooksList from '@/pages/BooksList'
import BookDetail from '@/pages/BookDetail'
import AddBook from '@/pages/AddBook'
import { ROUTES } from './paths'

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <BooksList />
    },
    {
        path: ROUTES.BOOK_DETAIL,
        element: <BookDetail />
    },
    {
        path: ROUTES.ADD_BOOK,
        element: <AddBook />
    },
])



