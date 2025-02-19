import React, { useEffect, useState } from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import { BiSolidErrorCircle, BiSolidCheckCircle } from "react-icons/bi";
import { useRouter } from 'next/router';
import moment from 'moment';
import { notifyError } from './Toaster';
import { getOrderBasicDetails } from '@/lib/api/order';

const DynamicLoader = ({ show, handleClose, isSuccess, isLoading, data, message, button, orderId }) => {
    // console.log("checigng orderidsssss", data);
    // const orderId = data[0]?.id;
    // console.log("checking irder", orderId);
    const router = useRouter();

    const [orders, setOrders] = useState([]);
    // console.log("ordersordersorders", orders);
    const getBasicDetails = async () => {
        try {
            const response = await getOrderBasicDetails(orderId);
            if (response?.status === "success") {
                setOrders(response.data.docs);
            } else {
                notifyError(response?.message);
            }
        } catch (error) {
            notifyError("Error : " + error.message);
        }
    };
    useEffect(() => {
        if (orderId && orderId !== undefined) {
            getBasicDetails();
        }
    }, [orderId]);


    return (
        <Modal
            show={show} onHide={handleClose}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                {isLoading && (
                    <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                        <div className="upper-part d-flex flex-column text-center py-4">
                            <div className="loader-spinner mx-auto mb-3"></div>
                            <h4 className="mb-0 medium">Processing Request</h4>
                            <p className="mb-0 medium opacity-50">Please wait while we process.</p>                          
                        </div>
                    </div> 
                )}
                {(!isLoading && isSuccess) && (
                    <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                        <div className="upper-part d-flex flex-column py-4 text-center">
                            <span className="mb-3"><BiSolidCheckCircle className="text-success" size={90} /></span>
                            <h4 className="mb-0 medium">{message ?? "Processed Successfully "}</h4>
                            {
                                data && (
                                    <div className="text-center opacity-50 medium">
                                        <p className="mb-0">Your Order has been placed successfully.</p>
                                        <p className="mb-0">Our sales team will get back to you within 24 hrs.</p>
                                    </div>
                                 )
                            }
                        </div>
                        {
                            data && (
                                <div className="p-2 border w-100 rounded-2">
                                    <div className="upper-section d-flex justify-content-between align-items-center py-2">
                                        <div className="d-flex align-items-center gap-2 p-2">
                                        <span className="h5 text-black mb-0 text-capitalize">Order On : {data[0]?.createdAt ? moment(data[0]?.createdAt).format("DD MMM, YYYY") : "NA"}</span>
                                        <Badge pill bg="default">Order ID : {data[0]?.orderCode ?? "NA"}</Badge>
                                        </div>
                                    </div>
                                    <div className="lower-section d-flex justify-content-between align-items-center text-center">
                                        <div className="d-flex align-items-center gap-5">
                                            <div className="products d-flex flex-column justify-content-center">
                                                <h5 className="mb-0">{orders.map((item) => item.totalProduct)}</h5>
                                                <small className="text-nowrap text-muted">Total Products :</small>
                                            </div>
                                            <div className="d-flex flex-column">
                                                {orders.map((item) =>
                                                    Object.keys(item.details).map((type, index) => (
                                                        <span key={index} className="text-muted text-nowrap">{`${item.details[type].typeName} ${item.details[type].totalSku} (${item.details[type].qty})`}</span>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                        <div className="d-flex gap-5">
                                            <div className="products d-flex flex-column justify-content-center">
                                                <h5 className="mb-0">{orders.map((item) => item.totalItem)}</h5>
                                                <small className="text-nowrap">Total Tones :</small>
                                            </div>
                                            <div className="products d-flex flex-column justify-content-center">
                                                <h5 className="mb-0r">NA</h5>
                                                <small className="text-nowrap">Delivered Qty :</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             )
                        } 
                    </div>
               )}
               {(!isLoading && !isSuccess) && (
                    <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                        <div className="upper-part d-flex flex-column py-4 text-center">
                            <span className="mb-3"><BiSolidErrorCircle className="text-primary" size={90} /></span>
                            <h4 className="mb-0 medium">Some error occurred !</h4>
                            <p className="mb-0 opacity-50 medium">Server Timeout ! Error Code : 500</p>                           
                        </div>                        
                    </div>
                )}
            </Modal.Body>
            {
                (!isLoading && button) && (                    
                    <Modal.Footer className="justify-content-center border-0">
                        <Button variant="outline-secondary" onClick={() => router.push(button?.secondary)}>
                            View Order
                        </Button>
                        <Button variant="primary" onClick={() => router.push(button?.primary)}>
                            Go to Dashboard
                        </Button>
                    </Modal.Footer>
                )
            }
        </Modal>
    );
};

export default DynamicLoader;
