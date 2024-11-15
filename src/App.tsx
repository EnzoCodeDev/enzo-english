import { CustomProvider } from "rsuite";
import { Music } from "./pages/music/Music";
import esES from "rsuite/locales/es_ES";

function App() {
  return (
    <CustomProvider theme="dark" locale={esES}>
      <div className="w-screen h-screen">
        <Music />
      </div>
    </CustomProvider>
  );
}

export default App;
