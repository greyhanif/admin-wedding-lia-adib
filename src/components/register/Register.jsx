import "./register.css";

const Register = () => {
  return (
    <div>
      <form className="box">
        <div className="field">
          <label className="">Name</label>
          <div className="controls">
            <input type="text" className="input"></input>
          </div>
        </div>
        <div className="field">
          <label className="">Email</label>
          <div className="controls">
            <input type="text" className="input"></input>
          </div>
        </div>
        <div className="field">
          <label className="">password</label>
          <div className="controls">
            <input type="password" className="input"></input>
          </div>
        </div>
        <div className="field">
          <label className="">Confirm password</label>
          <div className="controls">
            <input type="password" className="input"></input>
          </div>
        </div>
        <div className="field">
          <button className="button">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
