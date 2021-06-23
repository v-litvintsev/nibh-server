import WebSocket from 'ws'
import { getUpdatedOnlineUsers } from '../services/ws-service/getUpdatedOnlineUsers'
import { sendToClients } from '../services/ws-service/sendToClients'
import { EWsMessageTypes, TWsMessage } from './types'

export default class OnlineUsersHandler {
  private username: string = ''

  constructor(private wsServer: WebSocket.Server) {}

  onMessage = async (message: TWsMessage) => {
    switch (message.type) {
      case EWsMessageTypes.openMessage:
        this.username = message.username

        const response = await getUpdatedOnlineUsers(message.username, true)

        sendToClients(this.wsServer, response)
    }
  }

  private onCloseOrError = async () => {
    const response = await getUpdatedOnlineUsers(this.username, false)

    sendToClients(this.wsServer, response)
  }

  onClose = async (event: CloseEvent) => {
    await this.onCloseOrError()
  }

  onError = async (event: Event) => {
    await this.onCloseOrError()
  }
}