import React, { Component, Fragment, } from 'react';
import { Container, Table, Button } from 'reactstrap';
import axios from 'axios';
import {
    Form,
    FormGroup,
    Dropdown, FormControl, FormLabel
} from 'react-bootstrap';

const _ = require('lodash'); //Library to Change Cases of things

let apiLinks = require('../api/config.json');
export default class ReportTableG extends Component {
    //Set the state to an empty list of objects that will be taken from the database
    state = {
        sales: [],
        saleT: 'saleType',
        dates: 'saleDate',
        dateinput: '',
        saleTypeValue: 'Choose Sale Type',
        cash: 1,
        credit: 2,
        cheque: 3,
        advisorSales: 0


    };

    //runs when component mounts, use to gets the data from db
    componentDidMount() {
        axios.get(apiLinks.SALES).then(res => {
            const sales = res.data;
            this.setState({ sales });
        });
    }

    onOpenClick(e, _id) {
        console.log(e, _id);
    }
/*
    aggregateSales(){
        var i;
        for (i=0; i<sales.length; i++){
            if (String(sale[this.state.advisor]) === String(advisor)){
                if (String(sale[this.state.paymentMethod]) === "creditCard"){
                    this.state.credit += parseInt(sale[this.state.fare]);
                }
                else if (String(sale[this.state.paymentMethod]) === "cash"){
                    this.state.cash += parseInt(sale[this.state.fare]);
                }
                else if (String(sale[this.state.paymentMethod]) === "cheque"){
                    this.state.cheque += parseInt(sale[this.state.fare]);
                }
            } */

        //}


   // }


    render() {
        const row = (
            _id,
            advisorCode,
            advisorSales,
            currency,
            USDExchangeRate,
            commissionRate,
            saleDate,
            cash,
            credit,
            cheque,
            total
        ) => (
            <Fragment>
                <tr key={_id}>
                    <td>{advisorCode}</td>
                    <td>{this.state.advisorSales}</td>
                    <td>{currency}</td>
                    <td>{USDExchangeRate}</td>
                    <td>{commissionRate}</td>
                    <td>{saleDate}</td>
                    <td>{cash}</td>
                    <td>{credit}</td>
                    <td>{cheque}</td>
                    <td>{total}</td>
                    <td>
                        <Button
                            className="open-btn"
                            color="primary"
                            size="sm"
                            onClick={this.onOpenClick.bind(this, _id)}
                        >
                            open
                        </Button>
                    </td>
                </tr>
            </Fragment>
        );

        return (
            <Container>
                <Form>
                    <FormGroup controlId="saleT" bssize="large">
                        <Dropdown
                            onSelect={key => {
                                this.setState({saleTypeValue: key});
                                if (key === "Interline") {
                                    this.setState({
                                        sales: this.state.sales.filter(
                                            sale =>
                                                String(sale[this.state.saleT]) ===
                                                "interline")
                                    });
                                } else {
                                    this.setState({
                                        sales: this.state.sales.filter(
                                            sale =>
                                                String(sale[this.state.saleT]) ===
                                                "domestic")
                                    });
                                }}}>
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {_.startCase(this.state.saleTypeValue)}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Domestic">
                                    Domestic
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Interline">
                                    Interline
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <FormLabel>Enter Start Date: DD/MM/YYYY</FormLabel>
                        <FormControl
                            autoFocus
                            type="string"
                            value={this.state.sales.dateinput}
                            onChange={e => {
                                this.setState({
                                    dateinput: e.target.value
                                });
                            }}
                        />
                        <Button
                            bssize="medium"
                            variant="outline-danger"
                            onClick={() => this.setState({
                                sales: this.state.sales.filter(
                                    sale =>
                                        String(sale[this.state.dates]) ===
                                        String(this.state.dateinput))
                            })}
                            block
                        >
                            Generate
                        </Button>{''}
                        <FormLabel>{this.state.dates}</FormLabel>
                    </FormGroup>

                </Form>
                <Table className="mt-4">

                    <thead>
                    <tr>
                        <th>Advisor Code</th>
                        <th>Sales</th>
                        <th>Currency</th>

                        <th>USD Exchange Rate</th>
                        <th>Commission Rate</th>
                        <th>Sale Date</th>
                        <th>Credit</th>
                        <th>Cash</th>
                        <th>Cheque</th>
                        <th>USD Total</th>
                    </tr>
                    </thead>


                    <tbody>
                    {this.state.sales.map(
                        ({
                             _id,
                             advisorCode,
                             advisorSales,
                             currency,
                             USDExchangeRate,
                             commissionRate,
                             saleDate

                         }) => (
                            <Fragment key={_id}>
                                {row(
                                    _id,
                                    advisorCode,
                                    this.state.advisorSales,
                                    currency,
                                    USDExchangeRate,
                                    commissionRate,
                                    saleDate,
                                    this.state.cash,
                                    this.state.credit,
                                    this.state.cheque,

                                )}
                            </Fragment>
                        )
                    )}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

