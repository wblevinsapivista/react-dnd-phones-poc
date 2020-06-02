import React from 'react';
import { DragSource } from 'react-dnd';

const boxSource = {
    beginDrag(props) {
        return {
            name: props.id
        };
    },
  
    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        if (dropResult) {
            props.onDrop(item.name, dropResult.name);
        }
    }
};
  
class PhoneContact extends React.Component {
    render() {
        return this.props.connectDragSource(<div>{this.props.children}</div>);
    }
}
  
export default PhoneContact = DragSource("phoneContact", boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))(PhoneContact);