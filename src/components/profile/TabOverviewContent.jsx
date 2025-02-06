import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProfile } from '../../contentApi/ProfileContext'


const TabOverviewContent = () => {
    const {i18n} = useTranslation();
    const { profile } = useProfile(); // Fetch profile data from context

    return (
        <div
            className="tab-pane fade show active p-4"
            id="overviewTab"
            role="tabpanel"
        >
            <div className="about-section mb-5">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0">Profile About:</h5>
                
                </div>
                <p>
                    John Doe is a frontend developer with over 5 years of experience creating
                    high-quality, user-friendly websites and web applications. He has a strong
                    understanding of web development technologies and a keen eye for design.
                </p>
                <p>
                    John is proficient in languages such as HTML, CSS, and JavaScript, and is
                    experienced in using popular frontend frameworks such as React and
                    Angular. He is also well-versed in user experience design and uses his
                    knowledge to create engaging and intuitive user interfaces.
                </p>
                <p>
                    Throughout his career, John has worked on a wide range of projects for
                    clients in various industries, including e-commerce, healthcare, and
                    education. He takes a collaborative approach to development and enjoys
                    working closely with clients and other developers to bring their ideas to
                    life.
                </p>
            </div>
             {/* Profile Details */}
             <div className="profile-details mb-5">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0">Profile Details:</h5>
                    <Link to={`/${i18n.language}/profile/edit`} className="btn btn-sm btn-light-brand">
                        <span>Edit Profile</span>
                    </Link>
                </div>

                {/* Display Data from Profile Context */}
                <div className="row g-0 mb-4">
                    <div className="col-sm-6 text-muted">First Name:</div>
                    <div className="col-sm-6 fw-semibold">{profile.firstName || 'Not Provided'}</div>
                </div>
                <div className="row g-0 mb-4">
                    <div className="col-sm-6 text-muted">Last Name:</div>
                    <div className="col-sm-6 fw-semibold">{profile.lastName || 'Not Provided'}</div>
                </div>
                <div className="row g-0 mb-4">
                    <div className="col-sm-6 text-muted">Date of Birth:</div>
                    <div className="col-sm-6 fw-semibold">{profile.dateOfBirth || 'Not Provided'}</div>
                </div>
                <div className="row g-0 mb-4">
                    <div className="col-sm-6 text-muted">Mobile Number:</div>
                    <div className="col-sm-6 fw-semibold">{profile.phoneNumber || 'Not Provided'}</div>
                </div>
                <div className="row g-0 mb-4">
                    <div className="col-sm-6 text-muted">Email Address:</div>
                    <div className="col-sm-6 fw-semibold">{profile.email || 'Not Provided'}</div>
                </div>
                <div className="row g-0 mb-4">
                    <div className="col-sm-6 text-muted">Location:</div>
                    <div className="col-sm-6 fw-semibold">{profile.location || 'Not Provided'}</div>
                </div>
                <div className="row g-0 mb-4">
                    <div className="col-sm-6 text-muted">Country:</div>
                    <div className="col-sm-6 fw-semibold">{profile.country || 'Not Provided'}</div>
                </div>
                <div className="row g-0 mb-4">
                    <div className="col-sm-6 text-muted">Communication:</div>
                    <div className="col-sm-6 fw-semibold">{profile.communication || 'Not Provided'}</div>
                </div>
                <div className="row g-0 mb-4">
                    <div className="col-sm-6 text-muted">Allow Changes:</div>
                    <div className="col-sm-6 fw-semibold">{profile.allowChanges ? 'YES' : 'NO'}</div>
                </div>
                <div className="row g-0 mb-4">
                    <div className="col-sm-6 text-muted">Website:</div>
                    <div className="col-sm-6 fw-semibold">
                        <a href={profile.website} target="_blank" rel="noopener noreferrer">
                            {profile.website || 'Not Provided'}
                        </a>
                    </div>
                </div>
            </div>
            <div
                className="alert alert-dismissible mb-4 p-4 d-flex alert-soft-warning-message profile-overview-alert"
                role="alert"
            >
                <div className="me-4 d-none d-md-block">
                    <FiAlertTriangle className='fs-1' />
                </div>
                <div>
                    <p className="fw-bold mb-1 text-truncate-1-line">
                        Your profile has not been updated yet!!!
                    </p>
                    <p className="fs-10 fw-medium text-uppercase text-truncate-1-line">
                        Last Update: <strong>26 Dec, 2023</strong>
                    </p>
                    <a
                        href="#"
                        className="btn btn-sm bg-soft-warning text-warning d-inline-block"
                    >
                        Update Now
                    </a>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    />
                </div>
            </div>
            
        
        </div>

    )
}

export default TabOverviewContent