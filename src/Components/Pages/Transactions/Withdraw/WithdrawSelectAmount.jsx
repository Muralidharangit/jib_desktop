import React from "react";

const WithdrawSelectAmount = ({ amount, setAmount }) => {
  const handleSelectAmount = (value) => {
    setAmount(value.toString());
  };
  return (
    <div className="card bg_light_grey account_input-textbox-container">
      <div className="card-body py-4 pb-5">
        <h5 className="mb-3">Select Amount</h5>
        <form className="form-control_container" action="">
          <div className="input-field mb-3">
            <input
              required
              className="input"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <label className="label" htmlFor="input">
              Enter the Amount or select the Amount
            </label>
          </div>

          <div className="recharge-amount-container button">
            {[50, 100, 1000, 10000].map((amt) => (
              <button
                key={amt}
                type="button"
                className="btn"
                onClick={() => handleSelectAmount(amt)}
              >
                {amt}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};
export default WithdrawSelectAmount;
