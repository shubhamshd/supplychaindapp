import { useState } from "react";
import "../styles/Form.css";

export default function GetParticipant({participant, handleParticipantChange, getParticipant}){
    var tableHead = ['Participant Name', 'Participant Address', 'Participant Type'];
    const [showHideParticipantTable, setShowHideParticipantTable] = useState(false);

    const handleParticipantTableVisibility = () => {
        setShowHideParticipantTable(true);
    }

    return(
        <div>
            <h3> Get Participant Details :  </h3>
            <div className="form-box">
                <form onSubmit={getParticipant}>
                    <label>
                    <input 
                        type = "number"
                        placeholder="Owner Id"
                        name="_userId"
                        value={participant._userId}
                        onChange={handleParticipantChange}
                    />
                    </label>
                    <button onClick={handleParticipantTableVisibility}
                        type="submit"> 
                        Get 
                    </button>
                </form>
            </div>
            {showHideParticipantTable ? 
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        {tableHead.map((head, idx) => <th key={idx} className="text-center">{head}</th>)}  
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{participant._name}</td>
                        <td>{participant._pAdd}</td>
                        <td>{participant._pType}</td>
                    </tr>
                    </tbody>
                </table>
            : null}
        </div>
    );
}