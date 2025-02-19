import React from 'react'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { BiCartAdd, BiEditAlt, BiTrash, BiShow, BiDownload, BiSave } from "react-icons/bi";
import checkButtonPermissions from './ButtonPermissions';
import ConfirmationModal from '../DeleteModal';
//import ActiveOrder from '@/components/Dashboard/ActiveOrder';
//import ActiveTickets from '@/components/Dashboard/ActiveTickets';
//import RecentNotifications from '@/components/Dashboard/RecentNotifications';
import { Button } from 'react-bootstrap';
import { MdOutlineFileDownload } from 'react-icons/md';
//import { LuClipboardEdit } from 'react-icons/lu';
import ChangeStatusModal from '../ChangeStatusModal';

const ButtonComp = ({ moduleSlug, actionSlug, Id, url, label, event, userName, customComp, orders, subcomplaintData, complaintData, title,disable }) => {

     var nUrl;
     const mountButton = {
          'add': () => {
               nUrl = url ? url : "/" + moduleSlug + "/" + actionSlug;
               return customComp == "addOrder" ?
                    <Link to={`/orders/add/${Id}`} className="btn-icon" title="Create New Order"><BiCartAdd /></Link> :
                    <Link className="btn btn-sm btn-primary" to={nUrl}>
                         + &nbsp; Add {label}{" "}
                    </Link>;
          },
          'edit': () => {
               nUrl = url ? url : "/" + moduleSlug + "/" + actionSlug + "/" + `${Id}`;
               return customComp == "updateSetting" ?
                    <Button type="button" variant='icon' title='Save' onClick={event} disabled={disable}><BiSave /></Button> :
                    customComp == "editOrder" ? <Link to={`/orders/edit/${Id}`} className="btn-icon" title="Update Existing Order"><LuClipboardEdit /></Link> :
                         <Link to={nUrl} className="btn-icon" title='Edit'><BiEditAlt size={15} /></Link>;
          },
          'delete': () => {
               return <ConfirmationModal onDelete={event} item={Id} userName={userName} />;
          },
          'changeStatus': () => {
               return <ChangeStatusModal onChangeStatus={event} item={Id} title={title} />;
          },
          'change_status': () => {
               return <ChangeStatusModal onChangeStatus={event} item={Id} title={title} />;
          },
          'download_csv': () => {
               return customComp == "downloadOrderCSV" ?
                    <button className="btn-icon border-0" title="Download CSV" onClick={event}><BiDownload /></button> :
                    <Button variant="outline-primary" size="sm" onClick={event}>
                         <MdOutlineFileDownload size={12} /> &nbsp; Download {label}
                    </Button>;
          },
          'list': () => {
               return customComp == "latestOrders" ? <ActiveOrder orders={orders} /> : customComp == "latestTickets" ? <ActiveTickets subcomplaintData={subcomplaintData} complaintData={complaintData} /> : null;
          },
          'view': () => {
               nUrl = url ? url : "/" + moduleSlug + "/" + actionSlug + "/" + `${Id}`;
               return <Link to={customComp == "DraftOrderReview" ? `/orders/review/${Id}` : nUrl} className="btn-icon" title='View'><BiShow size={15} /></Link>;
          },
          'default': () => {
               return <></>;
          }
     };

     let check = checkButtonPermissions(moduleSlug, actionSlug);

     return (
          <>
               {
                    check ? (mountButton[actionSlug] || mountButton['default'])() : ''
               }
          </>
     )
}
export default ButtonComp