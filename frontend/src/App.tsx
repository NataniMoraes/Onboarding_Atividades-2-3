import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { KanbanBoard } from "./components/KanbanBoard";


function App() {
  return (
    <MantineProvider>
      <Notifications />
      <KanbanBoard />
    </MantineProvider>
  );
}

export default App;