import React from 'react'
import { Button } from "react-bootstrap";
import checkButtonShow from './ButtonPermissions';
const DownloadCsvButton = (props) => {
    let moduleSlug =    props.moduleSlug;
    let actionSlug =    props.actionSlug;
    let check= checkButtonShow(props.moduleSlug,props.actionSlug)

    return (
         <>
          {
            check?
             <Button onClick={props.handleClickCsvData} variant="outline-primary" size="sm" >Download CSV</Button>
            :''
           }
         </>
      
    )
}
export default DownloadCsvButton

