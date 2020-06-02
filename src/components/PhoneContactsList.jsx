import React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import PhoneContactRow from './PhoneContactRow';
import PhoneContact from './PhoneContact'

const phones = [
  { _id: 0, number: "+12342345344", primary: true },
  { _id: 1, number: "+12342342305", primary: false },
  { _id: 2, number: "+12342342340", primary: false },
  { _id: 3, number: "+12342342341", primary: false },
  { _id: 4, number: "+12342342342", primary: false },
  { _id: 5, number: "+12342342343", primary: false },
  { _id: 6, number: "+12342342344", primary: false },
  { _id: 7, number: "+12342342345", primary: false },
  { _id: 8, number: "+12342342346", primary: false },
  { _id: 9, number: "+12342342347", primary: false }
];

const rows = ["primary", "secondary"];
const labelsMap = {
  primary: "primary",
  secondary: "secondary"
};

const classes = {
  board: {
    display: "inline",
    margin: "0 auto",
    width: "90vw",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif'
  },
  row: {
    minWidth: 200,
    width: "30vw",
    height: "9vh",
    margin: "0 auto",
    backgroundColor: "#FFFFFF"
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: "0.8em",
    cursor: "pointer",
    border: '2px solid #000',
    backgroundColor: "#FFFFFF"
  }
};

class PhoneContactsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phones
    };
  }
  
  updatePrimary = (id, newPrimary) => {
    const { phones } = this.state;
    
    const oldPhone = phones.find(phone => phone.primary === true);
    oldPhone.primary = false;
    
    const newPrimaryIndex = phones.indexOf(newPrimary);
    let newPrimaryPhone = this.state.phones[newPrimaryIndex];
    newPrimaryPhone.primary = true;
    
    const newPhones = update(phones, {
      [newPrimaryIndex]: { $set: newPrimaryPhone }
    });
    this.setState({ phones: newPhones });
  };

  render() {
    const { phones } = this.state;
    return (
      <main>
        <header>Phone Contacts</header>
        <section style={classes.board}>
          <div>
            <PhoneContactRow>
              <div style={classes.row}>
                <div style={classes.columnHead}>{labelsMap[rows]}</div>
                <div>
                  {phones
                    .filter(phone => phone.primary === true)
                    .map((phone, ndx) => (
                      <PhoneContact id={phone._id} onDrop={(phoneNdx) => this.updatePrimary(ndx, phones[phoneNdx])}>
                        <div style={classes.item}>{phone.number}</div>
                      </PhoneContact>
                  ))}
                </div>
              </div>
            </PhoneContactRow> 
            <PhoneContactRow status={rows}>
              <div style={classes.row}>
                <div style={classes.columnHead}>{labelsMap[rows]}</div>
                <div>
                  {phones
                    .filter(phone => phone.primary === false)
                    .map((phone, ndx) => (
                      <PhoneContact id={phone._id} onDrop={(phoneNdx) => this.updatePrimary(ndx, phones[phoneNdx])}>
                        <div style={classes.item}>{phone.number}</div>
                      </PhoneContact>
                  ))}
                </div>
              </div>
            </PhoneContactRow>
          </div>
        </section>
      </main>
    );
  }
}

export default DragDropContext(HTML5Backend)(PhoneContactsList);

