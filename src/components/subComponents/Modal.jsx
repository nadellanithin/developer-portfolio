import "../../Css/explore.css";

function Modal({ onClose, children }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
