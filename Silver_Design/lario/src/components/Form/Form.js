import React from 'react'
import './Form.css'
import { Button } from '../Button/Button'
import { Link } from 'react-router-dom'

class PollForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {    this.setState({value: event.target.value});  }
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit} className="poll-form poll-child">
          <div className='form-div'>
            <div className='form-entity'>
            <p>Name</p>
            <input type="text" />
            </div>
            <div className='form-entity'>
            <p>Name</p>
            <input type="text" />
            </div>
            <div className='form-entity'>
            <p>Name</p>
            <input type="text" />
            </div>
            <div className='form-entity'>
            <p>Name</p>
            <input type="text"/>
            </div>
            <div className='form-entity'>
            <p>Name</p>
            <input type="text"/>
            </div>
            <Link to='/result' className="to-about form-create-poll">
                <Button buttonStyle='btn--outline'> Create Poll </Button>
            </Link>

          </div>
        </form>
      );
    }
  }

  export default PollForm