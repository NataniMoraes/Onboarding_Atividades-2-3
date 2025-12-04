import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";


function App() {
  return (
    <MantineProvider>
      <Notifications />
      <div style={{ padding: '20px' }}>
        <h1>Sistema de Leads - Kanban</h1>
      </div>
    </MantineProvider>
  );
}

export default App;