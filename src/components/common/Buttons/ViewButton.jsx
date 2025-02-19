import React from 'react'
import {NavLink } from 'react-router-dom'
import {BiShow} from "react-icons/bi";
import checkButtonShow from './ButtonPermissions';
const ViewButton = (props) => {
     let viewId  = props.viewId;
     let moduleSlug =    props.moduleSlug;
     let actionSlug =    props.actionSlug;
     let url=(props.url)?props.url: "/"+moduleSlug+"/"+actionSlug+"/"+viewId;
     let check= checkButtonShow(props.moduleSlug,props.actionSlug)
    return (
         <>
          {
            check?
            <NavLink to={url} className="btn-icon"><BiShow /></NavLink>
            :''
           }
         </>
    )
}
export default ViewButton
