import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BiCheck, BiTrash } from "react-icons/bi";

const ChangeStatusModal = ({ onChangeStatus, item, title }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChangeStatus = () => {
        onChangeStatus(item);
        handleClose();
    };
    return (
        <>
            <a className="btn-icon is-pointer" onClick={handleShow} title={title} >
                <BiCheck size={15} />
            </a>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className='px-3 border-0'>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <h4 className='text-center font-size-md my-5 medium'>Are you sure you want to Change Status?</h4>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="success" onClick={handleChangeStatus}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ChangeStatusModal