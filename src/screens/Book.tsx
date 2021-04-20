import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { ActivityIndicator, Button, Dialog, FAB, Portal, Snackbar, Surface, TextInput } from 'react-native-paper'

import Api from '../api'
import { Book } from '../types'
import BookCard from '../components/BookCard'

/**
 * @author Matthieu BACHELIER
 * @since 2021
 * @version 1.0
 */
export default function BookScreen() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  useEffect(() => {
    getBooks()
  }, [])

  const getBooks = async () => {
    const res = await Api.getBooks()
    if (res.content) {
      setBooks(res.content)
    } else {
      setMessage('Erreur réseau')
    }
    setLoading(false)
  }

  const addBook = () => {
    //
  }

  const renderBook = ({ item }: { item: Book }) => <BookCard book={item} reload={getBooks} />

  const renderAddDialog = () => (
    <Dialog visible={showAddDialog} onDismiss={() => setShowAddDialog(false)}>
      <Dialog.Title>Ajouter un livre</Dialog.Title>
      <Dialog.Content>
        <TextInput label="Titre" value="" />
        <TextInput label="ISBN" value="" />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={addBook}>Valider</Button>
      </Dialog.Actions>
    </Dialog>
  )

  return (
    <Surface style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignContent: 'center', height: '100%' }} />
      ) : (
        <>
          <FlatList
            data={books}
            extraData={books}
            renderItem={renderBook}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{ marginBottom: 48 }} />}
          />
          {message && (
            <Snackbar visible={message !== null} onDismiss={() => setMessage(null)} duration={Snackbar.DURATION_SHORT}>
              {message}
            </Snackbar>
          )}
        </>
      )}
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 16,
          bottom: 0
        }}
        icon="book-plus-multiple"
        onPress={() => setShowAddDialog(true)}
      />
      <Portal>{renderAddDialog()}</Portal>
    </Surface>
  )
}
