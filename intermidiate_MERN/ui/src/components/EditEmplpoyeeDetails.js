import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const EditEmplpoyeeDetails = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    gender: "",
    designation: "",
    course: [],
  });
  const [image , setImage] = useState('')

  const handleOnChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      setCredentials(prevState => {
        const updatedCourses = checked
          ? [...prevState.course, value]
          : prevState.course.filter(course => course !== value);
        return { ...prevState, [name]: updatedCourses };
      });
    } else if (type === 'radio') {
      setCredentials({ ...credentials, [name]: value });
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = new FormData()
      userData.append("name", credentials.name)
      userData.append("email", credentials.email)
      userData.append("password", credentials.password)
      userData.append("course", credentials.course)
      userData.append("image", image)
      userData.append("mobileNumber", credentials.mobileNumber)
      userData.append("gender", credentials.gender)
      userData.append("designation", credentials.designation)
      const { data } = await axios.post("http://localhost:8700/api/v1/auth/register", userData);
      if (data) {
        alert(data.message);
        navigate('/employeelist')
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <Layout>
      <div className="container" style={{maxWidth: '30%'}}>
        <form onSubmit={handleSubmit}>
          <div className="inputField">
            <div className="usernameField">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
                value={credentials.name}
                onChange={handleOnChange}
                placeholder="Enter Name"
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter Email"
                required
                value={credentials.email}
                onChange={handleOnChange}
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter Password"
                required
                value={credentials.password}
                onChange={handleOnChange}
              />
            </div>
            <div className="mobileNumber">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Enter Mobile Number"
                required
                value={credentials.mobileNumber}
                onChange={handleOnChange}
              />
            </div>
            <div className="designation">
              <label htmlFor="designation">Designation</label>
              <select
                className="form-control"
                id="designation"
                name="designation"
                value={credentials.designation}
                onChange={handleOnChange}
              >
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="gender d-flex">
              <label>Gender</label>
              <div className="mx-2">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={credentials.gender === 'Male'}
                  onChange={handleOnChange}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={credentials.gender === 'Female'}
                  onChange={handleOnChange}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            <div className="course my-2">
              <label>Course</label>
              <div className="d-flex flex-wrap">
                <div className="mx-2">
                  <input
                    type="checkbox"
                    id="MCA"
                    name="course"
                    value="MCA"
                    checked={credentials.course.includes('MCA')}
                    onChange={handleOnChange}
                  />
                  <label htmlFor="MCA">MCA</label>
                </div>
                <div className="mx-2">
                  <input
                    type="checkbox"
                    id="BCA"
                    name="course"
                    value="BCA"
                    checked={credentials.course.includes('BCA')}
                    onChange={handleOnChange}
                  />
                  <label htmlFor="BCA">BCA</label>
                </div>
                <div className="mx-2">
                  <input
                    type="checkbox"
                    id="BSC"
                    name="course"
                    value="BSC"
                    checked={credentials.course.includes('BSC')}
                    onChange={handleOnChange}
                  />
                  <label htmlFor="BSC">BSC</label>
                </div>
              </div>
            </div>
            <div className="image">
            <label htmlFor>Upload your photo here <input style={{"width":"92%","outline":"none","border":"1px solid #fff","padding":"12px 20px","marginBottom":"10px","borderRadius":"20px","background":"#e4e4e4"}} type="file" name id onChange={(e) => setImage(e.target.files[0])}/></label>
            </div>
            <div className="imgContainer d-flex" style={{borderRadius: '50%', width:"60px", height: '60px', border: '1px solid red', cursor: 'pointer', justifyContent:'center', alignItems: 'center'}}>
                  {image? (<img src={URL.createObjectURL(image)} alt="" style={{borderRadius: '50%', width: '100px', height: '100%', objectFit: 'cover'}}/>)
                  : <img src='' alt="" style={{borderRadius: '50%', width: '100%', height: '100%', objectFit: 'contain'}}/>
                  }
              </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default EditEmplpoyeeDetails
