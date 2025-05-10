import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { countriesApi, statesApi, citiesApi } from '../../api';  
import topTost from '@/utils/topTost';

const EditCity =()=> {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [cityData, setCityData] = useState(null); // Store city data for pre-filling
  const navigate = useNavigate();
  const { cityId } = useParams(); // Get city ID from URL
  console.log("Params:", useParams()); // Check the full object
console.log("City ID:", cityId);

  // Fetch city details when component loads
  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const response = await citiesApi.getCityById(cityId); 
        console.log("API Response:", response?.data); 
        if (response?.data?.status === 200) {
            const city = response.data.data;

            console.log("Fetched City Data:", city); 

            // if (!city.country_id || !city.state_id) {
            //     console.error("ERROR: API response is missing `country_id` or `state_id`.");
            //     return;
            //   }

          setCityData(city);
          setSelectedCountry(city.country_id); 
          setSelectedState(city.state_id); 
        } else {
          topTost("City not found.", "error");
        }
      } catch (error) {
        topTost("Error: " + error.message, "error");
      }
    };
    fetchCityDetails();
  }, [cityId]);

  // Fetch countries list
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await countriesApi.getCountryDD(); 
        console.log("Fetched Countries:", response?.data?.data); // Debug country list 
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

  // Fetch states when selectedCountry changes
  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          const response = await statesApi.getStateDD({ countryId: selectedCountry }); 
          console.log("Fetched States:", response?.data?.data); // Debug states list
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
    } else {
      setStates([]); // Reset states if no country selected
    }
  }, [selectedCountry]);

  // Form validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Minimum 3 characters").max(50, "Maximum 50 characters").required("City name is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    status: Yup.string().required("Status is required"),
  });

  // Form submission function to update city
  const onSubmit = async (data, { setSubmitting }) => {
    setLoading(true);
    setSubmitting(true);

    try {
      const updatedCityData = {
        cityName: data.name,
        country_id: data.country,
        state_id: data.state,
        status: data.status,
      };

      const response = await citiesApi.editCity(cityId, updatedCityData);  
      if (response?.data?.status === 200) {
        topTost("City Updated Successfully", "success");
        setTimeout(() => {
          navigate("/en/city");  
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

  if (!cityData) {
    return <div>Loading...</div>; 
  }

  return (
    <section className="d-flex flex-column h-auto container-xxl">
      <section className="flex-fill">
        <div className="bg-white listing-cards">
          <div className="p-4">
            <Formik
              initialValues={{
                name: cityData.cityName || "",
                country: selectedCountry || "",
                state: selectedState || "",
                status: cityData.status || "",
              }}
              enableReinitialize={true} 
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ handleSubmit, isSubmitting, setFieldValue }) => (
                <Form noValidate onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
                  <Row>

                    {/* Country Dropdown */}
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

                    {/* State Dropdown */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>State <span className="text-red">*</span></Form.Label>
                        <Field 
                          as="select" 
                          name="state" 
                          className="form-control"
                          disabled={!states.length} 
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
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </Field>
                        <ErrorMessage name="status" component="div" className="form-error text-danger small mt-1" />
                      </Form.Group>
                    </Col>

                  </Row>

                  <div className="d-flex justify-content-center pt-5 gap-4">
                    <Button variant="danger" onClick={() => navigate("/en/city")}>Cancel</Button>
                    <Button type="submit" variant="primary" disabled={isSubmitting || loading}>
                      {loading ? "Updating..." : "Update City"}
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
export default EditCity;