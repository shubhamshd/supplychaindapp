import "../styles/Form.css";

export default function AddParticipant({participant, handleParticipantChange, addParticipant}){
    return(
        <div>
            {/* <button onClick={handleAddParticipantVisibility}>
                <h3> Want to add a new Participant? </h3>
            </button> */}
            <h3> Want to add a new Participant? </h3>
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
        </div>
    );
}