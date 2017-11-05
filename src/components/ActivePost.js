import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FaAngleDoubleLeft from 'react-icons/lib/fa/angle-double-left';

import HandlePostMethod from './HandlePostMethod';

class ActivePost extends Component {
  constructor(props){
    super(props);
    this.state = {currentPost: ''};

    this.addHandlePostMethod = new HandlePostMethod();
  }

  componentDidMount(){
    axios.get(`https://mern-blog-app-api.herokuapp.com/blogposts/api/post/${this.props.match.params.id}`)
    .then( (res) => {
      this.setState({currentPost: res.data.results});
    })
    .catch( (err) => {
      console.log('Problem fetching the url with id for update', err);
    })
  }

  handleDelete = (event) => {
    event.preventDefault();
    this.addHandlePostMethod.deletePost(this.props.match.params.id);
    this.props.history.push('/');
  }

  render(){
    const { id } = this.props.match.params;
    const { title, description, contents } = this.state.currentPost;
    const { currentPost } = this.state;


    return(
        <div className="col-md-8 mx-auto">
          <div className="form-wrapper">
            <Link to={`/`}><FaAngleDoubleLeft size={30}/></Link>
            <div className="post-title"><h1>{title}</h1></div>
            <div className="post-description"><h3>{description}</h3></div>
            <div className="post-contents">{contents}</div>
            <Link className="btn btn-outline-primary waves-effect" to={{ pathname:`/update-post/${id}`, state: { currentPost } }}>Update Post</Link>
            <form style={{display:"inline-block"}} onSubmit={this.handleDelete}>
              <input className="btn btn-outline-danger waves-effect" value="delete" type="submit"/>
            </form>
          </div>
        </div>
    );
  }
}

export default ActivePost;
