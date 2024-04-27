import { Client } from '@stomp/stompjs';

import { useAppDispatch } from '@/Redux/hooks';

import contractsReducer from '../Redux/Slices/Contracts/contracts.reducer';

export const WebsocketProvider = () => {
  const dispatch = useAppDispatch();
  const client = new Client({
    brokerURL: 'ws://localhost:61616/ws',
    connectHeaders: {
      login: 'Anonymous',
    },
    onConnect() {
      client.subscribe('/topic/newContract', (m) => {
        const b = JSON.parse(m.body);
        dispatch(contractsReducer.actions.insert(b));
      });
    },
  });
  client.activate();
  return <></>;
};
