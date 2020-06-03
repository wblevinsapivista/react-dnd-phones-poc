import React from 'react';
import { DropTarget, ConnectDropTarget } from 'react-dnd';

interface NodeProps {
    connectDropTarget: ConnectDropTarget
}

const boxTarget = {
    drop(props: any) {
        return { name: props.status };
    }
};
  
class PhoneContactRow extends React.Component<NodeProps> {
    render() {
        return this.props.connectDropTarget(<div>{this.props.children}</div>);
    }
}

const phoneContactRow = DropTarget('phoneContact', boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(PhoneContactRow)

export default phoneContactRow;
  