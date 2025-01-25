import React from 'react'
import { Link } from 'react-router-dom'
import { emailList } from '../utils/fackData/emailList'
import getIcon from '../utils/getIcon'
import { useTranslation } from 'react-i18next'

const EmailOverview = () => {
    const data = emailList.overviews
      const { t,i18n } = useTranslation(["input","heading"]);

    return (
        <div className="col-12">
            <div className="card stretch stretch-full">
                <div className="card-body">
                    <div className="hstack justify-content-between mb-4 pb-">
                        <div>
                            <h5 className="mb-1">{t("emailReports", { ns: "heading" })}</h5>
                            <span className="fs-12 text-muted">{t("emailCampaignReports", { ns: "heading" })}</span>
                        </div>
                        <Link to="#" className="btn btn-light-brand"> {t("viewAll", { ns: "input" })}</Link>
                    </div>
                    <div className="row">
                        {
                            data?.map(({ id, count, name, color, icon }) => {
                                return (
                                    <div key={id} className="col-xxl-2 col-lg-4 col-md-6 email-overview-card">
                                        <div className="card stretch stretch-full border border-dashed border-gray-5">
                                            <div className="card-body rounded-3 text-center">
                                                <i className={`fs-3 text-${color}`}>{getIcon(icon)}</i>
                                                <div className="fs-4 fw-bolder text-dark mt-3 mb-1">{count}</div>
                                                <p className="fs-12 fw-medium text-muted text-spacing-1 mb-0 text-truncate-1-line">{name[i18n.language]}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailOverview