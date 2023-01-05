import ReactDom from 'react-dom';

function Modal({isOpen, onClose}) {
    if (!isOpen) return null;

  return ReactDom.createPortal(
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
            coming soon!
            <button className="close" onClick={onClose}>x</button>
        </div>
    </div>,
    document.getElementById('portal')
  )
}

export default Modal