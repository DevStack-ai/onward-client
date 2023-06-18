import PropTypes from 'prop-types'

const CardHeader = ({ title, subtitle, withToolbar, toolbarComponent, dropdownOption, classListStr }) => {
  return (
    <div className={`card-header ${classListStr ?? ''} align-items-center`}>
      <h3 className="card-title align-items-start flex-column">
        <span className={`fw-bolder ${subtitle ? 'mb-2' : ''} text-dark`}>{title}</span>
        {subtitle ? <span className="text-muted fw-bold fs-7">{subtitle}</span> : null}
      </h3>

      {withToolbar && (
        <div className="card-toolbar">
          {toolbarComponent}
          {dropdownOption}
        </div>
      )}
    </div>
  );
};
CardHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  titleComponent: PropTypes.element,
  withToolbar: PropTypes.bool,
  toolbarComponent: PropTypes.element,
  dropdownOption: PropTypes.element,
  classListStr: PropTypes.string,
}

export default CardHeader
