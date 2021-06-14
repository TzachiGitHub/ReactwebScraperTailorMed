import React from 'react'

export default class TableBuilder extends React.Component{
    constructor(props) {
        super(props);
        this.setState({
            data: this.props.data
        })
    }

    render() {
        let {key, assistantProgramName, status, grantAmount, treatmentList} = this.props.data;
        return(
            <>
                <tr key={key}>
                   <td>{assistantProgramName}</td>
                   <td>{status}</td>
                   <td>{grantAmount}</td>
                   <td>{treatmentList}</td>
                </tr>
            </>
        )
    }
}