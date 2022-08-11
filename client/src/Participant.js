import { useState } from "react";

export default function Participant({participant, handleParticipantChange, getParticipant, addParticipant}){
    var tableHead = ['Participant Name', 'Participant Address', 'Participant Type'];
    const [showHideGetParticipantInput, setShowHideGetParticipantInput] = useState(false);
    const [showHideParticipantTable, setShowHideParticipantTable] = useState(false);
    const [showHideAddParticipantInput, setShowHideAddParticipantInput] = useState(false);

    const handleParticipantInputVisibility = () => {
        setShowHideParticipantTable(false);
        setShowHideGetParticipantInput(!showHideGetParticipantInput);
    }
    const handleParticipantTableVisibility = () => {
        setShowHideParticipantTable(true);
    }
    const handleAddParticipantVisibility = () => {
        setShowHideAddParticipantInput(!showHideAddParticipantInput);
    }

    return(
        <div>
            <button onClick={handleParticipantInputVisibility}>
                <h3> Get Participant Details :  </h3>
            </button>
            {showHideGetParticipantInput ? 
                <form onSubmit={getParticipant}>
                    <label>
                    Owner Id:
                    <input 
                        type = "number"
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
            : null}
            <hr/>
            {showHideParticipantTable ? 
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        {tableHead.map(head => <th className="text-center">{head}</th>)}  
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
            <hr/>
            <button onClick={handleAddParticipantVisibility}>
                <h3> Want to add a new Participant? </h3>
            </button>
            {showHideAddParticipantInput ? 
                <form onSubmit={addParticipant}>
                    <label>
                        Name: 
                        <input 
                            id="_name"
                            type = "text"
                            name="_name"
                            value={participant._name}
                            onChange={handleParticipantChange}
                        />
                    </label>
                    
                    <label>
                        Password: 
                        <input 
                            id="_pass"
                            type = "text"
                            name="_pass"
                            value={participant._pass}
                            onChange={handleParticipantChange}
                        />
                    </label>
                    
                    <label>
                        Participant Address: 
                        <input 
                            id="_pAdd"
                            type = "text"
                            name="_pAdd"
                            value={participant._pAdd}
                            onChange={handleParticipantChange}
                        />
                    </label>
                    
                    <label>
                    Pick your participant type:
                        <select name="_pType" value={participant._pType} onChange={handleParticipantChange}>
                            <option value="Dummy">Select</option>
                            <option value="Manufacturer">Manufacturer</option>
                            <option value="Supplier">Supplier</option>
                            <option value="Consumer">Consumer</option>
                        </select>
                    </label>
                    <button  
                        type="submit"> 
                        Submit 
                    </button>
                </form>
            : null}
        </div>
    );
}