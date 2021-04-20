import Config from 'react-native-config'
import ky from 'ky'

import { GetAuthorsResponse, GetBooksResponse, AddAuthorRequest, Author, Book } from './types'

const k = ky.create({
  prefixUrl: Config.API_URL,
  throwHttpErrors: false,
  timeout: 3000
})

class ApiKy {
  private api: typeof ky

  constructor() {
    this.api = k
  }

  private get = (path: string, options?: object) => this.api.get(path, options)
  private post = (path: string, options?: object) => this.api.post(path, options)
  private put = (path: string, options?: object) => this.api.put(path, options)
  private delete = (path: string, options?: object) => this.api.delete(path, options)

  getAuthors = (): Promise<GetAuthorsResponse> => this.get('author').json<GetAuthorsResponse>()
  getBooksByAuthor = (id: number): Promise<Book[]> => this.get(`author/${id}/book`).json<Book[]>()
  addAuthor = (data: AddAuthorRequest): Promise<boolean> => this.post('author', { json: data }).json()
  editAuthor = (data: Author): Promise<boolean> => this.put(`author`, { json: data }).json()
  deleteAuthor = (data: Author): Promise<boolean> => this.delete(`author/${data.id}`, {}).json<boolean>()

  getBooks = (): Promise<GetBooksResponse> => this.get('book').json<GetBooksResponse>()
  deleteBook = (id: number): Promise<boolean> => this.delete(`book/${id}`, {}).json<boolean>()
}

const Api = new ApiKy()

export default Api
