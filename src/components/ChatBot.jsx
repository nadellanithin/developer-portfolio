import { useEffect, useState } from "react";

const ChatBot = () => {
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const showEvent = () => {
      const contactSection = document.querySelector(".Contact");
      const rect = contactSection.getBoundingClientRect();
      const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;

      const eventTriggered = localStorage.getItem("eventTriggered");

      if (isInView && !eventTriggered) {
        setShowMsg(true);
        setMsg("Don't miss the Explore section - click the nav link!");
        setTimeout(() => {
          setShowMsg(false);
          setMsg(null);
        }, 5000);
        localStorage.setItem("eventTriggered", "true");

        setTimeout(() => {
          localStorage.removeItem("eventTriggered");
          console.log("Event can now trigger again after 10 mins.");
        }, 600000);
      }
    };

    const handleBeforeUnload = () => {
      localStorage.removeItem("eventTriggered");
    };

    window.addEventListener("scroll", showEvent);

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("scroll", showEvent);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleClick = () => {
    setShowMsg(true);
    setMsg("ChatBot coming soon..");
    setTimeout(() => {
      setShowMsg(false);
      setMsg(null);
    }, 5000);
  };

  return (
    <div className="ChatBotContainer">
      {showMsg && msg && <em className="chatBot-dialog">{msg}</em>}
      <img
        src="src\assets\Baby-yoda.png"
        className="chat-bot"
        style={{ opacity: showMsg && msg ? "1" : "0.3" }}
        onClick={handleClick}
      />
    </div>
  );
};

export default ChatBot;
