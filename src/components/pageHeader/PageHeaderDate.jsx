import React, { useState } from "react";
import { FiFilter, FiPlus } from "react-icons/fi";
import Checkbox from "@/components/shared/Checkbox";
import { Link } from "react-router-dom";
// import DateRange from "@/components/shared/DateRange"; // Correct import
import { useTranslation } from "react-i18next";

const PageHeaderDate = () => {
  // const [toggleDateRange, setToggleDateRange] = useState(false);
  const { i18n, t } = useTranslation();

  // Updated filterItems with translations
  const filterItems = [
    { id: 1, name: { en: "Role", fr: "Rôle" } },
    { id: 2, name: { en: "Team", fr: "Équipe" } },
    { id: 3, name: { en: "Email", fr: "E-mail" } },
    { id: 4, name: { en: "Member", fr: "Membre" } },
    { id: 5, name: { en: "Recommendation", fr: "Recommandation" } }
  ];

  // State to track checked status for each filter item
  const [checkedState, setCheckedState] = useState(
    new Array(filterItems.length).fill(false)
  );

  // Handle checkbox toggle
  const handleCheckboxChange = (index) => {
    const updatedCheckedState = checkedState.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
      {/* Date Range Picker */}
      {/* <div
        className="position-relative date-picker-field"
        onClick={() => setToggleDateRange(!toggleDateRange)}
      >
        <DateRange toggleDateRange={toggleDateRange} setToggleDateRange={setToggleDateRange} />
      </div> */}

      {/* Filter Dropdown */}
      <div className="filter-dropdown">
        <Link
          className="btn btn-md btn-light-brand"
          data-bs-toggle="dropdown"
          data-bs-offset="0, 10"
          data-bs-auto-close="outside"
        >
          <i className="me-2">
            <FiFilter />
          </i>
          <span>{t("filter", { ns: "input" })}</span>
        </Link>
        <div className="dropdown-menu dropdown-menu-end">
          {/* Filter Items */}
          {filterItems.map(({ id, name }, index) => (
            <div key={id} className="dropdown-item">
              <Checkbox
                name={name[i18n.language]} // Display the name based on the current language
                id={id}
                checked={checkedState[index]} // Pass the current checked state
                onChange={() => handleCheckboxChange(index)} // Handle toggle
              />
            </div>
          ))}

          {/* Additional Actions */}
          <div className="dropdown-divider"></div>
          <Link to="#" className="dropdown-item">
            <FiPlus size={16} className="me-3" />
            <span>{t("createNew", { ns: "input" })}</span>
          </Link>
          <Link to="#" className="dropdown-item">
            <FiFilter size={16} className="me-3" />
            <span>{t("manageFilter", { ns: "input" })}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageHeaderDate;
