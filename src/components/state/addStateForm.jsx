import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { statesApi } from '../../api';  // Assuming you have an API service for states
import { countriesApi } from '../../api';
import topTost from '@/utils/topTost';

export default function AddState() {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  // Fetch countries data
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await countriesApi.getCountries();  // Assuming you have an API to get countries
        console.log("resposne full",response)
        if (response?.data?.status === 200) {
          setCountries(response?.data?.data);  // Assume response contains countries in `data`
        } else {
          topTost("Failed to load countries.", "error");
        }
      } catch (error) {
        topTost("Error: " + error.message, "error");
      }
    };
    fetchCountries();
  }, []);

  // Validation schema for state
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Minimum 3 characters").max(50, "Maximum 50 characters").required("State name is required"),
    country: Yup.string().required("Country is required"),
    status: Yup.string().required("Status is required"),
  });

  const onSubmit = async (data, { setSubmitting, resetForm }) => {
    setLoading(true);
    setSubmitting(true);

    try {
      const stateData = {
        name: data.name,
        country_id: data.country,  // Assuming state is associated with a country by country_id
        status: data.status,
      };

      //  API Call to add state
      const response = await statesApi.createState(stateData);  // Assuming you have an API to add state
      if (response?.data?.status === 200) {
        topTost("State Added Successfully", "success");
        resetForm();
        setTimeout(() => {
          navigate("/en/state");  // Redirect to the states list after 2 seconds
        }, 2000);
      } else {
        topTost(response?.data?.message, "error");
      }
    } catch (error) {
      console.error(" API Error: ", error);
      topTost("Error: " + error?.message, "error");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <section className="d-flex flex-column h-auto container-xxl">
      <section className="flex-fill">
        <div className="bg-white listing-cards">
          <div className="p-4">
            <Formik
              initialValues={{
                name: "", country: "", status: "",
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ handleSubmit, isSubmitting }) => (
                <Form noValidate onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
                  <Row>
                    

                    {/* Country */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Country <span className="text-red">*</span></Form.Label>
                        <Field as="select" name="country" className="form-control">
                          <option value="" disabled>Select Country</option>
                          {countries.map(country => (
                            <option key={country.id} value={country.id}>{country.name}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="country" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

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
                    <Button variant="danger btn-md-width" onClick={() => navigate("/admin/states")}>Cancel</Button>
                    <Button type="submit" variant="primary btn-md-width" disabled={isSubmitting || loading}>
                      {loading ? "Submitting..." : "Submit"}
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
