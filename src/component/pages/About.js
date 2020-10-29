import React, { Component } from 'react'

 class About extends Component {
    render() {
        return (
            <div>
            <h1 className="display-3">
              About<span className="text-white"> Me </span>
            </h1>
             <p className="lead">
                <strong> My first React Tutorials</strong>
             </p><hr className="bg-black"/>
             <div className="container ">
                 <p style={{
                           color: 'white'
                            }}>React used to be one technology i was scared of 
                  because of its tricky ways of coding.Not until i took this 
                  Tutorials, which gave me a full understanding and concept of
                  how react works, especially when creating components, props 
                  and state
                 </p>
             </div>
            </div>
        )
    }
}

export default About