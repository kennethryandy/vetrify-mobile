import React from 'react'
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

const DialogAlert = ({ visible, hideDialog, content, accept, loading = false }) => {
	return (
		<Portal>
			<Dialog visible={visible} onDismiss={hideDialog}>
				<Dialog.Content>
					<Paragraph>{content}</Paragraph>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={hideDialog} disabled={loading}>Cancel</Button>
					<Button onPress={accept} disabled={loading}>Ok</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	)
}

export default DialogAlert