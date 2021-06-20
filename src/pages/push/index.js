import React, { Component } from 'react';
import styles from './styles.module.css';
import cns from 'classnames';
class Push extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: ''
        };
    }

    componentDidMount() {

    }
    
    _inputChange(e){
      this.setState({
        name:e.target.value
      })
    }
    render() {
        return (
          <div className={styles.container}>
            
            <span>发布</span>
            <input value={this.state.name || 'test'} onChange={(e)=>this._inputChange(e)}></input>
            
          </div>
        );
      }
}


export default Push;
