import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { addAsyncFriend,fetchAsyncUsers } from '../features/Accounts/AccountsSlice';
import { useDispatch,useSelector } from 'react-redux';
import Cookies from "universal-cookie";
// ... (previous imports)

const Settings = (props) => {
    const { logged ,setLogged} = props;
    
    const [profilePicture, setProfilePicture] = useState(null);
    const dispatch = useDispatch();
    const AllUsers = useSelector((state) => state.user.Users);
    const MyInfo = AllUsers?.find((me) => me.userName === logged); // Use find instead of filter
    const [userName, setUserName] = useState(MyInfo?.userName || '');
    const [password, setPassword] = useState(MyInfo?.Password || '');
    const [showPassword, setShowPassword] = useState(false);
    const cookie = new Cookies();
    const LogmeOut = () => {
      cookie.remove("USER-NAME");
      setLogged(null);
    };
  
    useEffect(() => {
      dispatch(fetchAsyncUsers());
      
    }, [dispatch]);
  
    const handleImg = async (event) => {
        const files = event.target.files;
      
        if (files && files.length > 0) {
          const file = files[0];
          const reader = new FileReader();
      
          reader.onloadend = () => {
            setProfilePicture(reader.result);
          };
      
          reader.readAsDataURL(file);
      
          const formData = new FormData();
          formData.append('image', file);
      
          try {
            const response = await fetch('https://api.imgbb.com/1/upload?key=42b5ac7d94b719adbbb9e2e71039509f', {
              method: 'POST',
              body: formData,
            });
      
            if (!response.ok) {
              throw new Error('Image upload failed');
            }
      
            const responseData = await response.json();
            const imageUrl = responseData.data.url;
      
            dispatch(addAsyncFriend({
                id: MyInfo?.id,
                user: { ProfilePic: imageUrl }
              }));
              dispatch(fetchAsyncUsers()); // Fetch updated user data
              alert("Image changed Successfully");
            } catch (error) {
              console.error('Error uploading image:', error);
            }
        }
        dispatch(fetchAsyncUsers());
      };
  
    const handleUserNameChange = (event) => {
       
      setUserName(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
  
    const handleSaveChangesA = () => {
        dispatch(addAsyncFriend({
          id: MyInfo.id,
          user: {
            userName: userName
          }
        }));
        alert("Your User Name has Been changed please Login in again with your New User Name in Order to remember it ")
        LogmeOut()
      };
    const handleSaveChangesB = () => {
        dispatch(addAsyncFriend({
          id: MyInfo.id,
          user: {
            
            Password: password
          }
        }));
        alert("Your Password has Been changed please Login in again with your New Password in Order to remember it ")
        LogmeOut()
      };
  
    return (
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <img
              src={`${MyInfo?.ProfilePic}`}
              alt="Profile"
              className=" img-fluid"
              height={"300px"}

            />
            
            <Form.Group className="mt-3">
              <Form.Label>Change Profile Picture</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImg} />
            </Form.Group>
          </Col>
          <Col md={8}>
            <Form>
              <Form.Group controlId="formUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" value={userName} onChange={handleUserNameChange} />
                <Button className='mt-2' variant="primary" onClick={handleSaveChangesA}>
                Save Changes
              </Button>
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Container className="mt-4">
      <Row>
        <Col md={8}>

          <Form.Group controlId="formPassword">
            <Form.Label>New Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
              />
              <div className="input-group-append">
                <Button
                className='p-2'
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </div>
            </div>
          </Form.Group>
        </Col>
      </Row>
    </Container>
              </Form.Group>
              <Button className='m-2' variant="primary" onClick={handleSaveChangesB}>
                Save Changes
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default Settings;
  