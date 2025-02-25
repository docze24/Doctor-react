
import { useContext } from 'react'
import EditRoleForm from '@/components/roles/editRole'
import Footer from '@/components/shared/Footer'
import {  FiArrowLeft } from 'react-icons/fi'
import { LanguageContext } from '../../contentApi/LanguageContext'; 

const EditRole = () => {
     const {t}=useContext(LanguageContext);
    return (
        <>
            <div className="page-header">
                        <div className="page-header-left d-flex align-items-center">
                            <div className="page-header-title d-flex gap-2">
                                <FiArrowLeft size={16} className="me-2 mt-1" />
                                <h5 className="m-b-10 text-capitalize h4">  Roles Managment </h5> 
                                <h5 className="m-b-10 text-capitalize h4">  Edit Role</h5>  
                            </div>
                        </div>
                        
                    </div>  
            <div className='main-content'>
                <div className='row'>
                    <EditRoleForm />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default EditRole;








// import React, { useEffect, useState } from "react";
// import { useForm } from 'react-hook-form';
// import { BiCaretLeft, BiInfoCircle } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import {Link} from 'react-router-dom'
// import { Accordion, Card, Button, Row, Col, Form } from 'react-bootstrap';
// //import { notifyError, notifySuccess } from "../common/Toaster";
// import NotificationModal from "../../components/common/NotificationModal";
// // import { updateRole, getDetail } from "@/api/roles";




// export default function EditRole({ roleId }) {

    

//     console.log('roleId', roleId);
//     const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
//     const [show, setShow] = useState(false);
//     const [notification, setNotification] = useState({ type: "", message: "" });
//     const [existPermissions, setExistPermissions] = useState([]);
//     const [userRole, setUserRole] = useState({});
//     const [controllerList, setControllerList] = useState([]);
//     const [isSubmit, setIsSubmit] = useState(false);
//     const [error, setError] = useState({});
//     const [checkedRole, setcheckedRole] = useState({});
//     const [isCRM, setIsCRM] = useState(0);

//     const navigate = useNavigate();
//     const errorOptions = {
//         "role_type_name": { required: "Role name is required" },
//     };
//     useEffect(() => {

//         async function fetchRoleData() {
//             try {
//                 const existingRole = await getDetail(roleId);
//                 console.log('existingRole', existingRole);
//                 if ((existingRole?.status == 'success' && existingRole?.data) || existPermissionTemp) {
//                     let defaultValues = {};
//                     defaultValues = existingRole?.data.roleData;
//                     console.log("default values...................", defaultValues)
//                     reset({ ...defaultValues });
//                     setIsCRM(existingRole.data.roleData.isCRMTeam);
//                     var existPermissionTemp = existingRole.data.roleData.permissions;
//                     console.log("default values...................", existPermissionTemp)

//                     existPermissionTemp = JSON.parse(existPermissionTemp);
//                 } else {
//                     existPermissionTemp = {};
//                 }
//                 var controllerData = existingRole.data.controllerList.rows;

//                 console.log('existPermissionTemp', existPermissionTemp);


//                 var filterControlerList = [];
//                 controllerData.map(async (detail) => {
//                     //detail.isChecked = ischecked;
//                     existPermissionTemp.hasOwnProperty(detail.id)
//                     if (existPermissionTemp.hasOwnProperty(detail.id)) {
//                         detail.isChecked = true;

//                         let action = detail.ModulesActions.map((ac) => {
//                             let existActionArr = existPermissionTemp[detail.id];
//                             if (existActionArr.includes(ac.id)) {
//                                 ac.isChecked = true;
//                             } else {
//                                 ac.isChecked = false;
//                             }
//                         })
//                     }
//                     else {
//                         detail.isChecked = false;
//                     }

//                     filterControlerList.push(detail)
//                 })

//                 console.log('filterControlerList', filterControlerList);


//                 setUserRole(existingRole.data.roleData)
//                 //setExistPermissions(existPermissionTemp)  
//                 setControllerList(filterControlerList)
//                 // setRoleName(existingRole.data.roleData.role_type_name)


//             } catch (error) {
//                 console.error("Error fetching role data:", error);
//             }
//         }
//         fetchRoleData();
//     }, [roleId, setValue]);

//     const closeNotification = () => {
//         setShow(false);
//         setNotification({ type: "", message: "" });
//     };

//     /********* Check Uncheck All Module**************** */
//     /***************************************************/
//     const handleChangeSelectAll = async (e) => {
//         let checkdata = await changeSelectAllCheckbox(e);
//         setControllerList(checkdata)
//         //setIsSubmit(false)
//         // setError({})

//     }
//     const changeSelectAllCheckbox = (e) => {
//         let details = controllerList;
//         let ischecked = e.target.checked;
//         return Promise.all(
//             details.map(async (detail) => {
//                 detail.isChecked = ischecked;
//                 if (ischecked) {
//                     detail.isCheckedCount = (detail.ModulesActions).length
//                 }
//                 else {
//                     detail.isCheckedCount = 0;
//                 }

//                 let action = detail.ModulesActions.map((ac) => {
//                     ac.isChecked = ischecked;
//                 })
//                 return detail;
//             })
//         )
//     }

//     /********* Check Uncheck All Action of Module************ */
//     /************************************************ */
//     const handleChangeParent = async (e) => {
//         let details = controllerList;
//         const attributeval = e.target.value;
//         let data = await changeCheckStatus(details, e)
//         setControllerList(data)
//         //setTest("Now Click")
//         //setIsSubmit(false)
//         //setError({})

//     }

//     const changeCheckStatus = (details, e) => {
//         //let detail = users;
//         const attributeval = e.target.value;
//         return Promise.all(
//             details.map(async (detail) => {
//                 if (attributeval == detail.id) {
//                     (detail.isChecked = e.target.checked)
//                 }

//                 let action = detail.ModulesActions.map((ac) => {

//                     if (attributeval == ac.moduleId) {
//                         console.log("if condition call " + ac.id, attributeval, ac.moduleId, e.target.checked)
//                         ac.isChecked = e.target.checked
//                         //ac.id = 20
//                     }
//                     //return ac;
//                 })

//                 return detail;


//             })

//         )

//     }
//     /*****************Check Uncheck  Action **************** */
//     /************************************************** */

//     const handleChangeChild = async (e) => {
//         let details = controllerList;
//         const attributeval = e.target.value;
//         let data = await changeChildCheckStatus(details, e)
//         setControllerList(data)
//         //setIsSubmit(false)
//         //setError({})


//     }
//     const changeChildCheckStatus = (details, e) => {
//         console.log("change child CheckStatus calling %%%%%5%%%", e.target.checked)
//         //let detail = users;
//         const attributeval = e.target.value;
//         const parent_id = e.target.getAttribute('parent_id');
//         const parentlength = e.target.getAttribute('parentlength');

//         return Promise.all(
//             details.map(async (detail) => {

//                 let count = detail.isCheckedCount;
//                 // console.log("Count check value",count)
//                 let action = detail.ModulesActions.map((ac) => {

//                     if (parent_id == ac.moduleId) {
//                         //console.log("parent id condition  running")
//                         if (attributeval == ac.id) {
//                             // console.log("if condition call "+ac.id,attributeval,ac.moduleId,e.target.checked)
//                             ac.isChecked = e.target.checked;
//                             if (e.target.checked == true) {
//                                 //console.log("true condition running @@@@@@@@@@@@",detail.isCheckedCount)
//                                 count = count + 1;
//                                 //console.log("#################################",count)
//                                 detail.isCheckedCount = count;
//                             }
//                             else {
//                                 count = count - 1;
//                                 detail.isCheckedCount = count;
//                                 detail.isChecked = false;
//                             }
//                         }

//                         //console.log(count,"Here check all check conditions",parentlength)
//                         if (count == parentlength) {
//                             //console.log("here parentlenth condition equal")
//                             detail.isChecked = true;
//                             //console.log(detail,"Data  found @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
//                         }
//                         //ac.id = 20
//                     }
//                     //return ac;
//                 })

//                 return detail;


//             })

//         )

//     }
//     /*****************END END******************** */


//     const getCheckdRoles = async (details) => {
//         let checkedRoleLocal = {};
//         for (let x in details) {
//             let ac = details[x].ModulesActions;
//             for (let y in ac) {
//                 let isCheckedcurrent = ac[y].isChecked;
//                 if (isCheckedcurrent == true) {
//                     if (checkedRoleLocal[ac[y].moduleId] === undefined) {
//                         checkedRoleLocal = { ...checkedRoleLocal, [ac[y].moduleId]: [ac[y].id] };
//                     }
//                     else {
//                         var as = checkedRoleLocal[ac[y].moduleId];
//                         if (as.indexOf(ac[y].id) < 0) {
//                             as.push(ac[y].id);
//                         }
//                     }
//                 }
//                 console.log("Else conditions ", checkedRoleLocal)
//             }
//         }
//         return checkedRoleLocal;


//     }

//     const onSubmit = async (data) => {
//         //e.preventDefault()
//         setShow(true);
//         let role_type_name = data.role_type_name;
//         let details = controllerList;
//         let checkdData1 = await getCheckdRoles(details);
//         //setcheckedRole(checkdData1)
//         if (Object.keys(error).length === 0) {
//             try {
//                 const data = {
//                     "roleId": roleId,
//                     "role_type_name": role_type_name,
//                     "permissions": JSON.stringify(checkdData1),
//                     "isCRMTeam": isCRM,
//                 };


//                 console.log('data+++++++++++++++', data);
//                 const updatedRes = await updateRole(data);
//                 if (updatedRes?.status == 'success') {
//                     setShow(true);
//                     notifySuccess(updatedRes?.message);
//                     setTimeout(() => {
//                         navigate("/roles");
//                     }, 2000);
//                 } else {
//                     setShow(true);
//                     notifyError(updatedRes?.message);
//                     setTimeout(() => {
//                         setShow(false);
//                     }, 2000);
//                 }
//             } catch (error) {
//                 setShow(true);
//                 notifyError("Error : " + error.message);
//             }
//         }
//     }

//     return (
//         <section className="d-flex flex-column h-auto">
//             <NotificationModal data={notification} show={show} />
//             <div className="bg-white p-3 d-flex align-items-center gap-3 mb-2 actionBar listing-cards">
//                 <Link href="/roles" className="btn-icon">
//                     <BiCaretLeft />
//                 </Link>
//                 <label className="medium mb-0 me-3">Edit Role</label>
//             </div>
//             <section className="flex-fill">
//                 <div className="bg-white listing-cards">
//                     <div className="p-4">
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <Row className="mb-3">
//                                 <Col md={6}>
//                                     <Form.Group className="mb-md-0 mb-2">
//                                         <Form.Control type="text" name="role_type_name" {...register('role_type_name', errorOptions.role_type_name)} id="role_type_name" placeholder="Enter role name"/>
//                                         {errors.role_type_name && <span className="form-error"><BiInfoCircle />Plant is required</span>}
//                                     </Form.Group>
//                                 </Col>
//                                 <Col md={6} className="d-flex justify-content-end gap-4 pt-2">
//                                     <Form.Check
//                                         type="checkbox"
//                                         name="checkCRM"
//                                         id="checkCRM"
//                                         value={isCRM}
//                                         onChange={(e) => setIsCRM(e.target.checked ? 1 : 0)}
//                                         checked={isCRM === 1}
//                                         label="Assign this role to CRM team"
//                                     />
//                                     <Form.Check
//                                         type="checkbox" 
//                                         id="SelectAllRole" 
//                                         onChange={handleChangeSelectAll} 
//                                         name="check-all"
//                                         label="Select All"
//                                     />

//                                 </Col>
//                             </Row>
//                             {/* <Row className="row-gap"> */}
//                             {/* <div className="form-check btn-checkbox mb-2 d-flex align-items-end justify-content-end">
//                                 <input type="checkbox" id="SelectAllRole" onChange={handleChangeSelectAll} name="check-all" className="form-check-input" />
//                                 <label htmlFor="SelectAllRole" className='medium ms-2'>Select All</label>
//                             </div> */}
//                             <Accordion defaultActiveKey="0">
//                                 <Card eventKey="1" className="rounded-0">
//                                     {(controllerList.length) > 0 ?
//                                         controllerList.map((user) => {
//                                             let trdy = user.isChecked
//                                             return (
//                                                 <>
//                                                     <Accordion.Item eventKey={user.id}>                                            
//                                                             <div className="form-check btn-checkbox mb-0">
//                                                                 <Accordion.Header>
//                                                                     <input className="form-check-input" type="checkbox"
//                                                                         key={user.id}
//                                                                         name={user.moduleName}
//                                                                         checkedClass={user.moduleName}
//                                                                         parentName="selectAll"
//                                                                         value={user.id}
//                                                                         checked={trdy}
//                                                                         onClick={handleChangeParent}
//                                                                         id={`headCheckBox${user.id}`}
//                                                                     />
//                                                                     <label className="form-check-label fw-bold" for={`headCheckBox${user.id}`}>
//                                                                         {user.moduleLevel}
//                                                                     </label>
//                                                                 </Accordion.Header>
//                                                             </div>
                                                
//                                                         <Accordion.Body className="p-4">                                                      
//                                                             <Row>
//                                                                 {user.ModulesActions.map((ele, index) => {
//                                                                     var length = (user.ModulesActions).length
//                                                                     return (<Col xs={6} md={4} lg={3} key={index}>
//                                                                         <div className="form-check btn-checkbox">
//                                                                             <input className="{user.moduleName} form-check-input" type="checkbox"
//                                                                                 value={ele.id}
//                                                                                 parent_id={user.id}
//                                                                                 parentName="selectSingle nod"
//                                                                                 parentlength={length}
//                                                                                 name={`action[${user.id}][]`} id={ele.id}
//                                                                                 checked={ele.isChecked}
//                                                                                 onChange={handleChangeChild}
//                                                                             />

//                                                                             <label className="form-check-label" for={ele.id}>
//                                                                                 {ele.actionLevel}

//                                                                             </label>
//                                                                         </div>
//                                                                     </Col>)
//                                                                 })
//                                                                 }
//                                                             </Row>
//                                                         </Accordion.Body>
//                                                     </Accordion.Item>
//                                                 </>
//                                             )
//                                         })
//                                         : ''
//                                     }

//                                 </Card>

//                             </Accordion>
//                             {/* </Row> */}
//                             <div className="d-flex text-center justify-content-center pt-5 m-0">
//                                 <Button variant="primary btn-md-width" type="submit" className={show ? `disabled` : ``}>{show ? <div className="loader-spinner"></div> : "Submit"}</Button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </section>
//         </section >
//     );
// }
