import { useState } from "react";

export default function Product ({ owner, product, rowsData, provenance, handleChange, addProduct, handleOwnerChange, changeOwnership, getProvenance}){
    // console.log(rowsData);
    var tableHead = ['Product Id', 'Model Number', 'Part Number', 'Serial Number', 'Current Owner', 'Cost', 'Manufacturing Timestamp', ''];
    const [showHideAddProductInput, setShowHideAddProductInput] = useState(false);
    const [changeOwnershipInput, setChangeOwnershipInput] = useState(false);

    const handleAddProductVisibility = () => {
        setShowHideAddProductInput(!showHideAddProductInput);
    }
    const handleOnwnershipChange = () => {
        setChangeOwnershipInput(!changeOwnershipInput);
    }

    return(
        <div>
            {/* Change Ownership form */}
            <button onClick={handleOnwnershipChange}>
                <h3> Change Product Ownership </h3>
            </button>
            {changeOwnershipInput ? 
                <form onSubmit={changeOwnership}>
                    <label>
                    Current Owner:
                    <input 
                        type = "number"
                        name="_user1Id"
                        value={owner._user1Id}
                        onChange={handleOwnerChange}
                    />
                    </label>

                    <label>
                    New Owner:
                    <input 
                        type = "number"
                        name="_user2Id"
                        value={owner._user2Id}
                        onChange={handleOwnerChange}
                    />
                    </label>

                    <label>
                    Product Id:
                    <input 
                        type = "number"
                        name="_prodId"
                        value={owner._prodId}
                        onChange={handleOwnerChange}
                    />
                    </label>

                    <button  
                        type="submit"> 
                        Submit 
                    </button>
                </form>
            : null}
            <hr/>

            {/* Add New Product */}
            <button onClick={handleAddProductVisibility}>
                <h3> Want to add a new Product? </h3>
            </button>
            {showHideAddProductInput ? 
                <form onSubmit={addProduct}>
                    <label>
                    Owner Id:
                    <input 
                        type = "number"
                        name="_ownerId"
                        value={product._ownerId}
                        onChange={handleChange}
                    />
                    </label>

                    <label>
                    Model Number:
                    <input 
                        type = "text"
                        name="_modelNumber"
                        value={product._modelNumber}
                        onChange={handleChange}
                    />
                    </label>

                    <label>
                    Part Number:
                    <input 
                        type = "text"
                        name="_partNumber"
                        value={product._partNumber}
                        onChange={handleChange}
                    />
                    </label>

                    <label>
                    Serial Number:
                    <input 
                        type = "text"
                        name="_serialNumber"
                        value={product._serialNumber}
                        onChange={handleChange}
                    />
                    </label>

                    <label>
                    Product Cost:
                    <input 
                        type = "number"
                        name="_productCost"
                        value={product._productCost}
                        onChange={handleChange}
                    />
                    </label>
                    <button  
                    type="submit"> 
                    Submit 
                    </button>
                </form>
            : null}
            <hr/>

            {/* Populate all products */}
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    {tableHead.map(head => <th className="text-center">{head}</th>)}  
                </tr>
                </thead>
                <tbody>
                {rowsData && rowsData.map((item, idx) => (          
                    <tr key={idx}>
                        <td>{item.product_id}</td>
                        <td>{item.modelNumber}</td>
                        <td>{item.partNumber}</td>
                        <td>{item.serialNumber}</td>
                        <td>{item.productOwner}</td>
                        <td>{item.cost}</td>
                        <td>{item.mfgTimeStamp}</td>
                        <td><button value={item.product_id} onClick={(e) => getProvenance(e)}> Get Provenance </button></td>
                    </tr>                  
                ))}
                </tbody>
            </table>
            <div>
                {provenance ?
                    <div>
                        <h1>Provenance details: </h1>
                        {provenance.map((item, idx) => (
                            <p key={idx}>Owner with id:{item[1]} and address:{item[2]} at time:{item[3]}</p>
                        ))}
                    </div>
                : null}
            </div>
        
        </div>
    );
}