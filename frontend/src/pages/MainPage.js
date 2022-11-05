import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useHistory} from 'react-router-dom'
import '../App.css'
import Pagination from '../Pagination';


function MainPage() {
    const [postList,setPostList] = useState([]);
    let history = useHistory();
    
     const [posts, setPosts] = useState([]);
     const [loading, setLoading] = useState(false);
     const [currentPage, setCurrentPage] = useState(1);
     const [postsPerPage] = useState(2);
    

    // useEffect(()=>{
    //     //setLoading(true);
    //     Axios.get("http://localhost:3002/api/get").then((data)=>{
    //         //console.log("11111");
    //         //console.log(data)
    //         setPostList(data.data) //original
    //         setPosts(data.data);
    //         //setLoading(false);
    //     });
    //     //fetchPosts();
    // },[])

    useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
          const res = await Axios.get('http://localhost:3002/api/get');
          console.log(res.data);
          setPosts(res.data);
          setLoading(false);
        };
    
        fetchPosts();
      }, []);


    const LikePost = (id) => {
        Axios.post(`http://localhost:3002/api/like/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log('Login: ', err));
            alert("you liked a post");
            window.location.replace("/")
    }


    // Get current posts
     const indexOfLastPost = currentPage * postsPerPage;
     const indexOfFirstPost = indexOfLastPost - postsPerPage;
     const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

     // Change page
     const paginate = pageNumber => setCurrentPage(pageNumber);
     
    return (
        <>
        <div className="MainPage">
          <div className="PostContainer">
              {/* postList    //original  */}
              {currentPosts.map((val,key)=>{
            return (
                <div className="Post" >
                    <h1 className="post-title" onClick={()=>(history.push(`/post/${val.id}`))}>{val.title}</h1>
                    <p>{val.post_text.length > 300 ? val.post_text.substring(0,300)+ " ..." : val.post_text}</p>
                    <h4>{val.user_name}</h4>
                    <button className="like_btn" onClick={(() => LikePost(val.id))}>Like</button>
                    <h5>Likes: {val.likes}</h5>
                </div>      
                  )
              })}
          </div>
        </div>
        
        <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
        />
        </>
    )
}

export default MainPage
