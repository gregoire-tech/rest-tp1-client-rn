import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { ActivityIndicator, Button, Card, Dialog, FAB, Paragraph, Portal, Snackbar, Surface } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import AuthorDialog from './AuthorDialog'
import Api from '../api'
import { Author } from '../types'

/**
 * @author Matthieu BACHELIER
 * @since 2021
 * @version 1.0
 */
export default function AuthorScreen() {
  const navigation = useNavigation<any>()

  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const [author, setAuthor] = useState<Author | null>(null)

  useEffect(() => {
    getAuthors()
  }, [])

  const getAuthors = async () => {
    const res = await Api.getAuthors()
    if (res.content) {
      setAuthors(res.content)
    } else {
      setMessage('Erreur réseau')
    }
    setLoading(false)
  }

  const addAuthor = async (a: Author) => {
    try {
      const res = await Api.addAuthor(a)
      if (res) {
        getAuthors()
        setMessage('Nouvel auteur ajouté !')
      } else {
        setMessage("Erreur lors de l'ajout")
      }
    } catch (error) {
      setMessage("Erreur lors de l'ajout")
    }
    setAuthor(null)
    setShowAddDialog(false)
  }

  const editAuthor = async (a: Author) => {
    try {
      const res = await Api.editAuthor(a)
      if (res) {
        getAuthors()
        setMessage('Auteur modifié !')
      } else {
        setMessage('Erreur lors de la modification')
      }
    } catch (error) {
      setMessage('Erreur lors de la modification')
    }
    setAuthor(null)
    setShowEditDialog(false)
  }

  const deleteAuthor = async (a: Author) => {
    const res = await Api.deleteAuthor(a)
    if (res) {
      getAuthors()
    } else {
      setMessage('Erreur réseau')
    }
    setAuthor(null)
    setShowDeleteDialog(false)
  }

  const viewBooks = (author: Author) => {
    navigation.navigate('AuthorBooks', { authorId: author.id })
  }

  const renderAuthor = ({ item, index }: { item: Author; index: number }) => {
    return (
      <Card style={{ margin: 16, elevation: 4 }} onPress={() => viewBooks(item)}>
        <Card.Title title={item.firstname + ' ' + item.lastname} subtitle={`Né(e) en ${item.birth}`} />
        <Card.Cover source={{ uri: 'https://i.pravatar.cc/300?u=' + index }} />
        <Card.Actions style={{ flex: 1 }}>
          <Button
            style={{ flexGrow: 1 }}
            onPress={() => {
              setAuthor(item)
              setShowEditDialog(true)
            }}>
            Modifier
          </Button>
          <Button
            style={{ flexGrow: 1 }}
            onPress={() => {
              setAuthor(item)
              setShowDeleteDialog(true)
            }}>
            Supprimer
          </Button>
        </Card.Actions>
      </Card>
    )
  }

  return (
    <Surface>
      {loading ? (
        <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignContent: 'center', height: '100%' }} />
      ) : (
        <>
          <FlatList
            data={authors}
            extraData={authors}
            renderItem={renderAuthor}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{ marginBottom: 48 }} />}
          />
        </>
      )}
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 16,
          bottom: 0
        }}
        icon="account-plus"
        onPress={() => setShowAddDialog(true)}
      />
      {message && (
        <Snackbar visible={message !== null} onDismiss={() => setMessage(null)} duration={Snackbar.DURATION_SHORT}>
          {message}
        </Snackbar>
      )}
      <Portal>
        <AuthorDialog title="Ajouter un auteur" visible={showAddDialog} onDismiss={() => setShowAddDialog(false)} onSubmit={addAuthor} />
        {author && showEditDialog && (
          <AuthorDialog
            title="Modifier un auteur"
            author={author}
            visible={showEditDialog}
            onDismiss={() => {
              setShowEditDialog(false)
              setAuthor(null)
            }}
            onSubmit={editAuthor}
          />
        )}
        {author && (
          <Dialog visible={showDeleteDialog} onDismiss={() => setShowDeleteDialog(false)}>
            <Dialog.Title>Confirmer votre action</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Êtes-vous sûr de vouloir supprimer cet auteur ?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => deleteAuthor(author)}>Oui</Button>
            </Dialog.Actions>
          </Dialog>
        )}
      </Portal>
    </Surface>
  )
}
