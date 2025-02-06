import React, { useState } from 'react'
import { FiCalendar } from 'react-icons/fi'
import DatePicker from 'react-datepicker'
import SelectDropdown from '@/components/shared/SelectDropdown'
import Input from '@/components/shared/Input'
import { languagesData } from '@/utils/fackData/languagesData'
import MultiSelectTags from '@/components/shared/MultiSelectTags'
import useLocationData from '@/hooks/useLocationData'
import useDatePicker from '@/hooks/useDatePicker'

const TabProfile = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const { startDate, setStartDate, renderFooter } = useDatePicker();
    const { countries, states, cities, fetchStates, fetchCities, } = useLocationData();
    const [streetAddress, setStreetAddress] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [apartmentNumber, setApartmentNumber] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [postBox, setPostBox] = useState("");
    const [profileImage, setProfileImage] = useState("/images/avatar/1.png"); // Default image
    const [imageFile, setImageFile] = useState(null);
    const [gender, setGender] = useState("male"); // Default gender



    //  Handle Image Upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result); // Set profile image preview
            };
            reader.readAsDataURL(file);
            setImageFile(file);
        }
    };

    //  Handle Remove Image
    const handleRemoveImage = () => {
        setProfileImage("/images/avatar/1.png"); // Reset to default image
        setImageFile(null);
    };


    return (
        <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
            <div className="card-body personal-info">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0 me-4">
                        <span className="d-block mb-2">Information:</span>
                    </h5>

                </div>
                <div className="row mb-4 align-items-center">
                    <div className="col-lg-4">
                        <label className="fw-semibold">Avatar: </label>
                    </div>
                    <div className="col-lg-8">
                        <div className="mb-4 mb-md-0 d-flex gap-4 your-brand">
                            <label htmlFor='img' className="wd-100 ht-100 position-relative overflow-hidden border border-gray-2 rounded">
                                <img src="/images/avatar/1.png" className="upload-pic img-fluid rounded h-100 w-100" alt="profile_img" />
                                <input className="file-upload" type="file" accept="image/*" id='img' hidden onChange={handleImageUpload} />
                            </label>
                            <div className="d-flex flex-column gap-1 mb-2">
                                <h4 >Profile Image</h4>
                                <div className='d-flex gap-2 mb-2'>
                                    <button className='btn btn-primary btn-lg' onClick={() => document.getElementById('img').click()}>Upload</button>
                                    <button className='btn btn-danger btn-lg' onClick={handleRemoveImage} disabled={!imageFile}>Remove</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <Input
                    icon='feather-user'
                    label={"First Name"}
                    labelId={"nameInput"}
                    placeholder={"First Name"}
                    name={"firstname"}
                />
                <Input
                    icon='feather-user'
                    label={"Last Name"}
                    labelId={"nameInput"}
                    placeholder={"Last Name"}
                    name={"lastname"}
                />
                <Input
                    icon='feather-mail'
                    label={"Email"}
                    labelId={"emailInput"}
                    placeholder={"Email"}
                    name={"email"}
                    type={"email"}
                />
                <Input
                    icon='feather-link-2'
                    label={"User Name"}
                    labelId={"usernameInput"}
                    placeholder={"User Name"}
                    name={"username"}
                //centerLink={true}
                />
                <Input
                    icon='feather-phone'
                    label={"Phone Number"}
                    labelId={"phoneInput"}
                    placeholder={"Phone Number"}
                    name={"phonenumber"}
                />

                <div className="row mb-4 align-items-center">
                    <div className="col-lg-4">
                        <label htmlFor="dateofBirth" className="fw-semibold">Date of Birth: </label>
                    </div>
                    <div className="col-lg-8">
                        <div className="input-group flex-nowrap">
                            <div className="input-group-text"><FiCalendar size={16} /></div>
                            <div className='w-100 d-flex date  rounded-0' style={{ flexBasis: "95%" }}>
                                <DatePicker
                                    placeholderText='Pick date of birth'
                                    selected={startDate}
                                    showPopperArrow={false}
                                    onChange={(date) => setStartDate(date)}
                                    className='form-control rounded-0'
                                    popperPlacement="bottom-start"
                                    calendarContainer={({ children }) => (
                                        <div className='bg-white react-datepicker'>
                                            {children}
                                            {renderFooter("start")}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-4 align-items-center">
                    <div className="col-lg-4">
                        <label className="fw-semibold">Gender: </label>
                    </div>
                    <div className="col-lg-8">
                        <div className="d-flex gap-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input "
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="male"
                                    checked={gender === "male"}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input "
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    checked={gender === "female"}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <label className="form-check-label " htmlFor="female">Female</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="other"
                                    name="gender"
                                    value="other"
                                    checked={gender === "other"}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="other">Other</label>
                            </div>
                        </div>
                    </div>
                </div>

                <Input
                    icon='feather-briefcase'
                    label={"Designation"}
                    labelId={"designationInput"}
                    placeholder={"Designation"}
                    name={"designation"}
                />
                <Input
                    icon="feather-link"
                    label={"Website"}
                    labelId={"websiteInput"}
                    placeholder={"Website"}
                    name={"website"}
                />

            </div>
            <hr className="my-0" />
            <div className="card-body additional-info">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0 me-4">
                        <span className="d-block mb-2">Address:</span>

                    </h5>
                </div>
                <div className="row mb-4 align-items-center">
                    <div className="col-lg-4">
                        <label className="fw-semibold">Country: </label>
                    </div>
                    <div className="col-lg-8">
                        <SelectDropdown
                            options={countries}
                            selectedOption={selectedOption}
                            defaultSelect="usa"
                            onSelectOption={(option) => {
                                fetchStates(option.label);
                                fetchCities(option.label);
                                setSelectedOption(option)
                            }}
                        />
                    </div>
                </div>
                <div className="row mb-4 align-items-center">
                    <div className="col-lg-4">
                        <label className="fw-semibold">State: </label>
                    </div>
                    <div className="col-lg-8">
                        <SelectDropdown
                            options={states}
                            selectedOption={selectedOption}
                            defaultSelect={"new-york"}
                            onSelectOption={(option) => setSelectedOption(option)}
                        />
                    </div>
                </div>
                <div className="row mb-4 align-items-center">
                    <div className="col-lg-4">
                        <label className="fw-semibold">City: </label>
                    </div>
                    <div className="col-lg-8">
                        <SelectDropdown
                            options={cities}
                            selectedOption={selectedOption}
                            defaultSelect="new-york"
                            onSelectOption={(option) => setSelectedOption(option)}
                        />
                    </div>
                </div>
                <div className="row mb-4 align-items-center ">
                    <div >
                        <Input
                            icon='feather-map-pin'
                            label={"Street Address"}
                            labelId={"streetAddressInput"}
                            placeholder={" Street Address"}
                            name={"streetAddress"}
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            icon='feather-layers'
                            label={"House Number"}
                            labelId={"houseNumberInput"}
                            placeholder={" House Number"}
                            name={"houseNumber"}
                            value={houseNumber}
                            onChange={(e) => setHouseNumber(e.target.value)}
                        />
                    </div>
                    <div >
                        <Input
                            icon='feather-layers'
                            label={"Apartment Number"}
                            labelId={"apartmentNumberInput"}
                            placeholder={" Apartment Number"}
                            name={"apartmentNumber"}
                            value={apartmentNumber}
                            onChange={(e) => setApartmentNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            icon='feather-tag'
                            label={"Zip Code"}
                            labelId={"zipCodeInput"}
                            placeholder={" Zip Code"}
                            name={"zipCode"}
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            icon='feather-mail'
                            label={"Postbox"}
                            labelId={"postBoxInput"}
                            placeholder={" Postbox Number"}
                            name={"postBox"}
                            value={postBox}
                            onChange={(e) => setPostBox(e.target.value)}
                        />
                    </div>

                </div>



            </div>

            <hr className="my-0" />
            <div className="card-body additional-info">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0 me-4">
                        <span className="d-block mb-2">Other Information:</span>

                    </h5>
                </div>

                <div className="row mb-4 align-items-center">
                    <div className="col-lg-4">
                        <label className="fw-semibold">Languages: </label>
                    </div>
                    <div className="col-lg-8">
                        <MultiSelectTags
                            options={languagesData}
                            defaultSelect={[languagesData[25], languagesData[10], languagesData[45]]}
                        />
                    </div>
                </div>
                <div>
                    <Input
                    icon="feather-link"
                    label={"Website"}
                    labelId={"websiteInput"}
                    placeholder={"Website"}
                    name={"website"}
                />
                </div>


            </div>
        </div>
    )
}

export default TabProfile 