import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';

// React commponent
class Counter extends Component{
    render(){
        const { value , display, onIncreaseClick , onDeclineClick , onRemoveClick } = this.props;
        return (
            <div style={{display:display}}>
                <span>{value}</span>
                <button onClick={onIncreaseClick}>增加</button>
                <button onClick={onDeclineClick}>减少</button>
                <button onClick={onRemoveClick}>删除</button>
            </div>
        )
    }
}
Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncreaseClick: PropTypes.func.isRequired,
    onDeclineClick: PropTypes.func.isRequired
}

// Action
const increaseAction={type:'increase'};
const declineAction={type:'decline'};
const removeAction={type:'remove'};

// Reducer
function counter(state={count:0,display:'block'},action){
    var count=state.count;
    switch(action.type){
        case 'increase':
            return { count: count + 1 ,display:'block'};
        case 'decline': 
            return { count: count - 1 , display:'block'};
        case 'remove':
            return { count:0 , display:'none'};
        default:
            return state;
    }
}

// Store
const store=createStore(counter);

// Map Redux state to component props
function mapStateToProps(state){
    return {
        value:state.count,
        display:state.display
    }
}

//Map Redux action to component props
function mapDispatchToProps(dispatch,ownPorps){
    return {
        onIncreaseClick: () => dispatch(increaseAction),
        onDeclineClick: () => dispatch(declineAction),
        onRemoveClick: ()=>dispatch(removeAction)
    }
}

// Connected Component
const App=connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);