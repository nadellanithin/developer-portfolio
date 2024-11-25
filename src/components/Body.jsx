import "../Css/components.css";
import About from "./subComponents/About";
import ChatBot from "./ChatBot";
import Contact from "./subComponents/Contact";
import Experience from "./subComponents/Experience";
import Home from "./subComponents/Home";
import Skills from "./subComponents/Skills";

function Main() {
  return (
    <div className="Main">
      <Home />
      <About />
      <Skills />
      <Experience />
      <Contact />
      <ChatBot />
    </div>
  );
}

export default Main;
