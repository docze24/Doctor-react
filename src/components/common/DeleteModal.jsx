import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BiEditAlt,BiTrash } from "react-icons/bi";

function ConfirmationModal({ onDelete, item,userName }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    onDelete(item);
    handleClose();
  };

  return (
    <>
      <a className="btn-icon is-pointer" onClick={handleShow} >
        <BiTrash size={15}/>
      </a>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title >Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className="d-flex flex-column text-center">
          <span className='h5'>Are you sure you want to delete?</span>
          {/* {
            userName ? <span className='h6 mt-2'>User&nbsp;:&nbsp;{userName}</span> :""
          } */}
          </div>
          </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
