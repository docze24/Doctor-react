import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiInfoCircle } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { Accordion, Card, Row, Col, Form, Button } from "react-bootstrap";
import { roleApi } from '../../api';
import topTost from '@/utils/topTost';

const EditRoleForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState([]);
    const [controllerList, setControllerList] = useState([]);
    const [isCRM, setIsCRM] = useState(0);
    const [isAccordionVisible, setIsAccordionVisible] = useState(true);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchRoleData();
        }
        fetchAllRoleData();
    }, [id]);

    const fetchAllRoleData = async () => {
        try {
            const response = await roleApi.getModuleAction();
           // console.log("Full Response Data:", response);
            if (response?.data?.status === 200) {
                setRoles(response?.data?.data);
                setControllerList(response?.data?.data);
            } else {
                topTost(response?.data?.message, "error");
            }
        } catch (error) {
            topTost(error?.message, "error");
        } finally {
            setLoading(false);
        }
    };

    const fetchRoleData = async () => {
        try {
            const response = await roleApi.getRoleById(id);
            if (response?.data?.status === 200) {
                const roleData = response?.data?.data;
             //   console.log("Fetched Role Data (roleData):", roleData);
                setValue("role_type_name", roleData.role_name);
                const permissions = roleData.role_permission ? JSON.parse(roleData.role_permission) : [];

                let updatedControllerList = roles.map((module) => {
                    let moduleActions = module.moduleActions.map((action) => {
                        return {
                            ...action,
                            isChecked: permissions[module.module_name]?.includes(action.action_name) || false,
                        };
                    });
                    return {
                        ...module,
                        isChecked: moduleActions.every((action) => action.isChecked),
                        moduleActions,
                    };
                });

                setControllerList(updatedControllerList);
                setIsCRM(roleData.isCRM);
               // console.log("Role Name Set:", roleData.role_name);
              //  console.log("Permissions Set:", permissions);
             //   console.log("Is CRM Set:", roleData.isCRM);
            } else {
                topTost("Role not found!", "error");
                navigate("/en/user-roles");
            }
        } catch (error) {
            topTost("Error fetching role data", "error");
        }
    };

    const handleChangeSelectAll = (e) => {
        let updatedList = controllerList.map((detail) => {
            detail.isChecked = e.target.checked;
            detail.moduleActions = detail.moduleActions.map((ac) => {
                return { ...ac, isChecked: e.target.checked };
            });
            return detail;
        });
        setControllerList([...updatedList]);
    };

    const handleChangeParent = (e) => {
        let updatedList = controllerList.map((detail) => {
            if (detail.id === e.target.value) {
                detail.isChecked = e.target.checked;
                detail.moduleActions = detail.moduleActions.map((ac) => ({
                    ...ac,
                    isChecked: e.target.checked,
                }));
            }
            return detail;
        });
        setControllerList([...updatedList]);
    };

    const handleChangeChild = (e) => {
        let updatedList = controllerList.map((detail) => {
            detail.moduleActions = detail.moduleActions.map((ac) => {
                if (ac.id === e.target.value) {
                    ac.isChecked = e.target.checked;
                }
                return ac;
            });
            return detail;
        });
        setControllerList([...updatedList]);
    };

    const getCheckedRoles = () => {
        let checkedPermissions = {};
        controllerList.forEach((detail) => {
            if (detail.isChecked) {
                checkedPermissions[detail.module_name] = [];
            }
            detail.moduleActions.forEach((ac) => {
                if (ac.isChecked) {
                    if (!checkedPermissions[detail.module_name]) {
                        checkedPermissions[detail.module_name] = [];
                    }
                    checkedPermissions[detail.module_name].push(ac.action_name);
                }
            });
        });
        return checkedPermissions;
    };

    const toggleAccordionVisibility = () => {
        setIsAccordionVisible((prevState) => !prevState);
    };

    const onSubmit = async (data) => {
        try {
            setShow(true);
            const checkedPermissions = getCheckedRoles();
            const roleUpdateData = {
                role_name: data.role_type_name,
                role_permission: JSON.stringify(checkedPermissions),
                isCRM: isCRM,
                status: 1,
            };

            const response = await roleApi.updateRole(id, roleUpdateData);
            if (response?.data?.status === 200) {
                topTost("Role Updated Successfully", "success");
                navigate("/en/user-roles");
            } else {
                topTost(response?.data?.message, "error");
            }
        } catch (error) {
            topTost("Error updating role", "error");
        } finally {
            setShow(false);
        }
    };

    return (
        <section className="d-flex flex-column h-auto container-xxl">
            <section className="flex-fill">
                <div className="bg-white listing-cards">
                    <div className="p-4">
                        {loading ? <p>Loading...</p> : 
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
                                        <Button variant="outline-primary" onClick={toggleAccordionVisibility} className="mt-2">
                                            {isAccordionVisible ? "Hide" : "Show"}
                                        </Button>
                                    </Col>
                                </Accordion>

                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group className="mb-md-0 mb-2">
                                            <Form.Control
                                                type="text"
                                                {...register("role_type_name", { required: "Role name is required" })}
                                                placeholder="Role Name"
                                                className="form-control"
                                                maxLength={15}
                                                minLength={2}
                                            />
                                            {errors.role_type_name && <span className="form-error"><BiInfoCircle />{errors.role_type_name.message}</span>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {isAccordionVisible && (
                                    <Accordion defaultActiveKey="0">
                                        <Card eventKey="1" className="mt-3">
                                            {controllerList.length > 0 && controllerList.map((module) => (
                                                <Accordion.Item eventKey={module.id} key={module.id}>
                                                    <Accordion.Header>
                                                        <Form.Check
                                                            type="checkbox"
                                                            id={`module_${module.id}`}
                                                            value={module.id}
                                                            checked={module.isChecked}
                                                            onChange={handleChangeParent}
                                                        />
                                                        <label className="ms-2 fw-bold">{module.module_label}</label>
                                                    </Accordion.Header>
                                                    <Accordion.Body className="p-4">
                                                        <Row>
                                                            {module.moduleActions.map((action) => (
                                                                <Col xs={6} md={4} lg={3} key={action.id}>
                                                                    <div className="form-check">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            value={action.id}
                                                                            checked={action.isChecked}
                                                                            onChange={handleChangeChild}
                                                                        />
                                                                        <label className="form-check-label">{action.action_label}</label>
                                                                    </div>
                                                                </Col>
                                                            ))}
                                                        </Row>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            ))}
                                        </Card>
                                    </Accordion>
                                )}

                                <div className="d-flex gap-4 justify-content-center">
                                    <Button type="button" variant="danger btn--width" onClick={() => navigate("/en/user-roles")}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="primary btn-md-width">
                                        {show ? <div className="loader-spinner"></div> : "Update Role"}
                                    </Button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </section>
        </section>
    );
}
export default EditRoleForm;