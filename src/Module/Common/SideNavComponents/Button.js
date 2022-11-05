
import React from 'react';
import $ from "jquery";
import { Link } from "react-router-dom";

function Button({ ToggleComponentId, ButtonHeading, ButtonIcon, SubMenuOptions }) {

    function slideToggle(id) {
        $("#" + id).slideToggle();
        if($("#" + id + "btn")[0].className === 'la la-angle-left'){
            $("#" + id + "btn").removeClass('la-angle-left');
            $("#" + id + "btn").addClass('la-angle-down');
        }else{
            $("#" + id + "btn").addClass('la-angle-left');
            $("#" + id + "btn").removeClass('la-angle-down');
        }
       
    }
    return (
        <>
            <button
                className="btn sideNavComponent"
                aria-expanded="false"
                data-toggle="collapse"
                onClick={() => slideToggle(ToggleComponentId)}
            >
                <i className={ButtonIcon + ' mt-1'}></i>
                <span>{ButtonHeading}</span>

            </button>
            <span className='caretDesing' > <i id={ToggleComponentId + 'btn'} className='la la-angle-left'></i></span>

            <ul
                id={ToggleComponentId}
                className="collapse list-unstyled pt-0"
            >
                {
                    SubMenuOptions.map((val, i) => {
                        return <li key={i}>
                            <Link to={val.link} className="sideNavComponent">
                                <span>{val.name}</span>
                            </Link>
                        </li>
                    })
                }

            </ul>

        </>
    );
}

export default Button;