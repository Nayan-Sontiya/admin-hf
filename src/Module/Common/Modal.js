import React from "react";
import { closeModalProfile } from "./../ApiHandler/ApiHandler";
import Loader from "./Loader";

function Modal({
  modalId,
  ModalHeading,
  ModalBody,
  SubmitButton,
  ModalType,
  buttonStatus,
  ModalLoading,
}) {
  return (
    <div className="modal fade addPopUp" id={modalId} role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{ModalHeading}</h4>
            <button
              type="button"
              className="close"
              onClick={() => closeModalProfile(modalId)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body p-0">
            <div
              className="row m-0 justify-content-center overflow-auto"
              style={{
                minHeight:
                  ModalType === "delete"
                    ? "15vh"
                    : ModalType === "registration"
                    ? "70vh"
                    : "50vh",
              }}
            >
              {ModalBody}
            </div>
          </div>
          <div className="modal-footer text-right">
            {ModalType === "delete" ? (
              <>
                {ModalLoading && (
                  <Loader size={40} className="loader" color="#5d5386" />
                )}
                <button
                  className="btn rounded-pill btn-shadow"
                  onClick={() => closeModalProfile(modalId)}
                  disabled={ModalLoading}
                >
                  No
                </button>
                {SubmitButton !== "" ? (
                  <button
                    className="btn btn-grad"
                    onClick={SubmitButton}
                    disabled={ModalLoading}
                  >
                    Yes
                  </button>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <button
                  className="btn rounded-pill btn-shadow"
                  onClick={() => closeModalProfile(modalId)}
                >
                  Close
                </button>
                {SubmitButton !== "" ? (
                  <>
                    {buttonStatus === true ? (
                      <Loader />
                    ) : (
                      <button className="btn btn-grad" onClick={SubmitButton}>
                        Send Mail
                      </button>
                    )}
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
