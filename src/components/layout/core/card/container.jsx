import PropTypes from "prop-types";

const HeaderContainer = ({
	title = "",

}) => {

	return (
		<>
			<div
				id="kt_header"
				className="header py-6 py-lg-0 header-sticky-custom"
				data-kt-sticky="false"
				data-kt-sticky-name="header"
				data-kt-sticky-offset="{lg: '175px'}"
			>
				<div className={`header-container container-fluid`}>
					<div className="page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-20 py-3 py-lg-0 me-3">
						<h1 className="d-flex flex-row text-dark fw-bolder my-1 align-items-center">
							<span className="text-white fs-1">{title}</span>
						</h1>
					</div>
					<div className="d-flex align-items-center flex-wrap">
						{/* {!hideSearch && <HeaderSearch />} */}
					</div>
				</div>
			</div>
			<div className="header-offset"></div>
		</>
	);
};
export default HeaderContainer;
HeaderContainer.protoTypes = {
	title: PropTypes.string,
	actionsComponent: PropTypes.element,
	hideSearch: PropTypes.bool
}