import './App.css'
import React, {useState, useEffect} from 'react'

const Posts = () => {

//komponentin tilan määritys
const [posts, setPosts] = useState([])

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => res.json()) //muuttaa json-datan javascriptiksi
  // .then(oliot => console.log(oliot))
  .then(oliot => setPosts(oliot))
},[]
)

  return (
    <>
        <h2>Posts from typicode</h2>

        {
          posts && posts.map(p => 
            <div className='posts' key={p.id}>
              <h3>{p.id}</h3>
              <h4>{p.title}</h4>
              <p>{p.body}</p>
            </div>
            )
        }

    </>
  )
}

export default Posts