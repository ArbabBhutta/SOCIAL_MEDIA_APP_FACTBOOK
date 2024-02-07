import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AddAsyncPosts } from '../Posts/postsSlice'
import './AddPost.css'

export default function AddPost(props) {
  const {logged}=props
  const [file,setfile]=useState()
  const [preview,setPreview]=useState()
  useEffect(()=>{
    if(!file) return
    let temp=[];
    for(let i =0; i<file.length;i++){
      temp.push(URL.createObjectURL(file[i]))
    }
    const objurl=temp;
    setPreview(objurl)
    for(let i=0;i<objurl.length;i++){
      return ()=>{
        URL.revokeObjectURL(objurl[i])
      }
    }
  },[file])
  const date=new Date()
  const [heading,setHeading]=useState("")
  const [body,setBody]=useState("")
  const [Pdate,setDate]=useState('')
  const [month,setMonth]=useState('')
  const [hour,setHour]=useState('')
  const [minute,setminute]=useState('')
  const [year,setYear]=useState('')
  const [day,setday]=useState('')
  const dispatach=useDispatch()
  const DateHandler=()=>{
    setDate(date.getDate())
    setHour(date.getHours())
    setHour(date.getHours())
    setminute(date.getMinutes())
    setYear(date.getFullYear())
    switch (date.getDay()) {
      case 0:
        setday( "Sunday");
        break;
      case 1:
        setday("Monday");
        break;
      case 2:
        setday ("Tuesday");
        break;
      case 3:
        setday ("Wednesday");
        break;
      case 4:
        setday ("Thursday");
        break;
      case 5:
        setday ("Friday");
        break;
      case 6:
        setday ("Saturday");
    }
    switch (date.getMonth()) {
      case 0:
        setMonth( "jan");
        break;
      case 1:
        setMonth("Feb");
        break;
      case 2:
        setMonth ("Mar");
        break;
      case 3:
        setMonth ("April");
        break;
      case 4:
        setMonth ("May");
        break;
      case 5:
        setMonth ("June");
        break;
      case 6:
        setMonth ("Jul");
        break;
      case 7:
        setMonth("Aug");
        break;
      case 8:
        setMonth("Sep");
        break;
      case 9:
        setMonth("Oct");
        break;
      case 10 :
        setMonth("Nov");
        break;
      case 11:
        setMonth("Dec")
        break;

    }
  }
  useEffect(()=> DateHandler(),[])
  const addPostHandler = async () => {
    // Create a new FormData object
    const formData = new FormData();

    // Append the file to the FormData object
    formData.append('image', file[0]);

    // Make a request to imgBB API
    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=42b5ac7d94b719adbbb9e2e71039509f', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const responseData = await response.json();

      // Now you can use responseData.url as the image URL
      const imageUrl = responseData.data.url;

      // Dispatch the action with the imageUrl
      dispatach(AddAsyncPosts({
        userName: logged,
        title: heading,
        body: body,
        image: imageUrl,
        liked_by: [],
        postedDate: {
          date: Pdate,
          day: day,
          year: year,
          hour: hour,
          minute: minute,
          month: month,
        },
        comments: [],
      }));

      // Reset form state
      setBody('');
      setHeading('');
      setPreview(null);
    } catch (error) {
      console.error('Error uploading image:', error.message);
      // Handle the error as needed
    }
  };
  return (
    <div className='container-fluid cont'>
      <div className="row">
        <div className="col-sm-12 col">
          <input className='sub_In' type="text" value={heading}  placeholder='Post Heading' onChange={(e)=>setHeading(e.target.value)} /> <br />
          <input className='sub_In' type="text" value={body} placeholder='post Body' onChange={(e)=>setBody(e.target.value)} />
          <br />
          <label className='lab' htmlFor="">Upload Image</label><br />
          <input type="file" placeholder='Upload' accept='image/jpg,image/jpeg,image/png' onChange={(e)=>setfile(e.target.files)} />
          <div>
            <img  src={preview}  width='500px'  alt="" />
          </div>
          <button className='bts mt-2' onClick={addPostHandler}>Add Post</button>
        </div>
      </div>
    </div>
    
  )
}
