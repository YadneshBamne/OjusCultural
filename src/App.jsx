import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { usePlay } from "./contexts/Play";
import SubCardsPage from "./components/EventDetails";
import EventDetailPage from "./components/EventDetailPage";
import GameMap from "./components/Schedule";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyGallery from "./components/Gallery";
import EventRegistration from "./components/EventRegistration";
import ComingSoon from "./components/ComingSoon";
import ProtectedRoute from "./components/ProctectedRoutes";
import Schedule from "./components/Schedule";
import Teams from "./components/Teams"
import EventRegistration2 from "./components/EventRegistration2";
import CurtainReveal from "./components/Ghanekar";
import Ticket from "./components/Ticket";
import Login2 from "./components/Login2";
// import TicketQRGenerator from "./components/TicketQR";
function App() {
  const { play, end } = usePlay();

  return (
    <Router >
      <Routes>
        {/* Main page route */}
        <Route
          path="/"
          element={
            <>
              <Canvas>
                <color attach="background" args={["#ececec"]} />
                <ScrollControls
                  pages={play && !end ? 20 : 0}
                  damping={0.5}
                  style={{
                    top: "10px",
                    left: "0px",
                    bottom: "10px",
                    right: "10px",
                    width: "auto",
                    height: "auto",
                    animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
                    opacity: 0,
                  }}
                >
                  <Experience />
                </ScrollControls>
                <EffectComposer>
                  <Noise opacity={0.1} />
                </EffectComposer>
              </Canvas>
              <Overlay />
            </>
          }
        />
        {/* Sub-cards page route */}
        <Route path="/events/:category" element={<SubCardsPage />} />
        <Route path="/events/:category/:eventId" element={<EventDetailPage />} />
        <Route path="/ghanekar" element={<CurtainReveal />} />
        <Route path="/schedule" element={<GameMap />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/login2" element = {<Login2 />} />
        <Route path="/gallery" element={<MyGallery />} />
        <Route path="/register" element = {<EventRegistration />} />
        <Route path="/ghanekar" element = {<ComingSoon />} />
        <Route path="/schedule" element = {<Schedule />} />
        <Route path = "/team" element = {<Teams />}/>
        <Route path = "/register_latent" element = { < EventRegistration2 /> } />
        <Route path="/ticket17333345672129899234/:ticketId" element={<Ticket />} />
        {/* <Route path = "/ticket-qr" element = { <TicketQRGenerator /> }/> */}
                <Route element={<ProtectedRoute />}>
          <Route path="/register" element={<EventRegistration />} />

        </Route>
      </Routes>

    </Router>
  );
}

export default App;
