import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { countriesApi, statesApi, citiesApi } from '../../api';  
import topTost from '@/utils/topTost';

const  AddCity =()=> {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]); 
  const [selectedCountry, setSelectedCountry] = useState(""); 
  const [selectedState, setSelectedState] = useState(""); 
  const navigate = useNavigate();

  // Fetch countries when component mounts
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await countriesApi.getCountryDD();  
        if (response?.data?.status === 200) {
          setCountries(response?.data?.data);  
        } else {
          topTost("Failed to load countries.", "error");
        }
      } catch (error) {
        topTost("Error: " + error.message, "error");
      }
    };
    fetchCountries();
  }, []);

  
  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          const response = await statesApi.getStateDD(selectedCountry); 
          if (response?.data?.status === 200) {
            setStates(response?.data?.data);
          } else {
            topTost("Failed to load states.", "error");
          }
        } catch (error) {
          topTost("Error: " + error.message, "error");
        }
      };
      fetchStates();
    }
  }, [selectedCountry]); // Trigger when country changes

  // Validation schema for state
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Minimum 3 characters").max(50, "Maximum 50 characters").required("City name is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    status: Yup.string().required("Status is required"),
  });

  const onSubmit = async (data, { setSubmitting, resetForm }) => {
    setLoading(true);
    setSubmitting(true);

    try {
      const cityData = {
        cityName: data.name,
        country_id: data.country,  
        state_id: data.state, 
        status: data.status,
      };

      const response = await citiesApi.createCity(cityData); 
      if (response?.data?.status === 200) {
        topTost("City Added Successfully", "success");
        resetForm();
        setTimeout(() => {
          navigate("/en/city");  
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
                name: "", country: "", state: "", status: "",
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ handleSubmit, isSubmitting,setFieldValue, values }) => (
                <Form noValidate onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
                  <Row>
                    {/* Country */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Country <span className="text-red">*</span></Form.Label>
                        <Field 
                          as="select" 
                          name="country" 
                          className="form-control" 
                          onChange={(e) => {
                            const { value } = e.target;
                            setSelectedCountry(value);
                            setSelectedState(""); 
                            setStates([]); 
                            setFieldValue("country", value);
                            setFieldValue("state", "");
                          }}
                        >
                          <option value="" disabled>Select Country</option>
                          {countries.map(country => (
                            <option key={country.id} value={country.id}>{country.countryName}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="country" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* State */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>State <span className="text-red">*</span></Form.Label>
                        <Field 
                          as="select" 
                          name="state" 
                          className="form-control"
                          disabled={!states.length} // Disable if no states
                          onChange={(e) => {
                            setSelectedState(e.target.value);
                            setFieldValue("state", e.target.value);
                          }}
                        >
                          <option value="" disabled>Select State</option>
                          {states.map(state => (
                            <option key={state.id} value={state.id}>{state.stateName}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="state" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                    {/* City Name */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>City Name <span className="text-red">*</span></Form.Label>
                        <Field 
                          type="text" 
                          name="name" 
                          className="form-control" 
                          placeholder="Enter City Name" 
                        />
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
                    <Button variant="danger btn-md-width" onClick={() => navigate("/en/city")}>Cancel</Button>
                    <Button type="submit" variant="primary btn-md-width" disabled={isSubmitting || loading}>
                      {loading ? "Submitting..." : "Add City"}
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
 export default AddCity;