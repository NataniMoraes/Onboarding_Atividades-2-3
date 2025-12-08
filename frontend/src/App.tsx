import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from '@mantine/modals'

import { KanbanBoard } from "./components/KanbanBoard";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";




function App() {
  return (
    <MantineProvider>
       <ModalsProvider>
        <Notifications />
        <KanbanBoard />
       </ModalsProvider>      
    </MantineProvider>
  );
}

export default App;