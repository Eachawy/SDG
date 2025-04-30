import React from "react";
import "./breadcrumb.Component.scss";
import { useNavigate } from "react-router";
import { useAppSelector } from "app/config/store";

const BreadcrumbComponent = props => {
    const navigate = useNavigate();
    const $lang = useAppSelector((state) => state.locale.currentLocale);

    return (
        <div className="breadcrumbComponent">
            <ul>
                <li onClick={() => navigate("/dashoard")}><span className="home" /></li>
                {props.links && props.links.map((link: any) => (
                    <li key={link.id}>
                        {/* {link.url ?
                            <a href="" onClick={() => navigate(link.url)}>{link.name[$lang]}</a>
                            :
                        } */}
                        {link.name[$lang]}

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BreadcrumbComponent;