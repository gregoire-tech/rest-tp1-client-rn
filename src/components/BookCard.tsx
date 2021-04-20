import React, { useState } from 'react'
import { Button, Card, Dialog, Paragraph, Portal, TextInput } from 'react-native-paper'

import Api from '../api'
import { Book } from '../types'

/**
 * @author Matthieu BACHELIER
 * @since 2021
 * @version 1.0
 */
export default function BookCard({ book, reload }: { book: Book; reload: () => void }) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const editBook = () => {
    setShowEditDialog(true)
  }

  const deleteBook = async () => {
    const deleted = Api.deleteBook(book.id)
    if (deleted) {
      reload()
    }
    setShowDeleteDialog(false)
  }

  const renderEditDialog = () => (
    <Dialog visible={showEditDialog} onDismiss={() => setShowEditDialog(false)}>
      <Dialog.Title>Modifier un livre</Dialog.Title>
      <Dialog.Content>
        <TextInput label="Titre" value="" />
        <TextInput label="ISBN" value="" />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={editBook}>Valider</Button>
      </Dialog.Actions>
    </Dialog>
  )

  const renderDeleteDialog = () => (
    <Dialog visible={showDeleteDialog} onDismiss={() => setShowDeleteDialog(false)}>
      <Dialog.Title>Confirmer votre action</Dialog.Title>
      <Dialog.Content>
        <Paragraph>Êtes-vous sûr de vouloir supprimer ce livre ?</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={deleteBook}>Oui</Button>
      </Dialog.Actions>
    </Dialog>
  )

  let authors = book?.authors?.map((a) => a.firstname + ' ' + a.lastname).join(', ')

  return (
    <>
      <Card style={{ margin: 16, elevation: 4 }}>
        <Card.Title title={book.title} subtitle={`Par ${authors}, édité en ${book.year}`} subtitleNumberOfLines={2} />
        <Card.Cover source={{ uri: 'https://source.unsplash.com/featured?book&index=' + book.isbn }} />
        <Card.Actions style={{ flex: 1 }}>
          <Button style={{ flexGrow: 1 }} onPress={() => setShowEditDialog(true)}>
            Modifier
          </Button>
          <Button style={{ flexGrow: 1 }} onPress={() => setShowDeleteDialog(true)}>
            Supprimer
          </Button>
        </Card.Actions>
      </Card>
      <Portal>
        {renderEditDialog()}
        {renderDeleteDialog()}
      </Portal>
    </>
  )
}
