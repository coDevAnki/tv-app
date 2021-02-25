import VideosProvider, { CustomizationProvider } from "../context";
import Footer from "./Footer";
import "./globalStyles.css";
import SidebarController from "./SidebarController";
import TV from "./TV";
import VideoList from "./videoList";

const App = () => {
  return (
    <VideosProvider>
      <CustomizationProvider>
        <SidebarController />
        <TV />
      </CustomizationProvider>
      <VideoList />
      <Footer />
    </VideosProvider>
  );
};

export default App;
