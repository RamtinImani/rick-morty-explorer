import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ title, onOpen, open, children }) {
  if (!open) return null;

  return (
    <>
      <div onClick={() => onOpen(false)} className="modal__backdrop">
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">
            <h2 className="modal__header--title">{title}</h2>
            <button onClick={() => onOpen(false)}>
              <XCircleIcon className="icon modal__header--close" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
