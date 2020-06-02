import React from 'react';
import { DropTarget } from 'react-dnd';

const boxTarget = {
    drop(props) {
        return { name: props.status };
    }
};
  
class PhoneContactRow extends React.Component {
    render() {
        return this.props.connectDropTarget(<div>{this.props.children}</div>);
    }
}
  
PhoneContactRow = DropTarget("phoneContact", boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(PhoneContactRow);

export default PhoneContactRow;
  