import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { Subheading, Surface } from 'react-native-paper'

import Api from '../api'
import { Book } from '../types'
import BookCard from '../components/BookCard'

type ParamList = {
  params: {
    authorId: number
  }
}

/**
 * @author Matthieu BACHELIER
 * @since 2021
 * @version 1.0
 */
export default function AuthorBooksScreen() {
  const route = useRoute<RouteProp<ParamList, 'params'>>()

  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    getBooks()
  }, [])

  const getBooks = async () => {
    const res = await Api.getBooksByAuthor(route.params.authorId)
    if (res) {
      setBooks(res)
    }
  }

  const renderBook = ({ item }: { item: Book }) => <BookCard book={item} reload={getBooks} />

  return (
    <Surface style={{ flex: 1 }}>
      <FlatList
        data={books}
        extraData={books}
        renderItem={renderBook}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<View style={{ marginBottom: 48 }} />}
        ListEmptyComponent={<Subheading style={{ alignSelf: 'center' }}>Aucun livre pour cet auteur</Subheading>}
      />
    </Surface>
  )
}
