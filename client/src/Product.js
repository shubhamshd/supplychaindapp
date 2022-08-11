import { useState } from "react";

export default function Product ({product, rowsData, handleChange, addProduct}){
    console.log(rowsData);
    var tableHead = ['Product Id', 'Model Number', 'Part Number', 'Serial Number', 'Current Owner', 'Cost', 'Manufacturing Timestamp'];
    const [showHideAddProductInput, setShowHideAddProductInput] = useState(false);

    const handleAddProductVisibility = () => {
        setShowHideAddProductInput(!showHideAddProductInput);
    }

    return(
        <div>
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
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    {tableHead.map(head => <th className="text-center">{head}</th>)}  
                </tr>
                </thead>
                <tbody>
                { rowsData && rowsData.map((item, idx) => (          
                    <tr key={idx}>
                        <td>{item.product_id}</td>
                        <td>{item.modelNumber}</td>
                        <td>{item.partNumber}</td>
                        <td>{item.serialNumber}</td>
                        <td>{item.productOwner}</td>
                        <td>{item.cost}</td>
                        <td>{item.mfgTimeStamp}</td>
                    </tr>                  
                ))}
                </tbody>
            </table>
        </div>
    );
}