/**
 * @class CreateWebSocket
 */
class CreateWebSocket {

    constructor(url) {
        this.connect(url)
        this.myUrl = url
    }

    connect(url) {//连接服务器
        this.ws = new WebSocket(url)
        this.ws.onopen = (e) => {
            this.status = 'open'
            console.log("connection to server is opened")
            this.heartCheck()
            this.ws.send('succeed')
        }
    }

    // 向后台发送信息
    sendMessage(message) {
        this.ws.send(message)
    }

    async getMessage() {//异步获取数据
        this.lockReconnect = true
        this.messageList = '';
        await new Promise((resolve) => {
            this.ws.onmessage = (e) => {
                this.messageList = e.data
                resolve()
            }
        })
        console.log(this.messageList)
        return this.messageList
    }

    heartCheck() {//心跳
        this.pingPong = 'ping'
        this.pingInterval = setInterval(() => {
            if (this.ws.readyState === 1) {
                this.ws.send('ping')
            }
        }, 10000);
        this.pongInterval = setInterval(() => {
            if (this.pingPong === 'ping') {
                this.closeHandle('pingPong没有改为pong')
            }
            console.log('return the pong')
        }, 20000)
    }

    closeHandle(res) {
        if (this.status !== 'close') {
            console.log('断开，重连websocket', res)
            if (this.pongInterval !== undefined && this.pingInterval !== undefined) {
                clearInterval(this.pongInterval)
                clearInterval(this.pingInterval)
            }
            this.connect(this.myUrl)
        } else {
            console.log('websocket手动关闭了，或者正在连接')
        }
    }

    close() {//关闭连接
        clearInterval(this.pingInterval)
        clearInterval(this.pongInterval)
        this.ws.send('close')
        this.status = 'close'
        this.ws.onclose = e => {
            console.log('close')
        }
    }
}
export default CreateWebSocket;
