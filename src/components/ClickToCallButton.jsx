/* eslint-disable react/prop-types */

const ClickToCallButton = ({ phoneNumber }) => {
  const handleClick = () => {
    console.log(`Calling ${phoneNumber}`);
    alert(`Calling ${phoneNumber}`);
  };

  return (
    <button className="click-to-call-button" onClick={handleClick}>
      Call Now: {phoneNumber}
    </button>
  );
};

export default ClickToCallButton;
