import { ElectronWindow } from './interface/electron'

declare const window: ElectronWindow

export const App = () => {
  return <>
        <h1>Hello React</h1>
      <button onClick={() => {
        window.api.notification({message: 'My custom Notification', chat: 'chat'});
      }}>Click me</button>
  </>
}

