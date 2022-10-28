import { useState } from "react";
import "../styles/Form.css";

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
                <div className = "form-box">
                    <form onSubmit={addParticipant}>
                        <label>
                            <input 
                                id="_name"
                                placeholder="Name"
                                type = "text"
                                name="_name"
                                value={participant._name}
                                onChange={handleParticipantChange}
                            />
                        </label>
                        
                        <label>
                            <input 
                                id="_pass"
                                placeholder="Password"
                                type = "text"
                                name="_pass"
                                value={participant._pass}
                                onChange={handleParticipantChange}
                            />
                        </label>
                        
                        <label>
                            <input 
                                id="_pAdd"
                                placeholder="Participant Address"
                                type = "text"
                                name="_pAdd"
                                value={participant._pAdd}
                                onChange={handleParticipantChange}
                            />
                        </label>
                        
                        <label>
                            <select name="_pType" value={participant._pType} onChange={handleParticipantChange}>
                                <option value="Dummy">Select</option>
                                <option value="Manufacturer">Manufacturer</option>
                                <option value="Supplier">Supplier</option>
                                <option value="Consumer">Consumer</option>
                            </select>
                        </label>
                        <button type = "submit" id= "submitBtn" className = "submitBtn"> Submit</button>
                    </form>

                </div>

            : null}
        </div>
    );
}