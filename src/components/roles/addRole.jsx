import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { BiCaretLeft, BiInfoCircle } from "react-icons/bi";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { Accordion, Card, Row, Col, Form, Button } from 'react-bootstrap';

import { Link } from "react-router-dom";

import { roleApi } from '../../api';
import topTost from '@/utils/topTost';

export default function AddRoleForm() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [show, setShow] = useState(false);
    const [roles, setRoles] = useState([]);

    const [loading, setLoading] = useState(false);
    
    const [isCRM, setIsCRM] = useState(0);
    const [isAccordionVisible, setIsAccordionVisible] = useState(true); 
    const navigate = useNavigate();
    const { lang } = useParams();

    const [controllerList, setControllerList] = useState([]);

    // const [error, setError] = useState({});

    const errorOptions = {
        "role_type_name": { required: "Role name is required" },
        "role_type_slug": { required: "Role type is required" }
    };

    const fetchAllRoleData = async () => {


    try {
            var requestParms=null;
            const response = await roleApi.getModuleAction(requestParms);
            if (response?.data?.status === 200) {
                console.log('response.data',response?.data?.data.users);
                let resdata=response?.data?.data;


                console.log('resdata',resdata);
                setControllerList(resdata);
                setRoles(resdata);
            } else {
                topTost(response?.data?.message, "error |||||||||||");
            }
    
        } catch (error) {
          
          topTost(error?.message, "error");
        } finally {
          setLoading(false);
        }


   
    // setRoles(dummyData.roles);
    // setControllerList(dummyData.roles)

    }
    useEffect(() => {

        console.log('fetchAllRoleData');
        fetchAllRoleData();
    }, []);

    /********* Check Uncheck All Module**************** */
    /***************************************************/
    const handleChangeSelectAll = async (e) => {
        let checkdata = await changeSelectAllCheckbox(e);
        setControllerList(checkdata);
    }
    const changeSelectAllCheckbox = (e) => {
        let details = controllerList;
        console.log("details", details);
        let ischecked = e.target.checked;
        console.log("ischecked", ischecked);
        return Promise.all(
            details.map(async (detail) => {
                detail.isChecked = ischecked;
                if (ischecked) { 	
                    detail.isCheckedCount = (detail.moduleActions).length
                }
                else {
                    detail.isCheckedCount = 0;
                }

                let action = detail.moduleActions.map((ac) => {
                    ac.isChecked = ischecked;
                })
                return detail;
            })
        )
    }

    /********* Check Uncheck All Action of Module************ */
    /************************************************ */
    const handleChangeParent = async (e) => {
        let details = controllerList;
        console.log('details',details);
        const attributLeval = e.target.value;
        let data = await changeCheckStatus(details, e)
        setControllerList(data)
    }

    const changeCheckStatus = (details, e) => {
        const attributLeval = e.target.value;
        console.log("attributLeval", attributLeval);
        console.log('details22222',details);
        return Promise.all(
            details.map(async (detail) => {
                if (attributLeval == detail.id) {
                    console.log("detail", detail);
                    console.log("detail.id", detail.id);
                    (detail.isChecked = e.target.checked)
                }

                console.log("detail.moduleActions", detail.moduleActions);
                 detail.moduleActions.map((ac) => {
                  console.log("detail.moduleActions 111", attributLeval +'=='+ ac.moduleId);
                    if (attributLeval == ac.moduleId) {
                        console.log("if condition call " + ac.id, attributLeval, ac.moduleId, e.target.checked)
                        ac.isChecked = e.target.checked
                    }
                })

                console.log(" detail Action", detail);

                return detail;
            })
        )
    }

    
    /*****************Check Uncheck  Action **************** */
    /************************************************** */

    const handleChangeChild = async (e) => {
        let details = controllerList;
        const attributLeval = e.target.value;
        let data = await changeChildCheckStatus(details, e)
        setControllerList(data)
    }
    const changeChildCheckStatus = (details, e) => {
        console.log("change child CheckStatus calling %%%%%5%%%", e.target.checked)
        const attributLeval = e.target.value;
        const parent_id = e.target.getAttribute('parent_id');
        const parentlength = e.target.getAttribute('parentlength');

        return Promise.all(
            details.map(async (detail) => {

                let count = detail.isCheckedCount;
                let action = detail.moduleActions.map((ac) => {
                    if (parent_id == ac.moduleId) {
                        if (attributLeval == ac.id) {
                            ac.isChecked = e.target.checked;
                            if (e.target.checked == true) {
                                count = count + 1;
                                detail.isCheckedCount = count;
                            }
                            else {
                                count = count - 1;
                                detail.isCheckedCount = count;
                                detail.isChecked = false;
                            }
                        }
                        if (count == parentlength) {
                            detail.isChecked = true;
                        }
                    }
                })
                return detail;
            })

        )

    }
    /*****************END END******************** */


    const getCheckdRoles = async (details) => {

        
        let checkedRoleLocal = {};
        for (let x in details) {
            let ac = details[x].moduleActions;
            for (let y in ac) {
                let isCheckedcurrent = ac[y].isChecked;
                if (isCheckedcurrent == true) {
                    if (checkedRoleLocal[ac[y].module_name] === undefined) {
                        checkedRoleLocal = { ...checkedRoleLocal, [ac[y].module_name]: [ac[y].action_name] };
                    }
                    else {
                        var as = checkedRoleLocal[ac[y].module_name];
                        if (as.indexOf(ac[y].id) < 0) {
                            as.push(ac[y].action_name);
                        }
                    }
                }
                console.log("Else conditions ", checkedRoleLocal)
            }
        }

       
        return checkedRoleLocal;
    }



    const toggleAccordionVisibility = () => {
      setIsAccordionVisible(prevState => !prevState); // Toggle the visibility
    }

    const onSubmit = async (data) => {
        console.log("checking data", data);
        try {
            //setShow(true);
            let details = controllerList;
            console.log("checkdData1 details", details);
            let checkdData1 = await getCheckdRoles(details);
            console.log("checkdData1", checkdData1);

            const roledata = {
                "role_name": data?.role_type_name,
                "role_permission": JSON.stringify(checkdData1),
                "org_id": 0,
                "status": 1
            };
            const response = await roleApi.roleCreate(roledata);
            if (response?.data?.status === 200) {
                let resdata=response?.data?.data;
                console.log('resdata',resdata);
                navigate('/en/user-roles')
                
            } else {
                topTost(response?.data?.message, "error");
            }
            
        } catch (error) {
            setShow(true);
            topTost(error.message, "error")
            
        }
    }
    return (
        <section className="d-flex flex-column h-auto container-xxl ">
            {/* <div className="bg-white p-3 d-flex align-items-center gap-3 mb-2 actionBar listing-cards mt-4">
                <label className="m-b-10 text-capitalize h4">Add User Role</label>
            </div> */}

            
            <section className="flex-fill">
                <div className="bg-white listing-cards">
                    <div className="p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>

                            
                        <Accordion>
                                <div className="m-b-10 text-capitalize h4">Role Permissions</div>
                                <Col md={12} className="d-flex gap-md-4 gap-2 pt-2 mt-2 align-items-center justify-content-between">
                                    <div className="d-flex gap-md-4 gap-2">
                                        <Form.Check
                                            type="checkbox"
                                            name="checkCRM"
                                            id="checkCRM"
                                            value={isCRM}
                                            onChange={(e) => setIsCRM(e.target.checked ? 1 : 0)}
                                            checked={isCRM === 1}
                                            label="Assign this role to CRM team"
                                        />
                                    
                                        <Form.Check
                                            type="checkbox" 
                                            id="SelectAllRole" 
                                            onChange={handleChangeSelectAll} 
                                            name="check-all"
                                            label="Select All"
                                        />
                                    </div>

                                    {/* Button aligned to right using justify-content-between */}
                                    <Button variant="outline-primary" onClick={toggleAccordionVisibility} className="mt-2">
                                        {isAccordionVisible ? "Hide" : "Show"} 
                                    </Button>
                                </Col>
                            </Accordion>
  
                            
                            <Row className="mb-3">
                                <Col >
                                    <Form.Group className="mb-md-0 mb-2">
                                        <Form.Control type="text" name="role_type_name" {...register('role_type_name', errorOptions.role_type_name)} placeholder="Role Name" className="form-control" maxLength={15} minLength={2} />                                       
                                        {errors.role_type_name && <span className="form-error"><BiInfoCircle />{errors?.role_type_name && errors.role_type_name.message}</span>}
                                    </Form.Group>
                                </Col>
                                
                            </Row>
                           <Accordion defaultActiveKey="0" >
                                <Card eventKey="1" className="mt-3 ">
                                    {(roles.length) > 0 ?
                                        roles.map((user) => {
                                            let trdy = user.isChecked
                                            return (
                                                <>
                                                 
                                                    <Accordion.Item eventKey={user.id}>                                                   
                                                            <div class="form-check btn-checkbox mb-0 mt-4 ">
                                                                <Accordion.Header >
                                                                    <input className="form-check-input" type="checkbox"
                                                                        key={user.id}
                                                                        name={user.module_name}
                                                                        checkedClass={user.module_name}
                                                                        parentname="selectAll"
                                                                        value={user.id}
                                                                        checked={trdy}
                                                                        onClick={handleChangeParent}
                                                                        id={`headCheckBox${user.id}`}
                                                                    />
                                                                    <label class="form-check-label fw-bold ms-2  "
                                                                        for={`headCheckBox${user.id}`}
                                                                    >
                                                                        {user.module_label}
                                                                    </label>
                                                                </Accordion.Header>
                                                            </div>
                                                           
                                                        <Accordion.Body className="p-4">
                                                                <Row>
                                                                    {user.
                                                                        moduleActions.map((ele, index) => {
                                                                            var length = (user.moduleActions).length
                                                                            return (
                                                                                <Col xs={6} md={4} lg={3} key={index}>
                                                                                    <div class="form-check btn-checkbox " >
                                                                                        <input className="{user.module_name} form-check-input " type="checkbox"
                                                                                            value={ele.id}
                                                                                            parent_id={user.id}
                                                                                            parentname="selectSingle nod"
                                                                                            parentlength={length}
                                                                                            name={`action[${user.id}][]`} id={ele.id}
                                                                                            checked={ele.isChecked}
                                                                                            onChange={handleChangeChild}
                                                                                        />

                                                                                        <label class="form-check-label text-dark"
                                                                                            for={ele.id}
                                                                                        >
                                                                                            {ele.action_label}
                                                                                        </label>
                                                                                    </div>
                                                                                </Col>
                                                                            )
                                                                        })
                                                                    }
                                                                </Row>
                                                        </Accordion.Body>
                                                        
                                                    </Accordion.Item>
                                                  
                                                </>
                                            )
                                        })
                                        : ''
                                    }
                                </Card>
                            </Accordion >
                           
                            <div className="d-flex gap-4 justify-content-center">
                            <div className=" text-center pt-3 m-0">
                                <Button type="cancel" variant="danger btn--width" className={show ? `disabled` : ``}>{show ? <div className="loader-spinner"></div> : "Cancel"}</Button>
                            </div>
                            <div className=" text-center pt-3 m-0">
                                <Button type="submit" variant="primary btn-md-width" className={show ? `disabled` : ``}>{show ? <div className="loader-spinner"></div> : "Submit"}</Button>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </section >
    );
}


