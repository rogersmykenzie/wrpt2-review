import React from 'react';
import AWS from 'aws-sdk';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { addRecipe } from '../../store/reducer';
import { connect } from 'react-redux';
import './NewRecipe.scss';

class NewRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      ingredients: '',
      directions: '',
      type: '',
    }
    this.ref = React.createRef();
    this.s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.placeholder.toLowerCase()]: e.target.value
    })
  }

  handleRadio = (e) => {
    this.setState({
      type: e.target.id
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { files } = this.ref.current;

    this.s3.upload({
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
      Key: `${uuid()}-${files[0].name}`,
      Body: files[0],
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const recipe = {
          title: this.state.title,
          ingredients: this.state.ingredients,
          directions: this.state.directions,
          type: this.state.type,
          image: data.Location,
        }

        axios
          .post('/api/recipes', { recipe })
          .then((response) => {
            console.log(response);
            this.props.addRecipe(recipe);
          })
          
      }
    });
  }

  render() {
    return (
      <div className="new_recipe__container">
        <form className="new_recipe__form" onSubmit={this.handleSubmit}>
          <input placeholder="Title" onChange={this.handleChange} />
          <div onClick={this.handleRadio}>
            <label for="appetizer">Appetizer</label>
            <input type="radio" name="type" id="appetizer" />
            <label for="main_course">Main Course</label>
            <input type="radio" name="type" id="main_course" />
            <label for="dessert">Dessert</label>
            <input type="radio" name="type" id="dessert" />
          </div>
          <textarea placeholder="Ingredients" onChange={this.handleChange}></textarea>
          <textarea placeholder="Directions" onChange={this.handleChange}></textarea>
          <input type="file" placeholder="Image" ref={this.ref} />
          <button>Add Recipe</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  addRecipe
}

export default connect(undefined, mapDispatchToProps)(NewRecipe);