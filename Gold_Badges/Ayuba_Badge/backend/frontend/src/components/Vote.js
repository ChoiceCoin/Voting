import React, { Component } from 'react'

export class Vote extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            other:[]
        };
    }

    fetchPresidents(){
        fetch('/api/contestants')
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                data:data
            });
            console.log(data);
        });

    }

    fetchOthers(){
      fetch('/api/office/')
      .then(response=>response.json())
      .then((other)=>{
          this.setState({
              other:other
          });
          console.log(other);
      });

  }

    componentDidMount(){
        this.fetchPresidents();
        this.fetchOthers();
    }

  render() {
      const contestantData = this.state.data;
      const otherData = this.state.other;
    return (
      <div className='container mt-4'>
        <div className='row'>
            <h2 className='text-success text-center'> Presidential</h2>
            <div className='dropdown-divider'></div>
          {contestantData.map((contestant)=>(
                 
            <div className='col-md-4'>
            <div className='card card-body'>
                {contestant.title} {contestant.full_name}
                <p>{contestant.state} State</p>
                <p>{contestant.office}</p>
                
                <a href='/confirm/' className='btn btn-success w-50'>Vode</a>
            </div>
          </div>
          ))}
        </div>

        <div className='row mt-4'>
            <h2 className='text-success text-center'>Guber Polls</h2>
            <div className='dropdown-divider'></div>
          {otherData.map((contestant)=>(
                 
            <div className='col-md-4'>
            <div className='card card-body'>
                {contestant.title} {contestant.full_name}
                <p>{contestant.state} State</p>
                <p>{contestant.office}</p>
                
                <a href='/confirm/' className='btn btn-success w-50'>Vode</a>
            </div>
          </div>
          ))}
        </div>

      </div>
    );
  };
}



export default Vote