export interface Author {
  id: number
  alias: string
  birth: number
  firstname: string
  lastname: string
}

export interface Book {
  id: number
  title: string
  year: number
  isbn: string
  authors: Author[]
}

export interface GetAuthorsResponse {
  content: Author[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export interface GetBooksResponse {
  content: Book[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export interface AddAuthorRequest {}
