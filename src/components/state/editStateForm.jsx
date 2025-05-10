import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { statesApi } from '../../api';  
import topTost from '@/utils/topTost';

const EditState = () => {
  const [loading, setLoading] = useState(false);
  const [stateData, setStateData] = useState(null);  
  const navigate = useNavigate();
  const { stateId } = useParams();  
  console.log("use Params",useParams)
  console.log("state Id",stateId);  

  // Fetch the state details for editing
  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await statesApi.getStatesById(stateId);  
        if (response?.data?.status === 200) {
          setStateData(response?.data?.data);
        } else {
          topTost("State not found.", "error");
        }
      } catch (error) {
        topTost("Error: " + error.message, "error");
      }
    };
    fetchState();
  }, [stateId]);

  // Validation schema for the state form
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Minimum 3 characters").max(50, "Maximum 50 characters").required("State name is required"),
    status: Yup.string().required("Status is required"),
  });

  // Handle form submission to update the state
  const onSubmit = async (data, { setSubmitting, resetForm }) => {
    setLoading(true);
    setSubmitting(true);

    try {
      const stateDataToUpdate = {
        stateName: data.name,
        status: data.status,
      };

      
      const response = await statesApi.editState(stateId, stateDataToUpdate); 
      if (response?.data?.status === 200) {
        topTost("State Updated Successfully", "success");
        resetForm();
        setTimeout(() => {
          navigate("/en/state");  
        }, 2000);
      } else {
        topTost(response?.data?.message, "error");
      }
    } catch (error) {
      console.error("API Error: ", error);
      topTost("Error: " + error?.message, "error");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // If the stateData is still loading, show a loading state
  if (!stateData) {
    return <div>Loading...</div>;  // Or use a loading spinner here
  }

  return (
    <section className="d-flex flex-column h-auto container-xxl">
      <section className="flex-fill">
        <div className="bg-white listing-cards">
          <div className="p-4">
            <Formik
              initialValues={{
                name: stateData.stateName || "",  // Populate with existing state name
                status: stateData.status || "",  // Populate with existing status
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ handleSubmit, isSubmitting }) => (
                <Form noValidate onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
                  <Row>
                    {/* State Name */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>State Name <span className="text-red">*</span></Form.Label>
                        <Field type="text" name="name" className="form-control" placeholder="Enter State Name" />
                        <ErrorMessage name="name" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* Status */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Status <span className="text-red">*</span></Form.Label>
                        <Field as="select" name="status" className="form-control">
                          <option value="" disabled>Select Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </Field>
                        <ErrorMessage name="status" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Buttons */}
                  <div className="d-flex text-center justify-content-center pt-5 m-0 gap-4">
                    <Button variant="danger btn-md-width" onClick={() => navigate("/en/state")}>Cancel</Button>
                    <Button type="submit" variant="primary btn-md-width" disabled={isSubmitting || loading}>
                      {loading ? "Updating..." : "Update State"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </section>
  );
}
 export default EditState;