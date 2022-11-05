
function Footer() {
  return (
    <>
        <footer className="main-footer">
            <div className="row d-flex align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-center">
                    <p className="text-gradient-02"></p>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <ul className="nav float-right">
                        <li className="nav-item">
                            <button className="nav-link btn text-gradient-02" >Documentation</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn text-gradient-02">Changelog</button>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>

        <button className="go-top">
             <i className='la la-arrow-up '></i>
        </button>
    </>
  );
}

export default Footer;
