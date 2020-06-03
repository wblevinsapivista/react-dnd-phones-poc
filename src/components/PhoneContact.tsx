import React from 'react';
import { DragSource } from 'react-dnd';


const boxSource = {
    beginDrag(props: any) {
        return {
            name: props.id
        };
    },
  
    endDrag(props: any, monitor: any) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        if (dropResult) {
            props.onDrop(item.name, dropResult.name);
        }
    }
};
  
class PhoneContactClass extends React.Component<any> {
    render() {
        return this.props.connectDragSource(<div>{this.props.children}</div>);
    }
}

export const PhoneContact: any =  DragSource("phoneContact", boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))(PhoneContactClass);